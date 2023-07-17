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
import PopUpRemovalWarning from "../../../ui/PopUpRemovalWarning"
import {useAtom} from "jotai"
import {adminMenuState} from "../../../store/states/adminMenuState"
import AdminArticlesList from "../../../modules/AdminArticlesList"

import getLanguagesRequest from "../../../helpers/getLanguagesRequest"
import getSubcategoriesRequest from "../helpers/getSubcategoriesRequest"
import getTeamsRequest from "../helpers/getTeamsRequest"
import getLocationsRequest from "../helpers/getLocationsRequest"
import articleCanBeSaved from "../helpers/articleCanBeSaved"
import { useTranslation } from "react-i18next"

function ArticleMenu({ article = null, image = null, request }) {
    const {t, i18n} = useTranslation()

    const [adminMenu, setAdminMenu] = useAtom(adminMenuState)
    const {category, setButtons, setContent} = adminMenu
    
    const [activeTab, setActiveTab] = useState(0)

    const [languages, setLanguages] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [teams, setTeams] = useState([])
    const [locations, setLocations] = useState([])

    const [selectedImage, setSelectedImage] = useState(null)
    const [alt, setAlt] = useState(null)

    const [currentSubcategory, setCurrentSubcategory] = useState(null)
    const [currentTeam, setCurrentTeam] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)

    const [tabData, setTabData] = useState([])

    const [disabled, setDisabled] = useState(currentSubcategory === null)
    const [canBeSaved, setCanBeSaved] = useState(false)
    const [openPopUpConfirmation, setOpenPopUpConfirmation] = useState(false)
    const [openPopUpWarning, setOpenPopUpWarning] = useState(false)

    const [showComments, setShowComments] = useState(article?.showComments)

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
        setCanBeSaved(articleCanBeSaved(tabData, selectedImage, alt, article))
    }, [selectedImage, tabData, alt])

    useEffect(() => {
        if (typeof (setButtons) == "function") {
            setButtons([
                { text: t('AdminPage.ArticleMenu.CancelBtn'), function: cancelButton, isOutlined: true },
                { text: t('AdminPage.ArticleMenu.SaveBtn'), function: saveButton, isOutlined: false }
            ])
        }
    }, [canBeSaved, currentLocation, currentSubcategory, currentTeam, tabData, selectedImage, alt, showComments, i18n.language])

    useEffect(() => {
        if (subcategories.length !== 0 && article !== null && article?.subCategoryId) {
            const subcategory = subcategories.find(subcategory => subcategory?.subCategoryId === article?.subCategoryId)
            setCurrentSubcategory(subcategory)
        }
    }, [subcategories])

    useEffect(() => {
        if (teams.length !== 0 && article !== null && article?.teamId) {
            const team = teams.find(team => team?.teamId === article?.teamId)
            setCurrentTeam(team)
        }
    }, [teams])

    useEffect(() => {
        if (locations.length !== 0 && article !== null && article?.locationId) {
            const location = locations.find(location => location?.locationId === article?.locationId)
            setCurrentLocation(location)
        }
    }, [locations])

    useEffect(() => {
        if (image !== null) {
            setAlt(image.alt)
        }
    }, [image])

    const saveButton = () => {
        if (!canBeSaved) {
            setOpenPopUpWarning(true)
        }
        else {
            const newArticleData = {
                AuthorId: authStore.userData.userId,
                CategoryId: category?.categoryId,
                SubCategoryId: currentSubcategory?.subCategoryId,
                TeamId: currentTeam?.teamId,
                LocationId: currentLocation?.locationId,
                ShowComments: showComments,
                Infos: languages.map((language) => ({
                    LanguageId: language?.languageId,
                    Title: tabData[language.value]?.headline,
                    Subtitle: tabData[language.value]?.caption,
                    MainText: tabData[language.value]?.content
                }))
            }

            if (article !== null) {
                newArticleData.ArticleId = article.articleId
                newArticleData.PublishingDate = article.publishingDate
                newArticleData.imageId = article.imageId
                newArticleData.Published = article.published
            }

            const newImage = {
                Alt: alt,
            }

            if (image !== null) {
                newImage.Url = image.url
                newImage.ImageId = image.imageId
            }

            const formData = new FormData()
            formData.append('file', selectedImage)
            formData.append('article', JSON.stringify(newArticleData))
            formData.append('image', JSON.stringify(newImage))
            request(formData)
            setContent(<AdminArticlesList />)
        }
    }

    const cancelButton = () => {
        setOpenPopUpConfirmation(true)
    }

    const popUpConfirmationAction = () => {
        setContent(<AdminArticlesList />)
    }

    const popUpConfirmationCancel = () => {
        setOpenPopUpConfirmation(false)
    }

    const popUpWarning = () => {
        setOpenPopUpWarning(false)
    }

    const getLanguages = async () => {
        let result = await getLanguagesRequest()

        for (let i = 0; i < result.data.length; i++) {
            result.data[i].value = i
        }
        setLanguages(result.data)
    }

    const getTabData = () => {
        let newTabData = []
        for (let i = 0; i < languages.length; i++) {
            newTabData.push({ headline: "", caption: "", content: "" })

            const info = article?.infos.find(info => info.languageId === languages[i].languageId)
            if (info) {
                newTabData[i].headline = info.title
                newTabData[i].caption = info.subtitle
                newTabData[i].content = info.mainText
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
            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} fileUrl={image?.url} />
            <div className={styles.three_col_container}>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={t('AdminPage.ArticleMenu.SubCategoryLabel')}
                        value={currentSubcategory}
                        setValue={setCurrentSubcategory}
                        options={subcategories}
                        areOptionsObjects={true}
                        optionLable={"subCategoryName"}
                        propertyToCompare={"subCategoryId"} />

                </div>
                <div className={styles.col_element}>
                    <AutoComplete
                        label={t('AdminPage.ArticleMenu.TeamLabel')}
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
                        label={t('AdminPage.ArticleMenu.LocationLabel')}
                        value={currentLocation}
                        setValue={setCurrentLocation}
                        disabled={disabled}
                        options={locations}
                        areOptionsObjects={true}
                        optionLable={"locationName"}
                        propertyToCompare={"locationId"} />
                </div>
            </div>
            <Input label={t('AdminPage.ArticleMenu.AltLabel')}
                placeholder={t('AdminPage.ArticleMenu.AltPlaceholder')}
                value={alt}
                onChange={(event) => setAlt(event.target.value)} />
            <Input label={t('AdminPage.ArticleMenu.HeadlineLabel')}
                placeholder={t('AdminPage.ArticleMenu.HeadlinePlaceholder')}
                value={tabData[activeTab]?.headline}
                onChange={(event) => inputChange(event, "headline")} />
            <Input label={t('AdminPage.ArticleMenu.CaptionLabel')}
                value={tabData[activeTab]?.caption}
                placeholder={t('AdminPage.ArticleMenu.CaptionPlaceholder')}
                onChange={(event) => inputChange(event, "caption")} />
            <TextEditor
                value={tabData[activeTab]?.content}
                onChange={contentChange}
                activeTab={activeTab} />
            <div>
                <Label>{t('AdminPage.ArticleMenu.ShowComments')}</Label>
                <Switch
                    checked={showComments}
                    onChange={() => setShowComments(!showComments)} />
            </div>
            <PopUpRemovalWarning open={openPopUpConfirmation}
                    handleAction={popUpConfirmationAction}
                    handleCancel={popUpConfirmationCancel}
                    icon={"PopUpWarningExclamationMark.svg"}
                    section={"ArticleMenuCancel"} />
             <PopUpRemovalWarning open={openPopUpWarning}
                    handleAction={popUpWarning}
                    icon={"PopUpWarningExclamationMark.svg"}
                    section={"ArticleMenuMissingData"} />
        </div>
    )
}

export default ArticleMenu
