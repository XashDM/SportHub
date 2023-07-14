import styles from "../styles/style.module.scss"
import React from "react"

export default function HorizontalCard({imageUrl, title, mainText, subCategory, location, isPublished, onClick}) {
    return (
        <div className={styles.card} role={"card"} onClick={onClick}>
            <img src={imageUrl} alt={imageUrl} className={styles.image}/>

            <div className={styles.text_content_container}>
                <h3>{title}</h3>
                <p className={styles.description} dangerouslySetInnerHTML={{ __html: mainText }} />

                <div className={styles.space_between_container}>
                    {(subCategory || location) && <p>{subCategory} / {location}</p>}
                    {isPublished && <p className={styles.published}>Published</p>}
                </div>
            </div>
        </div>
    )
}
