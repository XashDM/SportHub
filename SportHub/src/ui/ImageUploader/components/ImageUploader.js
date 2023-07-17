import styles from "../styles/style.module.scss"
import Label from "../../Label"
import React, { useState, useEffect } from "react"

export default function ImageUploader({ selectedImage, setSelectedImage, fileUrl }) {
    const [imageUrl, setImageUrl] = useState(fileUrl ? fileUrl : null)

    useEffect(() => {
        if (selectedImage instanceof Blob){
            setImageUrl(URL.createObjectURL(selectedImage))
        }
    }, [selectedImage])

    const handleImageSelect = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file)
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        setSelectedImage(file)
    }

    return (
        <div>
            <Label>Image*</Label>
            <div className={styles.container}>
                <input
                    className={imageUrl ? styles.image_uploader  + " " + styles.with_image : styles.image_uploader}
                    type="file"
                    onChange={handleImageSelect}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                    accept=".png, .jpg, .jpeg, .tif"
                />
                <div className={styles.add_image}>
                    <img src={process.env.PUBLIC_URL + '/icons/ImageUploader/ImageUploader.svg'} className={styles.add_image_icon} />
                    <div className={styles.add_image_text}>+Add picture or drop it right here<br/>You can add next formats: png. jpg. jpeg. tif </div>
                </div>      
            </div>
        </div>
    )
}