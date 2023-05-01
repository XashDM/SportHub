import styles from "../styles/style.module.scss"
import Switch from "../../../ui/Switch"
import FlashMessage from "../../../ui/FlashMessage"
import PopUpRemovalWarning from "../components/PopUpRemovalWarning"
import PopUpAddLanguages from "../components/PopUpAddLanguages"

import { useState, useEffect } from "react"

import addLanguagesRequest from "../helpers/addLanguagesRequest"
import getLanguagesRequest from "../helpers/getLanguagesRequest"
import editLanguageRequest from "../helpers/editLanguageRequest"
import deleteLanguageRequest from "../helpers/deleteLanguageRequest"

import {LANGUAGES_CONSTANTS} from "../../../constants/LanguagesConstants"

import Button from "../../../ui/Button"


function LanguagesManagement() {
    const [languages, setLanguages] = useState([])
    const [languagesToAdd, setLanguagesToAdd] = useState([])
    const [languageToDelete, setLanguageToDelete] = useState()

    const [openFlashMessage, setOpenFlashMessage] = useState(false)
    const [flashTitle, setFlashTitle] = useState()
    const [flashContent, setFlashContent] = useState()

    const [openPopUpRemovalWarning, setOpenPopUpRemovalWarning] = useState(false)
    const [openPopUpAddLanguages, setOpenPopUpAddLanguages] = useState(false)

    useEffect(() => {
        handleLanguagesGet()
    }, [])

    const handleCloseFlashMessage = () => {
        setOpenFlashMessage(false)
    }

    const handleClosePopUpRemovalWarning = () => {
        setOpenPopUpRemovalWarning(false)
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
        setFlashTitle('Success!')
        setFlashContent('Successfully added new language!')
        setOpenFlashMessage(true)
    }

    const handleLanguagesGet = async () => {

        const result = await getLanguagesRequest()

        if (result === "ERR_BAD_REQUEST") {
        } else {
            setLanguages(result.data)
        }
    }

    const handleToggleSwitch = async (event, shortTitle) => {
        const { checked } = event.target
        // Don't change switch position if language is 'en' (default) or response isn't Ok
        const result = await editLanguageRequest(shortTitle, checked)
        if ((shortTitle === languages[0].shortTitle && !checked) || result.status !== 200) {
            return
        }
        const updatedLanguages = languages.map((language) =>
            language.shortTitle === shortTitle ? { ...language, isActive: checked } : language
        )
        setLanguages(updatedLanguages)
        setFlashTitle('Success!')
        setFlashContent('Successfully changed language show/hide parameter.')
        setOpenFlashMessage(true)
    }

    const handleLanguageDelete = async () => {
        // Don't remove language from list if language is 'en' (default) or response isn't Ok
        const result = await deleteLanguageRequest(languageToDelete)
        if (languageToDelete === languages[0].shortTitle || result.status !== 200) {
            return
        }
        const updatedLanguages = languages.filter((language) => language.shortTitle !== languageToDelete)
        setLanguages(updatedLanguages)
        setOpenPopUpRemovalWarning(false)
        setFlashTitle('Deleted!')
        setFlashContent('The language is successfully deleted.')
        setOpenFlashMessage(true)
    }

    return (
        <div className={styles.container}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>LANGUAGES</th>
                            <th colSpan="2">SHOW/HIDE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {languages.map((language) => (
                            <tr key={"language"+language.shortTitle}>
                                <td key={language.shortTitle}>{LANGUAGES_CONSTANTS.find(lang => lang.code === language.shortTitle).label}</td>
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
                                    <span hint="Delete language"
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
                <FlashMessage title={flashTitle} content={flashContent} open={openFlashMessage}
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

                <Button text={"Add languages"} onClick={() => setOpenPopUpAddLanguages(true)}/>
            </div>
        </div>
    )
}

export default LanguagesManagement;
