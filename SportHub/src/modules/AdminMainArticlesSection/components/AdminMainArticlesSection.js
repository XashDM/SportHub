import React, {useEffect, useState} from 'react'
import styles from '../styles/style.module.scss'
import AddMainArticle from "./AddMainArticle"
import MAX_MAIN_ARTICLES_AMOUNT from "../constants/MaxMainArticlesAmount"
import LableForModules from "../../../ui/LabelForModules"

export default function AdminMainArticlesSection({setButtons}){

    const [mainArticles, setMainArticles] = useState([])
    const [content, setContent] = useState([])
    const [languageId, setLanguageId] = useState(1)

    useEffect(() => {
        setMainArticles([])
        setContent([])
    }, [languageId])

    useEffect(() => {
        GenerateArticlesForms()
    }, [mainArticles])

    const SaveChanges = () => {
        let jsonPostRequest = []
        for (let articleCount = 0; articleCount < mainArticles.length; articleCount++)
            jsonPostRequest.push({
                                OrderNumber: mainArticles[articleCount].order,
                                ArticleId: mainArticles[articleCount].article.id,
                                LanguageId: 1})
        console.log(JSON.stringify(jsonPostRequest))
        return JSON.stringify(jsonPostRequest)
    }

    const CancelChanges = () =>{
        setMainArticles([])
        setContent([])
    }

    useEffect(() =>{
        if(typeof(setButtons) == "function"){
            setButtons([{text: "Cancel", function: CancelChanges, isOutlined: true},
                {text: "Save changes", function: SaveChanges, isOutlined: false}])
        }
    })

    const GenerateAddMainArticleButton = () => {
        if (mainArticles.length === 0)
            return (
                <div className={styles.add_one_more_article} onClick={() => AddNewMainArticle()}>
                + Add main article
                </div>
            )
    }

    const AddNewMainArticle = () => {
        if (mainArticles.length !== MAX_MAIN_ARTICLES_AMOUNT) {
            setMainArticles([...mainArticles, {order: null,
                                                    isTheLast: null,
                                                    category: null,
                                                    subcategory: null,
                                                    team: null,
                                                    article: null
            }])
        }
    }

    const DeleteMainArticle = (index) => {
        const newList = [...mainArticles]
        newList.splice(index, 1)
        setMainArticles(newList);
    }

    const SaveData = (order, category, subcategory, team, article) => {
        const newList = [...mainArticles]
        newList[order].category = category
        newList[order].subcategory = subcategory
        newList[order].team = team
        newList[order].article = article
        setMainArticles(newList)
    }

    const GenerateArticlesForms = () => {
        let contentList = []
        setContent([])
        for (let articleFormsCount = 0; articleFormsCount < mainArticles.length && articleFormsCount < MAX_MAIN_ARTICLES_AMOUNT; articleFormsCount++){
            const newList = [...mainArticles];
            newList[articleFormsCount].order = articleFormsCount
            newList[articleFormsCount].isTheLast = articleFormsCount === newList.length - 1 && articleFormsCount !== MAX_MAIN_ARTICLES_AMOUNT - 1
            setMainArticles(newList)

            contentList[articleFormsCount] = (<AddMainArticle
                            key={articleFormsCount}
                            selectedOrder={mainArticles[articleFormsCount].order}
                            isLastMainArticle={mainArticles[articleFormsCount].isTheLast}
                            selectedCategory={mainArticles[articleFormsCount].category}
                            selectedSubcategory={mainArticles[articleFormsCount].subcategory}
                            selectedTeam={mainArticles[articleFormsCount].team}
                            selectedArticle={mainArticles[articleFormsCount].article}
                            AddNewMainArticle={AddNewMainArticle}
                            DeleteMainArticle={DeleteMainArticle}
                            SaveData={SaveData} />)
        }

        setContent(contentList)
    }

    return (
        <div>
            <div className={styles.content}>
                <LableForModules label={"MAIN ARTICLES"}/>
                {GenerateAddMainArticleButton()}
                {content.map((form) => {
                    return form
                })}
            </div>
        </div>
    )
}
