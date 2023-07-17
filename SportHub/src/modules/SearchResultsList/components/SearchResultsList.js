import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/style.module.scss"
import { ROUTES } from "../../../routes/routes"
import getSearchArticlesRequest from "../../SearchDropdownList/helpers/getSearchArticlesRequest"
import { PAGE_CONSTANTS } from "../../../constants/PageConstants"
import { useTranslation } from "react-i18next"
import InfiniteScroll from "react-infinite-scroll-component"
import * as DOMPurify from 'dompurify'
import getNumberOfArticlesRequest from "../helpers/getNumberOfArticlesRequest"

const SearchResultsList = ({ contentSearchValue }) => {
  const navigate = useNavigate()

  const { t, i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isLastArticleHaveBeenFetched, setIsLastArticleHaveBeenFetched] = useState(false)
  const [currentPageNumber, setCurrentPageNumber] = useState(PAGE_CONSTANTS.FIRST_PAGE_NUMBER)
  // need this because if use currentPageNumber for refreshing search results, it will broke
  // after first result with number of pages <= 1
  const [refreshSearch, setRefreshSearch] = useState(false)

  const [articles, setArticles] = useState([])
  const [numberOfArticles, setNumberOfArticles] = useState(0)

  const handleArticlesGet = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const articlesPerPage = 5
      const response = await getSearchArticlesRequest(i18n.language, contentSearchValue, currentPageNumber, articlesPerPage)
      const pageOfArticles = response.data
      if (!pageOfArticles) {
        console.error("Error. Request for articles fails")
        return
      }
      const responseNumber = await getNumberOfArticlesRequest(i18n.language, contentSearchValue)
      setNumberOfArticles(responseNumber.data.count)
      if (pageOfArticles.length === 0) {
        setIsLastArticleHaveBeenFetched(true)
        return
      }
      setArticles((prevArticles) => {
        const uniqueArticleIds = new Set(prevArticles.map(({ articleId }) => articleId))
        const filteredArticles = pageOfArticles.filter(({ articleId }) => !uniqueArticleIds.has(articleId))
        return [...prevArticles, ...filteredArticles]
      })
    } catch (error) {
      console.error('Error getting articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getMatchedMainText = (mainText) => {
    const mainTexts = mainText.split(". ")
    let matchedMainText = null
    for (let i = 0; i < mainTexts.length; i++) {
      const text = mainTexts[i]
      if (text.toLowerCase().includes(contentSearchValue.toLowerCase())) {
        const regex = new RegExp(contentSearchValue, "i")
        matchedMainText = `<span>` + text.replace(regex, (match) => `<span class="${styles.highlightedText}">${match}</span>`) + `</span>`
        break
      }
    }
    if (!matchedMainText) {
      matchedMainText = mainTexts[0]
    }
    return matchedMainText
  }

  useEffect(() => {
    setArticles([])
    setCurrentPageNumber(PAGE_CONSTANTS.FIRST_PAGE_NUMBER)
    setIsLastArticleHaveBeenFetched(false)
    setIsLoading(false)
    setRefreshSearch(!refreshSearch)
  }, [contentSearchValue])
  useEffect(() => {
    if (articles.length !== 0) {
      setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1)
    }
  }, [articles])
  useEffect(() => {
    handleArticlesGet()
  }, [refreshSearch])

  return (

    <div className={styles.resultsBlock}>
      <div key={"resultsCount"} className={styles.resultsCount}>
        <h2>{`${contentSearchValue} (${numberOfArticles})`}</h2>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={handleArticlesGet}
        className={styles.list_container}
        hasMore={!isLastArticleHaveBeenFetched}
        loader={<p>{t('LoadingText')}</p>}
      >
        {contentSearchValue && articles.map((article) => (
          <div className={styles.container}>
            <div key={article.id} onClick={() => navigate(ROUTES.LOGIN)} className={styles.option}>
              <ul>
                <li>
                  <span>{article.category.categoryName}</span>
                  {
                    article.subCategory
                      ?
                      <>
                        <span>{" > "}</span>
                        <span>{article.subCategory.subCategoryName}</span>
                      </>
                      :
                      <></>
                  }
                  {
                    article.team
                      ?
                      <>
                        <span>{" > "}</span>
                        <span>{article.team.teamName}</span>
                      </>
                      :
                      <></>
                  }
                  <span>{" > "}</span>
                  <span>{article.title}</span>
                </li>
                <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getMatchedMainText(article.mainText)) }}></li>
              </ul>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default SearchResultsList
