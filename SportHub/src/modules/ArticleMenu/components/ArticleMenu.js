import React, { useState, useEffect } from "react"
import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import TextEditor from "../../../ui/TextEditor"
import TabPanel from "../../../ui/TabPanel"
import ImageUploader from "../../../ui/ImageUploader"
import AutoComplete from "../../../ui/AutoComplete"

import getLanguagesRequest from "../helpers/getLanguagesRequest"

export default function ArticleMenu({ category, setButtons }) {
    const [languages, setLanguages] = useState([])
    const [tabData, setTabData] = useState([{ alt: "", headline: "", caption: "", content: "" }])

    const [activeTab, setActiveTab] = useState(0)

    const [selectedImage, setSelectedImage] = useState(null)

    const [subCategories, setSubCategories] = useState([])
    // const [teams, setTeams] = useState([])
    // const [locations, setLocations] = useState([])

    const [currentSubCategory, setCurrentSubCategory] = useState(null)
    const [currentTeam, setCurrentTeam] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    
    const [disabled, setDisabled] = useState(currentSubCategory === undefined || currentSubCategory === null)

    useEffect(() => {
        getLanguages()
        if(typeof(setButtons) == "function"){
            setButtons([{text: "Cancel", function: test, isOutlined: true}, {text: "Save", function: test, isOutlined: false}])
        }
    }, [])

    useEffect(() => {
        getTabData()
    }, [languages])

    useEffect(() => {
        setDisabled(currentSubCategory === undefined || currentSubCategory === null)
    }, [currentSubCategory])


    const test = () => {
        console.log(1)
    }

    const getLanguages = async () => {
        const result = await getLanguagesRequest()

        for (let i = 0; i < result.data.length; i++) {
            result.data[i].value = i
        }
        setLanguages(result.data)
    }

    const getTabData = () => {
        const newTabData = tabData

        for (let i = 0; i < languages.length - 1; i++) {
            newTabData.push({ alt: "", headline: "", caption: "", content: "" })
        }
        setTabData(newTabData)
    }

    // const getSubCategories = async () => {
    //     const result = await getSubCategoriesRequest()
    //     setSubCategories(result.data)
    // }

    const inputChange = (event, property) => {
        const newInputValues = [...tabData]
        newInputValues[activeTab][property] = event.target.value
        setTabData(newInputValues)
    }

    const contentChange = (content) => {
        const newInputValues = [...tabData]
        newInputValues[activeTab].content = content
        setTabData(newInputValues)
    }

    if (languages.length === 0) return (<div></div>)
    return (
        <div className={styles.container}>
            <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} languages={languages} />
            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            <div className={styles.three_col_container}>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={"subcategory"}
                        value={currentSubCategory}
                        setValue={setCurrentSubCategory}
                        options={subCategories}
                        areOptionsObjects={true}
                        optionLable={"subCategoryName"}
                        propertyToCompare={"subCategoryId"} />

                </div>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={"team"}
                        value={currentTeam}
                        setValue={setCurrentTeam}
                        disabled={disabled}
                        options={subCategories}
                        areOptionsObjects={true}
                        optionLable={"subCategoryName"}
                        propertyToCompare={"subCategoryId"} />
                </div>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={"location"}
                        value={currentLocation}
                        setValue={setCurrentLocation}
                        disabled={disabled}
                        options={subCategories}
                        areOptionsObjects={true}
                        optionLable={"subCategoryName"}
                        propertyToCompare={"subCategoryId"} />
                </div>
            </div>
            <Input label={"ALT.*"}
                placeholder={"Alternative text for picture"}
                value={tabData[activeTab].alt}
                onChange={(event) => inputChange(event, "alt")} />
            <Input label={"ARTICLE HEADLINE*"}
                placeholder={"Name"}
                value={tabData[activeTab].headline}
                onChange={(event) => inputChange(event, "headline")} />
            <Input label={"CAPTION*"}
                value={tabData[activeTab].caption}
                placeholder={"Write caption here"}
                onChange={(event) => inputChange(event, "caption")} />
            <TextEditor
                value={tabData[activeTab].content}
                onChange={contentChange}
                activeTab={activeTab} />
        </div>
    )
}