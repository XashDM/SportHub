import styles from "../styles/style.module.scss"
import Label from "../../Label"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"


export default function ImageUploader({setSelectedImage }) {
    const {t, i18n} = useTranslation()

    const [image, setImage] = useState(null)

    const handleImageSelect = (event) => {
        const file = event.target.files[0]
        if (file) {
            setSelectedImage(file)
            setImage(URL.createObjectURL(file))
            event.target.classList.add(styles.with_image)
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        setSelectedImage(file)
        setImage(URL.createObjectURL(file))
        event.target.classList.add(styles.with_image)
    }

    return (
        <div>
            <Label>{t('AdminPage.ArticleMenu.ImageLabel')}</Label>
            <div className={styles.container}>
                <input
                    className={styles.image_uploader}
                    type="file"
                    onChange={handleImageSelect}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                    accept=".png, .jpg, .jpeg, .tif"
                />
                <div className={styles.add_image}>
                    <img src={process.env.PUBLIC_URL + '/icons/ImageUploader/ImageUploader.svg'} className={styles.add_image_icon} />
                    <div className={styles.add_image_text}>{t('AdminPage.ArticleMenu.ImagePlaceholderPart1')}<br/>{t('AdminPage.ArticleMenu.ImagePlaceholderPart2')}</div>
                </div>      
            </div>
        </div>
    )
}