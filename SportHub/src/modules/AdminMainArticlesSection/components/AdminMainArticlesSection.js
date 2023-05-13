import React, {useEffect, useState} from 'react'
import styles from '../styles/style.module.scss'
import AddMainArticle from "./AddMainArticle"
import MAX_MAIN_ARTICLES_AMOUNT from "../constants/MaxMainArticlesAmount"
import CapsuleLable from "../../../ui/CapsuleLable"

export default function AdminMainArticlesSection({setButtons}){

    const [mainArticlesData, setMainArticlesData] = useState([])
    const [mainArticlesForms, setMainArticlesForms] = useState([])
    const [languageId, setLanguageId] = useState(1)

    const SaveChanges = () => {
        let jsonPostRequest = []
        for (let articleCount = 0; articleCount < mainArticlesData.length; articleCount++)
            jsonPostRequest.push({
                                OrderNumber: mainArticlesData[articleCount].order,
                                ArticleId: mainArticlesData[articleCount].article.id,
                                LanguageId: 1})
        console.log(JSON.stringify(jsonPostRequest))
        return JSON.stringify(jsonPostRequest)
    }

    const CancelChanges = () =>{
        setMainArticlesData([])
        setMainArticlesForms([])
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
                                                                       AddNewMainArticle={AddNewMainArticle}
                                                                       DeleteMainArticle={DeleteMainArticle}
                                                                       SaveData={SaveChangedOption} />)
        }

        setMainArticlesForms(newMainArticlesForms)
    }

    useEffect(() => {
        GenerateArticlesForms()
    }, [mainArticlesData])

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

    return (
        <div>
            <div className={styles.content}>
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
