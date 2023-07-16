import React, { useState } from "react"
import MainPageContainer from "../../../components/MainPageContainer"
import styles from "../styles/style.module.scss"
import { useParams } from "react-router-dom"
import ArticleView from "../../../modules/ArticleView/components/ArticleView"
import { useTranslation } from "react-i18next"

export default function Article() {
    const {articleId} = useParams()
    const { t, i18n } = useTranslation()
    
    return (
        <MainPageContainer>
            <div className={styles.container}>
                <ArticleView articleId={articleId} language={i18n.language}/>
            </div>
        </MainPageContainer>
    )
}
