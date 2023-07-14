import React, {useEffect, useState} from 'react'
import AddMainArticle from "./AddMainArticle"
import CapsuleLable from "../../../../../ui/CapsuleLable"
import FlashMessage from "../../../../../ui/FlashMessage"
import MAX_MAIN_ARTICLES_AMOUNT from "../constants/MaxMainArticlesAmount"
import styles from '../styles/style.module.scss'
import getMainArticlesRequest from "../helpers/getMainArticlesRequest"
import postMainArticlesRequest from "../helpers/postMainArticlesRequest"

export default function MainArticlesConfigurator({setSaveMainArticles, setCancelMainArticle, categories}){

    const [startMainArticlesData, setStartMainArticlesData] = useState([])
    const [mainArticlesData, setMainArticlesData] = useState([])
    const [mainArticlesForms, setMainArticlesForms] = useState([])
    const [languageId, setLanguageId] = useState("0")

    const [fleshMessageIsOpen, setFleshMessageIsOpen] = useState(false)
    const handleCloseFleshMessage = () => setFleshMessageIsOpen(false)

    const [fleshMessageIsSuccessful, setFleshMessageIsSuccessful] = useState(true)

    const GetMainArticles = async () => {
        const mainArticles = await getMainArticlesRequest(languageId)
        let articles = []
        for (let articleCount in mainArticles.data){
            const data = mainArticles.data[articleCount]
            articles[articleCount] = {
                isLastMainArticle: null,
                category: {
                    categoryId: data.category.categoryId,
                    categoryName: data.category.categoryName
                },
                subcategory: {
                    subCategoryId: data.subCategory.subCategoryId,
                    subCategoryName: data.subCategory.subCategoryName
                },
                team: {
                    teamId: data.team.teamId,
                    teamName: data.team.teamName,
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

    const SaveChanges = () => {
        try {
            let jsonPostRequest = []
            for (let articleCount = 0; articleCount < mainArticlesData.length; articleCount++) {
                jsonPostRequest.push({
                    "order": mainArticlesData[articleCount].order,
                    "articleId": (mainArticlesData[articleCount].article.articleId) + "",
                    "languageId": languageId
                })
            }

            postMainArticlesRequest(jsonPostRequest)
            setFleshMessageIsSuccessful(true)
            setStartMainArticlesData(mainArticlesData)
        }
        catch (error){
            setFleshMessageIsSuccessful(false)
        }
        setFleshMessageIsOpen(true)
    }

    const CancelChanges = () => {
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
                                                                       categoriesOptions={categories}
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

    useEffect( () => {
        GetMainArticles()
    }, [])

    useEffect(() => {
        GenerateArticlesForms()
    }, [mainArticlesData])

    useEffect(() => {
        if(typeof(setSaveMainArticles) == "function" && typeof(setCancelMainArticle) == "function") {
            setSaveMainArticles({function: SaveChanges})
            setCancelMainArticle({function: CancelChanges})
        }
    }, [mainArticlesData, languageId])

    return (
        <div>
            <div className={styles.content}>

                <FlashMessage title={fleshMessageIsSuccessful ? "Changes saved" : "Changes are not saved"}
                              content={fleshMessageIsSuccessful ? "Main articles are successfully saved." : "Main articles are not saved."}
                              isSuccess={fleshMessageIsSuccessful} open={fleshMessageIsOpen} handleClose={handleCloseFleshMessage}/>

                <CapsuleLable label={"MAIN ARTICLES"}/>

                {mainArticlesData.length === 0
                    ?
                    <div className={styles.add_one_more_article}>
                        <div className={styles.click_box} onClick={() => AddNewMainArticle()}>
                            + Add main article
                        </div>
                    </div>
                    : null}

                {mainArticlesForms.map((form) => {
                    return form
                })}

            </div>
        </div>
    )
}
