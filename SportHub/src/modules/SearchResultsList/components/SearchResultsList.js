import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/style.module.scss"
import { ROUTES } from "../../../routes/routes"
import getSearchArticlesRequest from "../../SearchDropdownList/helpers/getSearchArticlesRequest"
import { PAGE_CONSTANTS } from "../../../constants/PageConstants"
import { useTranslation } from "react-i18next"
import InfiniteScroll from "react-infinite-scroll-component"

const SearchResultsList = ({ contentSearchValue }) => {
  const navigate = useNavigate()

  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isLastArticleHaveBeenFetched, setIsLastArticleHaveBeenFetched] = useState(false)
  const [currentPageNumber, setCurrentPageNumber] = useState(PAGE_CONSTANTS.FIRST_PAGE_NUMBER)
  // need this because if use currentPageNumber for refreshing search results, it will broke
  // after first result with number of pages <= 1
  const [refreshSearch, setRefreshSearch] = useState(false)

  const [articles, setArticles] = useState([])

  const handleArticlesGet = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)

      const response = await getSearchArticlesRequest(i18n.language, contentSearchValue, currentPageNumber, 5)
      const pageOfArticles = response.data
      if (!pageOfArticles) {
        console.error("Error. Request for articles fails")
        return
      }
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
        matchedMainText = text
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
        <h2>{contentSearchValue + " (" + articles.length + ")"}</h2>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={handleArticlesGet}
        className={styles.list_container}
        hasMore={!isLastArticleHaveBeenFetched}
        loader={<p>Loading...</p>}
        endMessage={<p>End of search.</p>}
      >
        {contentSearchValue && articles.map((article) => (
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
              <li><span>{getMatchedMainText(article.mainText)}</span></li>
            </ul>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default SearchResultsList;
