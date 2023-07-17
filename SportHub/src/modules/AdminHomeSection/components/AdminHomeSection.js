import React, {useEffect, useState} from "react"
import styles from "../styles/style.module.scss"
import MainArticlesConfigurator from "./MainArtcilesConfigurator"
import BreakdownSectionConfigurator from "./BreakdownsSectionsConfigurator"
import {useAtom} from "jotai"
import {adminMenuState} from "../../../store/states/adminMenuState"
import getCategoriesRequest from "../helpers/getCategoriesRequest"
import TabPanel from "../../../ui/TabPanel"
import getLanguagesRequest from "../../../helpers/getLanguagesRequest"
import FlashMessage from "../../../ui/FlashMessage"

export default function AdminHomeSection(){

    const [adminMenu, setAdminMenu] = useAtom(adminMenuState)
    const { setButtons } = adminMenu

    const [homePage, setHomePage] = useState()

    const [saveMainArticles, setSaveMainArticles] = useState()
    const [cancelMainArticle, setCancelMainArticle] = useState()
    const [saveBreakdown, setSaveBreakdown] = useState()
    const [cancelBreakdown, setCancelBreakdown] = useState()

    const [categories, setCategories] = useState([])

    const [languages, setLanguages] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    const [fleshMessageIsOpen, setFleshMessageIsOpen] = useState(false)
    const handleCloseFleshMessage = () => {
        setFleshMessageIsOpen(false)
        setFleshMessageIsSuccessful(true)
    }

    const [fleshMessageIsSuccessful, setFleshMessageIsSuccessful] = useState(true)

    const GetCategories = async () => {
        const categories = await getCategoriesRequest()
        setCategories(categories)
    }

    const getLanguages = async () => {
        let result = await getLanguagesRequest()

        for (let i = 0; i < result.data.length; i++) {
            result.data[i].value = i
        }
        setLanguages(result.data)
    }

    const GetHomePage = (categories, language) => {
        setHomePage(<div className={styles.content}>
            <MainArticlesConfigurator setSaveMainArticles = {setSaveMainArticles} setCancelMainArticle = {setCancelMainArticle}
                                      categories={categories} language={language} setFleshMessageIsSuccessful={setFleshMessageIsSuccessful}/>
            <BreakdownSectionConfigurator setSaveBreakdown = {setSaveBreakdown} setCancelBreakdown = {setCancelBreakdown}
                                          categories={categories} language={language} setFleshMessageIsSuccessful={setFleshMessageIsSuccessful}/>
        </div>)
    }

    const Save = () =>{
        saveMainArticles.function()
        saveBreakdown.function()
        setFleshMessageIsOpen(true)
    }

    const Cancel = () => {
        cancelMainArticle.function()
        cancelBreakdown.function()
    }

    useEffect(() =>{
        if(typeof(setButtons) == "function"){
            setButtons([{text: "Cancel", function: Cancel, isOutlined: true},
                {text: "Save changes", function: Save, isOutlined: false}])
        }
    }, [setButtons, saveMainArticles, saveBreakdown])

    useEffect(() => {
        getLanguages()
        GetCategories()
    }, [])

    useEffect(() => {
        GetHomePage(categories, languages[activeTab])
    }, [categories, languages, activeTab])

    return(<div className={styles.content}>

        <FlashMessage title={fleshMessageIsSuccessful ? "Changes saved" : "Changes are not saved"}
                      content={fleshMessageIsSuccessful ? "All successfully saved." : "Nothing saved."}
                      isSuccess={fleshMessageIsSuccessful} open={fleshMessageIsOpen} handleClose={handleCloseFleshMessage}/>

        <div className={styles.tabs}>
        <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} languages={languages} />
        </div>
        {homePage}
    </div>)
}