import React, { useEffect, useState } from "react"
import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import TextEditor from "../../../ui/TextEditor"
import TabPanel from "../../../ui/TabPanel"
import ImageUploader from "../../../ui/ImageUploader"

export default function ArticleMenu({languages, tabsData}){
    const [activeTab, setActiveTab] = useState(0)
    const [tabDatas, setInputValues] = useState(tabsData)
    const [selectedImage, setSelectedImage] = useState(null)

    const inputChange = (event, property) => {
        const newInputValues = [...tabDatas]
        newInputValues[activeTab][property] = event.target.value
        setInputValues(newInputValues)
    }

    const contentChange = (content) => {
        const newInputValues = [...tabDatas]
        newInputValues[activeTab].content = content
        setInputValues(newInputValues)
    }

    return (
        <div className={styles.container}>
            <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} tabList={languages}/>
            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            <Input label={"ALT.*"}
                placeholder={"Alternative text for picture"}
                value={tabDatas[activeTab].alt}
                onChange={(event) => inputChange(event, "alt")}/>
            <Input label={"ARTICLE HEADLINE*"}
                placeholder={"Name"}
                value={tabDatas[activeTab].headline}
                onChange={(event) => inputChange(event, "headline")}/>
            <Input label={"CAPTION*"}
                value={tabDatas[activeTab].caption}
                placeholder={"Write caption here"}
                onChange={(event) => inputChange(event, "caption")}/>
            <TextEditor 
                value={tabDatas[activeTab].content} 
                onChange={contentChange}
                activeTab={activeTab}/>
        </div>
    )
}