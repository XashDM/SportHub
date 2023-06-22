import React, {useEffect, useState} from "react"
import styles from "../styles/styles.module.scss"
import HorizontalCard from "./HorizontalCard"
import AutoComplete from "../../../ui/AutoComplete"
import getPageOfArticlesRequest from "../helpers/getPageOfArticlesRequest"
import {useTranslation} from "react-i18next"
import InfiniteScroll from "react-infinite-scroll-component"

function AdminArticlesList({}) {
    const [articles, setArticles] = useState([])
    const [team, setTeam] = useState()
    const [subcategory, setSubcategory] = useState()
    const [isPublished, setIsPublished] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isLastArticleHaveBeenFetched, setIsLastArticleHaveBeenFetched] = useState(false)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const { i18n } = useTranslation()

    async function fetchData() {
        if (isLoading) return

        try {
            setIsLoading(true)

            const pageOfArticles = await getPageOfArticlesRequest(i18n.language, 2, currentPageNumber)

            if(pageOfArticles.length === 0){
                setIsLastArticleHaveBeenFetched(true)
                return
            }

            setArticles((prevArticles) => {
                const uniqueArticleIds = new Set(prevArticles.map(({ articleId }) => articleId))

                const filteredArticles = pageOfArticles.filter(({ articleId }) => !uniqueArticleIds.has(articleId))

                return [...prevArticles, ...filteredArticles]
            })
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(articles.length !== 0){
            setCurrentPageNumber((prevPageNumber) => prevPageNumber+1)
        }
    }, [articles])

    useEffect(() => {
        fetchData()
    }, [])


    function convertArticlesToCards(){
        return articles.map((article, idx) => (
            <HorizontalCard {...article} key={idx} imageUrl={article.image.url}
                            location={article.location.locationName} subCategory={article.subCategory.subCategoryName}/>
        ))
    }
    function getAutocomplete(value, setter, defaultValue){
        const options = [{name: defaultValue, id: 1}]

        return (
            <AutoComplete
                value={value}
                setValue={setter}
                options={options}
                defaultValue={options[0]}
                areOptionsObjects={true}
                optionLable={"name"}
                propertyToCompare={"id"} />
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.options_container}>
                {getAutocomplete(subcategory, setSubcategory, "All Subcategories")}
                {getAutocomplete(team, setTeam, "All teams")}
                {getAutocomplete(isPublished, setIsPublished, "All")}
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchData}
                className={styles.list_container}
                hasMore={!isLastArticleHaveBeenFetched}
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
            >
                {convertArticlesToCards()}
            </InfiniteScroll>
        </div>
    )
}


export default AdminArticlesList
