import React, {useEffect, useState} from 'react'
import AddMainArticle from "./AddMainArticle"
import CapsuleLable from "../../../../../ui/CapsuleLable"
import MAX_MAIN_ARTICLES_AMOUNT from "../constants/MaxMainArticlesAmount"
import styles from '../styles/style.module.scss'
import getMainArticlesRequest from "../helpers/getMainArticlesRequest"
import postMainArticlesRequest from "../helpers/postMainArticlesRequest"
import { useTranslation } from "react-i18next"

export default function MainArticlesConfigurator({setSaveMainArticles, setCancelMainArticle, language, setFleshMessageIsSuccessful, categories = []}){
    const {t, i18n} = useTranslation()

    const [startMainArticlesData, setStartMainArticlesData] = useState([])
    const [mainArticlesData, setMainArticlesData] = useState([])
    const [mainArticlesForms, setMainArticlesForms] = useState([])

    const GetMainArticles = async () => {
        const mainArticles = await getMainArticlesRequest(language?.languageId)
        const articles = []
        setMainArticlesData([])
        for(let articleCount = 0; articleCount < mainArticles.data?.length; articleCount++){
            const data = mainArticles.data[articleCount]
            articles.push({
                isLastMainArticle: null,
                category: data.category,
                subcategory: data.subCategory,
                team: data.team,
                article: {
                    articleId: data.articleId,
                    title: data.title
                }
            })
        }

        setMainArticlesData(articles)
        setStartMainArticlesData(articles)
    }

    const SaveChanges = () => {
        try {
            let request = []
            for (let articleCount = 0; articleCount < mainArticlesData.length; articleCount++) {
                request.push({
                    "order": mainArticlesData[articleCount].order,
                    "articleId": (mainArticlesData[articleCount].article.articleId) + "",
                    "languageId": language?.languageId
                })
            }
            postMainArticlesRequest(request)
            setStartMainArticlesData(mainArticlesData)
        }
        catch (error){
            setFleshMessageIsSuccessful(false)
        }
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
                                                                       language={language}
                                                                       categoriesOptions={categories}
                                                                       AddNewMainArticle={AddNewMainArticle}
                                                                       DeleteMainArticle={DeleteMainArticle}
                                                                       SaveData={SaveChangedOption} />)
        }

        setMainArticlesForms(newMainArticlesForms)
    }

    useEffect(() => {
        GetMainArticles()
    }, [language])

    useEffect(() => {
        if(typeof(setSaveMainArticles) == "function" && typeof(setCancelMainArticle) == "function") {
            setSaveMainArticles({function: SaveChanges})
            setCancelMainArticle({function: CancelChanges})
        }
        GenerateArticlesForms()
    }, [mainArticlesData, language])

    return (
        <div>
            <div className={styles.content}>

                <CapsuleLable label={t('AdminPage.HomeSection.MainArticlesConfigurator.MainArticles')}/>
                {mainArticlesData.length === 0
                    ?
                    <div className={styles.add_one_more_article}>
                        <div className={styles.click_box} onClick={() => AddNewMainArticle()}>
                            {t('AdminPage.HomeSection.MainArticlesConfigurator.AddMainArticle')}
                        </div>
                    </div>
                    : null}

                {mainArticlesForms}
            </div>
        </div>
    )
}
