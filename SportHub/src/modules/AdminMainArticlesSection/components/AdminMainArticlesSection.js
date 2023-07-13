import React, {useEffect, useState} from 'react'
import AddMainArticle from "./AddMainArticle"
import CapsuleLable from "../../../ui/CapsuleLable"
import FlashMessage from "../../../ui/FlashMessage"
import MAX_MAIN_ARTICLES_AMOUNT from "../constants/MaxMainArticlesAmount"
import styles from '../styles/style.module.scss'
import getMainArticlesRequest from "../helpers/getMainArticlesRequest"
import postMainArticlesRequest from "../helpers/postMainArticlesRequest"
import getCategoriesRequest from "../helpers/getCategoriesRequest"
import {useAtom} from "jotai";
import {adminMenuState} from "../../../store/states/adminMenuState";

export default function AdminMainArticlesSection(){
    const [adminMenu, setAdminMenu] = useAtom(adminMenuState)
    const { setButtons } = adminMenu
    const [startMainArticlesData, setStartMainArticlesData] = useState([])
    const [mainArticlesData, setMainArticlesData] = useState([])
    const [mainArticlesForms, setMainArticlesForms] = useState([])
    const [languageId, setLanguageId] = useState("0")

    const [categoriesOption, setCategoriesOption] = useState([])

    const [fleshMessageIsOpen, setFleshMessageIsOpen] = useState(false)
    const handleCloseFleshMessage = () => setFleshMessageIsOpen(false)

    const [fleshMessageIsSuccessful, setFleshMessageIsSuccessful] = useState(true)

    const GetMainArticles = async () => {
        const mainArticles = await getMainArticlesRequest(languageId)
        let articles = []
        for (let article in mainArticles.data){
            const data = mainArticles.data[article]
            articles[data.order] = {
                order: data.order,
                isLastMainArticle: null,
                category: {
                    categoryId: data.categoryId,
                    categoryName: data.categoryName
                },
                subcategory: {
                    subCategoryId: data.subCategoryId,
                    subCategoryName: data.subCategoryName
                },
                team: {
                    teamId: data.teamId,
                    teamName: data.teamName,
                },
                article: {
                    articleId: data.articleId,
                    title: data.title
                }
            }
        }
        setMainArticlesData(articles)
        setStartMainArticlesData(articles)
    }

    const GetCategories = async () => {
        const res = await getCategoriesRequest()
        setCategoriesOption(res)
    }

    const SaveChanges = () => {
        try {
            let jsonPostRequest = []
            for (let articleCount = 0; articleCount < mainArticlesData.length; articleCount++)
                jsonPostRequest.push({
                    order: mainArticlesData[articleCount].order,
                    articleId: (mainArticlesData[articleCount].article.articleId) + "",
                    languageId: languageId
                })

            postMainArticlesRequest(jsonPostRequest)
            setFleshMessageIsSuccessful(true)
            setStartMainArticlesData(mainArticlesData)
        }
        catch (error){
            setFleshMessageIsSuccessful(false)
        }
        setFleshMessageIsOpen(true)
    }

    const CancelChanges = () =>{
        setMainArticlesData(startMainArticlesData)
    }

    const AddNewMainArticle = () => {
        if (mainArticlesData.length !== MAX_MAIN_ARTICLES_AMOUNT) {
            setMainArticlesData([...mainArticlesData, {order: null,
                                                    isLastMainArticle: null,
                                                    category: null,
                                                    subcategory: null,
                                                    team: null,
                                                    article: null
            }])
        }
    }

    const DeleteMainArticle = (index) => {
        const newMainArticleData = [...mainArticlesData]
        newMainArticleData.splice(index, 1)
        setMainArticlesData(newMainArticleData);
    }

    const SaveChangedOption = (order, category, subcategory, team, article) => {
        const mainArticleWithChangedOption = [...mainArticlesData]

        mainArticleWithChangedOption[order].category = category
        mainArticleWithChangedOption[order].subcategory = subcategory
        mainArticleWithChangedOption[order].team = team
        mainArticleWithChangedOption[order].article = article

        setMainArticlesData(mainArticleWithChangedOption)
    }

    const GenerateArticlesForms = () => {
        let newMainArticlesForms = []
        setMainArticlesForms([])
        for (let articleFormsCount = 0; articleFormsCount < mainArticlesData.length && articleFormsCount < MAX_MAIN_ARTICLES_AMOUNT; articleFormsCount++){
            const mainArticleDataWithNewOrder = [...mainArticlesData];
            mainArticleDataWithNewOrder[articleFormsCount].order = articleFormsCount
            mainArticleDataWithNewOrder[articleFormsCount].isLastMainArticle = articleFormsCount === mainArticleDataWithNewOrder.length - 1 && articleFormsCount !== MAX_MAIN_ARTICLES_AMOUNT - 1
            setMainArticlesData(mainArticleDataWithNewOrder)

            const mainArticlesProps = mainArticlesData[articleFormsCount]
            newMainArticlesForms[articleFormsCount] = (<AddMainArticle {...mainArticlesProps}
                                                                       key={articleFormsCount}
                                                                       languageId={languageId}
                                                                       categoriesOptions={categoriesOption}
                                                                       AddNewMainArticle={AddNewMainArticle}
                                                                       DeleteMainArticle={DeleteMainArticle}
                                                                       SaveData={SaveChangedOption} />)
        }

        setMainArticlesForms(newMainArticlesForms)
    }

    useEffect(() => {
        setMainArticlesData([])
        setMainArticlesForms([])
    }, [languageId])

    useEffect(() =>{
        if(typeof(setButtons) == "function"){
                setButtons([{text: "Cancel", function: CancelChanges, isOutlined: true},
                    {text: "Save changes", function: SaveChanges, isOutlined: false}])
        }
    })

    useEffect( () => {
        GetCategories()
        GetMainArticles()
    }, [])

    useEffect(() => {
        GenerateArticlesForms()
    }, [mainArticlesData])

    return (
        <div>
            <div className={styles.content}>

                <FlashMessage title={fleshMessageIsSuccessful ? "Changes saved" : "Changes are not saved"}
                              content={fleshMessageIsSuccessful ? "Main articles are successfully saved." : "Main articles are not saved."}
                              isSuccess={fleshMessageIsSuccessful} open={fleshMessageIsOpen} handleClose={handleCloseFleshMessage}/>

                <CapsuleLable label={"MAIN ARTICLES"}/>

                {mainArticlesData.length === 0
                    ?
                    <div className={styles.add_one_more_article} onClick={() => AddNewMainArticle()}>
                        + Add main article
                    </div>
                    : null}

                {mainArticlesForms.map((form) => {
                    return form
                })}

            </div>
        </div>
    )
}
