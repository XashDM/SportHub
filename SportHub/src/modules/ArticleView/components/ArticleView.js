import React from "react"
import styles from "../styles/style.module.scss"
import { useState, useEffect } from "react"
import * as DOMPurify from 'dompurify'

import getArticleByIdAndLanguage from "../helpers/getArticleByIdAndLanguage"

function ArticleView({ articleId, language}) {
    const [article, setArticle] = useState(null)

    const getArticle = async () => {
        const result = await getArticleByIdAndLanguage(articleId, language)
        console.log(result)
        setArticle(result)
    }
    useEffect(() => {
        getArticle()
    }, [])

    if (!article) return null
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.category}>{article.category.categoryName}</div>
                {article.subCategory ? <div className={styles.subcategory}>&nbsp;{"> " + article.subCategory.subCategoryName}</div> : null}
                {article.location ? <div className={styles.location}>&nbsp;{"> " + article.location.locationName}</div> : null}
                {article.title ? <div className={styles.headline}>&nbsp;{"/ " + article.title}</div> : null}

            </div>
            <div className={styles.image_container}>
                <div style={{backgroundImage: `url(${article.image.url})`}} className={styles.image} />
                <div className={styles.info_card}>
                    <div className={styles.info_card_date}>
                        <div className={styles.date}>Published / {article.publishingDate.slice(0, 10)}</div>
                        <div className={styles.caption}>{article.subtitle}</div>
                        <div className={styles.headline}>{article.title}</div>
                    </div>
                </div>
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.mainText) }}></div>
        </div>
    )
}

export default ArticleView
