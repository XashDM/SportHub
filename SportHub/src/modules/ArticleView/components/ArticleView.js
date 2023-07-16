import React from "react"
import styles from "../styles/style.module.scss"

function ArticleView({ url, title, subtitle, mainText, location, category, subCategory, publishingDate }) {
    const currentDate = new Date()

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.category}>{category.categoryName}</div>
                {subCategory?<div className={styles.subcategory}>&nbsp;{"> " + subCategory}</div>:null}
                {location?<div className={styles.location}>&nbsp;{"> " + location}</div>:null}
                {title?<div className={styles.headline}>&nbsp;{"/ " + title}</div>:null}
                
            </div>
            <div className={styles.image_container}>
                <div style={{
            backgroundImage: `url(${url})`
          }}className={styles.image} />
                <div className={styles.info_card}>
                    <div className={styles.info_card_date}>
                        <div className={styles.date}>Published / {publishingDate}</div>
                        <div className={styles.caption}>{subtitle}</div>
                        <div className={styles.headline}>{title}</div>
                    </div>
                </div>
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: mainText }}></div>
        </div>
    )
}

export default ArticleView
