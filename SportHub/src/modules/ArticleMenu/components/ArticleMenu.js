import React, { useState, useEffect } from "react"
import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import TextEditor from "../../../ui/TextEditor"
import TabPanel from "../../../ui/TabPanel"
import Switch from "../../../ui/Switch"
import ImageUploader from "../../../ui/ImageUploader"
import AutoComplete from "../../../ui/AutoComplete"
import { useAuthStore } from "../../../store/useAuthStore"
import Label from "../../../ui/Label"

import getLanguagesRequest from "../../../helpers/getLanguagesRequest"
import getSubcategoriesRequest from "../helpers/getSubcategoriesRequest"
import getTeamsRequest from "../helpers/getTeamsRequest"
import getLocationsRequest from "../helpers/getLocationsRequest"
import newArticleRequest from "../helpers/newArticleRequest"

function ArticleMenu({ setButtons, category }) {
    const [languages, setLanguages] = useState([])
    const [tabData, setTabData] = useState([{ headline: "", caption: "", content: "" }])
    const [alt, setAlt] = useState("")

    const [activeTab, setActiveTab] = useState(0)

    const [selectedImage, setSelectedImage] = useState(null)

    const [subcategories, setSubcategories] = useState([{ subcategoryName: "", subcategoryId: "", categoryId: "" }])
    const [teams, setTeams] = useState([])
    const [locations, setLocations] = useState([])

    const [currentSubcategory, setCurrentSubcategory] = useState(null)
    const [currentTeam, setCurrentTeam] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)

    const [disabled, setDisabled] = useState(currentSubcategory === undefined || currentSubcategory === null)
    const [canBeSaved, setCanBeSaved] = useState(false)

    const [showComments, setShowComments] = useState(false)

    const authStore = useAuthStore()

    useEffect(() => {
        getLanguages()
        getLocations()
    }, [])

    useEffect(() => {
        getTabData()
    }, [languages])

    useEffect(() => {
        getSubcategories()
        setCurrentSubcategory(null)
        setCurrentTeam(null)
    }, [category])

    useEffect(() => {
        setDisabled(currentSubcategory === undefined || currentSubcategory === null)
        setCurrentTeam(null)
        getTeams(currentSubcategory?.subCategoryId)
    }, [currentSubcategory])

    useEffect(() => {
        checkIfCanBeSaved()
    }, [selectedImage, tabData, alt])

    useEffect(() => {
        if (typeof (setButtons) == "function") {
            setButtons([
                { text: "Cancel", function: cancelButton, isOutlined: true },
                { text: "Save", function: saveButton, isOutlined: false }
            ])
        }
    }, [canBeSaved, currentLocation, currentSubcategory, currentTeam])

    const checkIfCanBeSaved = () => {
        let filled = true
        for (let i = 0; i < tabData.length; i++) {
            if (tabData[i].headline === "" || tabData[i].caption === "" || tabData[i].content === "") {
                filled = false
                break
            }
        }

        if (selectedImage === null || alt === "") {
            filled = false
        }

        setCanBeSaved(filled)
    }

    const saveButton = () => {
        if (!canBeSaved) {
            console.log("data not filled")
            return
        }
        console.log("saved")
        const article = {
            AuthorId: authStore.userData.userId,
            CategoryId: category.categoryId,
            SubCategoryId: currentSubcategory?.subCategoryId,
            TeamId: currentTeam?.teamId,
            LocationId: currentLocation?.locationId,
            ShowComments: showComments,
            Infos: languages.map((language) => ({
                LanguageId: language.languageId,
                Title: tabData[language.value].headline,
                Subtitle: tabData[language.value].caption,
                MainText: tabData[language.value].content
            }))
        }
        const image = {
            Alt: alt,
        }

        const formData = new FormData();
        formData.append('file', selectedImage)
        formData.append('article', JSON.stringify(article))
        formData.append('image', JSON.stringify(image))
        newArticleRequest(formData)
    }

    const cancelButton = () => {

    }

    const getLanguages = async () => {
        let result = await getLanguagesRequest()

        for (let i = 0; i < result.data.length; i++) {
            result.data[i].value = i
        }
        setLanguages(result.data)
    }

    const getTabData = () => {
        if (languages.length !== 0) {
            const newTabData = []

            for (let i = 0; i < languages.length; i++) {
                newTabData.push({ headline: "", caption: "", content: "" })
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
                        optionLable={"locationName"}
                        propertyToCompare={"locationId"} />
                </div>
            </div>
            <Input label={"ALT.*"}
                placeholder={"Alternative text for picture"}
                value={alt}
                onChange={(event) => setAlt(event.target.value)} />
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
            <div>
            <Label>SHOW COMMENTS</Label>
            <Switch
                checked={showComments}
                onChange={() => setShowComments(!showComments)} />
            </div>
        </div>
    )
}

export default ArticleMenu
