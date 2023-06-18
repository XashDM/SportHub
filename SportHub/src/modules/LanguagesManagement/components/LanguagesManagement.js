import styles from "../styles/style.module.scss"
import Switch from "../../../ui/Switch"
import FlashMessage from "../../../ui/FlashMessage"
import PopUpRemovalWarning from "../components/PopUpRemovalWarning"
import PopUpAddLanguages from "../components/PopUpAddLanguages"

import { useState, useEffect } from "react"

import addLanguagesRequest from "../helpers/addLanguagesRequest"
import getLanguagesRequest from "../../../helpers/getLanguagesRequest"
import editLanguageRequest from "../helpers/editLanguageRequest"
import deleteLanguageRequest from "../helpers/deleteLanguageRequest"

import {LANGUAGES_CONSTANTS} from "../../../constants/LanguagesConstants"
import { useTranslation } from "react-i18next"
import checkCurrentLanguage from "../../../helpers/checkCurrentLanguage"

function LanguagesManagement({setButtons}) {
    const { t } = useTranslation()
    const [languages, setLanguages] = useState([])
    const [languagesToAdd, setLanguagesToAdd] = useState([])
    const [languageToDelete, setLanguageToDelete] = useState()

    const [openFlashMessage, setOpenFlashMessage] = useState(false)
    const [flashIsSuccess, setFlashIsSuccess] = useState(true)
    const [flashTitle, setFlashTitle] = useState()
    const [flashContent, setFlashContent] = useState()

    const [openPopUpRemovalWarning, setOpenPopUpRemovalWarning] = useState(false)
    const [openPopUpAddLanguages, setOpenPopUpAddLanguages] = useState(false)

    useEffect(() => {
        handleLanguagesGet()
        if(typeof(setButtons) == "function"){
            setButtons([{text: t('AdminPage.LanguagesManagement.AddLanguagesBtn'), function: handleOpenPopUpAddLanguages, isOutlined: false}])
        }
    }, [languages])

    const handleCloseFlashMessage = () => {
        setOpenFlashMessage(false)
    }

    const handleClosePopUpRemovalWarning = () => {
        setOpenPopUpRemovalWarning(false)
    }

    const handleOpenPopUpAddLanguages = () => {
        setOpenPopUpAddLanguages(true)
    }

    const handleClosePopUpAddLanguages = () => {
        setOpenPopUpAddLanguages(false)
    }

    const handleLanguagesAdd = async () => {
        console.log(languagesToAdd)
        const result = await addLanguagesRequest(languagesToAdd)
        if (result.status !== 200) {
            return
        }
        setLanguagesToAdd([])
        handleLanguagesGet()
        setOpenPopUpAddLanguages(false)
        setFlashTitle(t('AdminPage.LanguagesManagement.flashMsg.Success.Title'))
        setFlashContent(t('AdminPage.LanguagesManagement.flashMsg.Success.ContentAddLanguage'))
        setFlashIsSuccess(true)
        setOpenFlashMessage(true)
    }

    const handleLanguagesGet = async () => {
        const result = await getLanguagesRequest()
        setLanguages(result.data)
    }

    const handleToggleSwitch = async (event, shortTitle) => {
        const { checked } = event.target
        // Don't change switch position if language is 'en' (default) or response isn't Ok
        const result = await editLanguageRequest(shortTitle, checked)
        if ((shortTitle === "en" && !checked) || result.status !== 200) {
            setFlashTitle(t('AdminPage.LanguagesManagement.flashMsg.Error.Title'))
            setFlashContent(t('AdminPage.LanguagesManagement.flashMsg.Error.ContentShowHide'))
            setFlashIsSuccess(false)
            setOpenFlashMessage(true)
            return
        }
        const updatedLanguages = languages.map((language) =>
            language.shortTitle === shortTitle ? { ...language, isActive: checked } : language
        )
        setLanguages(updatedLanguages)
        setFlashTitle(t('AdminPage.LanguagesManagement.flashMsg.Success.Title'))
        setFlashContent(t('AdminPage.LanguagesManagement.flashMsg.Success.ContentShowHide'))
        setFlashIsSuccess(true)
        setOpenFlashMessage(true)
        checkCurrentLanguage()
    }

    const handleLanguageDelete = async () => {
        // Don't remove language from list if language is 'en' (default) or response isn't Ok
        const result = await deleteLanguageRequest(languageToDelete)
        if (languageToDelete === "en" || result.status !== 200) {
            setFlashTitle(t('AdminPage.LanguagesManagement.flashMsg.Error.Title'))
            setFlashContent(t('AdminPage.LanguagesManagement.flashMsg.Error.ContentDeleteLanguage'))
            setFlashIsSuccess(false)
            setOpenFlashMessage(true)
            return
        }
        const updatedLanguages = languages.filter((language) => language.shortTitle !== languageToDelete)
        setLanguages(updatedLanguages)
        setOpenPopUpRemovalWarning(false)
        setFlashTitle(t('AdminPage.LanguagesManagement.flashMsg.Success.Title'))
        setFlashContent(t('AdminPage.LanguagesManagement.flashMsg.Success.ContentDeleteLanguage'))
        setFlashIsSuccess(true)
        setOpenFlashMessage(true)
        checkCurrentLanguage()
    }

    return (
        <div className={styles.container}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>{t('AdminPage.LanguagesManagement.LanguagesCaption')}</th>
                            <th colSpan="2">{t('AdminPage.LanguagesManagement.ShowHideCaption')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {languages?.map((language) => (
                            <tr key={"language" + language.shortTitle}>
                                <td key={language.shortTitle}>{LANGUAGES_CONSTANTS.find(lang => lang.code === language.shortTitle.toLowerCase()).label}</td>
                                <td key={"showhide"+language.shortTitle}>
                                    <div className={styles.show_hide_container}>
                                        <div>
                                            <Switch 
                                                checked={language.isActive}
                                                onChange={(event) => handleToggleSwitch(event, language.shortTitle)} />
                                        </div>
                                    </div>
                                </td>
                                <td key={"delete"+language.shortTitle}>
                                    <span hint={t('AdminPage.LanguagesManagement.DeleteLanguageHint')}
                                        direction="down"
                                        onClick={() => { setLanguageToDelete(language.shortTitle); setOpenPopUpRemovalWarning(true) }}>
                                        <img className={styles.trashbin_image}
                                            src={process.env.PUBLIC_URL + '/icons/TrashBin.svg'}
                                            alt={""} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <FlashMessage title={flashTitle} 
                    content={flashContent} 
                    open={openFlashMessage}
                    isSuccess={flashIsSuccess}
                    handleClose={handleCloseFlashMessage} />
                <PopUpRemovalWarning open={openPopUpRemovalWarning}
                    handleDelete={handleLanguageDelete}
                    handleClose={handleClosePopUpRemovalWarning} />
                <PopUpAddLanguages open={openPopUpAddLanguages}
                    handleAdd={handleLanguagesAdd}
                    handleClose={handleClosePopUpAddLanguages}
                    languagesToAdd={languagesToAdd}
                    setLanguagesToAdd={setLanguagesToAdd} 
                    currentLanguages={languages}/>
            </div>
        </div>
    )
}

export default LanguagesManagement
