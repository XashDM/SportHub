import React, { useState, useEffect } from "react"
import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import TextEditor from "../../../ui/TextEditor"
import TabPanel from "../../../ui/TabPanel"
import ImageUploader from "../../../ui/ImageUploader"
import AutoComplete from "../../../ui/AutoComplete"

import getLanguagesRequest from "../helpers/getLanguagesRequest"
import getSubcategoriesRequest from "../helpers/getSubcategoriesRequest"
import getTeamsRequest from "../helpers/getTeamsRequest"
import getLocationsRequest from "../helpers/getLocationsRequest"
import newArticleRequest from "../helpers/newArticleRequest"

function ArticleMenu({ setButtons, category }) {
    const [languages, setLanguages] = useState([])
    const [tabData, setTabData] = useState([{ alt: "", headline: "", caption: "", content: "" }])

    const [activeTab, setActiveTab] = useState(0)

    const [selectedImage, setSelectedImage] = useState(null)

    const [subcategories, setSubcategories] = useState([{ subcategoryName: "", subcategoryId: "", categoryId: ""}])
    const [teams, setTeams] = useState([])
    const [locations, setLocations] = useState([])

    const [currentSubcategory, setCurrentSubcategory] = useState(null)
    const [currentTeam, setCurrentTeam] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    
    const [disabled, setDisabled] = useState(currentSubcategory === undefined || currentSubcategory === null)
    const [canBeSaved, setCanBeSaved] = useState(false)

    useEffect(() => {
        getLanguages()
        getLocations()
        if(typeof(setButtons) == "function"){
            setButtons([{text: "Cancel", function: cancelButton, isOutlined: true}, {text: "Save", function: saveButton, isOutlined: false}])
        }
    }, [])

    useEffect(() => {
        getSubcategories()
        setCurrentSubcategory(null)
        setCurrentTeam(null)
    }, [category])


    useEffect(() => {
        getTabData()
    }, [languages])

    useEffect(() => {
        setDisabled(currentSubcategory === undefined || currentSubcategory === null)
        setCurrentTeam(null)
        getTeams(currentSubcategory?.subCategoryId)
    }, [currentSubcategory])


    const saveButton = () => {
        console.log(languages)
        const langId = ["ecf8dae9-6737-47a9-9c75-df17ce718abc", "da6540d5-20ff-403e-9cea-2f32b1098197"]
        const obj = {
            ArticleId:  "",
            AuthorId: "1",
            ImageId: "1",
            SubCategoryId: currentSubcategory?.categoryId,
            TeamId: currentTeam?.teamId,
            LocationId: currentLocation?.locationId,
            ShowComments: false,
            Infos: tabData.map((tab, index) => ({
                LanguageId: langId[index],
                Alt: tab.alt,
                Headline: tab.headline,
                Caption: tab.caption,
                Content: tab.content
            }))
        }
        console.log(obj)
        newArticleRequest(obj)
    }

    const cancelButton = () => {
        setCanBeSaved(true)
    }

    const getLanguages = async () => {
        const result = await getLanguagesRequest()

        for (let i = 0; i < result.data.length; i++) {
            result.data[i].value = i
        }
        setLanguages(result.data)
    }

    const getTabData = () => {
        if (languages.length ==! 0) {
            const newTabData = []

            for (let i = 0; i < languages.length; i++) {
                newTabData.push({ alt: "", headline: "", caption: "", content: "" })
            }

            setTabData(newTabData)
        }
        
    }

    const getSubcategories = async () => {
        const result = await getSubcategoriesRequest(category.categoryId)
        setSubcategories(result.data)
    }

    const getTeams = async (subcategoryId) => {
        const result = await getTeamsRequest(subcategoryId)
        setTeams(result.data)
    }

    const getLocations = async () => {
        const result = await getLocationsRequest()
        setLocations(result.data)
    }

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

    return (
        <div className={styles.container}>
            <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} languages={languages} />
            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            <div className={styles.three_col_container}>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={"subcategory"}
                        value={currentSubcategory}
                        setValue={setCurrentSubcategory}
                        options={subcategories}
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
                        options={teams}
                        areOptionsObjects={true}
                        optionLable={"teamName"}
                        propertyToCompare={"teamId"} />
                </div>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={"location"}
                        value={currentLocation}
                        setValue={setCurrentLocation}
                        disabled={disabled}
                        options={locations}
                        areOptionsObjects={true}
                        optionLable={"subcategoryName"}
                        propertyToCompare={"subcategoryId"} />
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

export default ArticleMenu
