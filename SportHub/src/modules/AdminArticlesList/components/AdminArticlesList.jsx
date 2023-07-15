import React, {useEffect, useState} from "react"
import {useAtom} from "jotai"
import InfiniteScroll from "react-infinite-scroll-component"
import {useTranslation} from "react-i18next"

import styles from "../styles/styles.module.scss"
import HorizontalCard from "./HorizontalCard"
import AutoComplete from "../../../ui/AutoComplete"
import getPageOfArticlesRequest from "../helpers/getPageOfArticlesRequest"
import ArticleManagement from "../../ArticleManagement"
import {PAGE_CONSTANTS} from "../../../constants/PageConstants"
import {adminMenuState} from "../../../store/states/adminMenuState"

function AdminArticlesList() {
    const [adminMenu, setAdminMenu] = useAtom(adminMenuState)
    const {category, setButtons, setContent} = adminMenu
    const [articles, setArticles] = useState([])
    const [team, setTeam] = useState()
    const [subcategory, setSubcategory] = useState()
    const [isPublished, setIsPublished] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isLastArticleHaveBeenFetched, setIsLastArticleHaveBeenFetched] = useState(false)
    const [currentPageNumber, setCurrentPageNumber] = useState(PAGE_CONSTANTS.FIRST_PAGE_NUMBER)
    const { i18n } = useTranslation()
    const [shouldFetchData, setShouldFetchData] = useState(false)

    async function fetchData() {
        if (isLoading) return

        try {
            setIsLoading(true)

            const pageOfArticles = await getPageOfArticlesRequest(i18n.language, category?.categoryId || 1, currentPageNumber)

            if(!pageOfArticles){
                console.error("Error. Request for articles fails")
                return
            }

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
        if (typeof (setButtons) == "function") {
            setButtons([
                { text: "Create article", function: onCreateArticleHandler, isOutlined: false }
            ])
        }
    }, [])
    useEffect(() => {
        setArticles([])
        setCurrentPageNumber(PAGE_CONSTANTS.FIRST_PAGE_NUMBER)
        setShouldFetchData(true)
    }, [category])
    useEffect(() => {
        if(articles.length !== 0){
            setCurrentPageNumber((prevPageNumber) => prevPageNumber+1)
            setShouldFetchData(true)
        }
    }, [articles])
    useEffect(() => {
        if(shouldFetchData){
            fetchData()
            setShouldFetchData(false)
        }
    }, [shouldFetchData])

    function convertArticlesToCards(){
        return articles.map((article, idx) => (
            <HorizontalCard {...article} key={idx} imageUrl={article.image.url}
                            location={article.location?.locationName}
                            subCategory={article.subCategory?.subCategoryName}
                            onClick={() => setContent(<ArticleManagement articleId={article.articleId} />)}/>
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

    function onCreateArticleHandler(){
        setContent(<ArticleManagement />)
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
            >
                {convertArticlesToCards()}
            </InfiniteScroll>
        </div>
    )
}


export default AdminArticlesList
