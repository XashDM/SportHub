import React, { useEffect, useState } from "react"
import styles from "../styles/style.module.scss"
import Tab from "./Tab"
import Label from "../../../ui/Label"
import { useTranslation } from "react-i18next"


export default function TabPanel({activeTab, setActiveTab, languages}){
    const {t, i18n} = useTranslation()

    const tabChange = (event) => {
        const newTab = Number(event.target.getAttribute("value"))
        setActiveTab(newTab)
    }

    const [tabs, setTabs] = useState([])
    
    useEffect(() => {
        setTabs(languages.map((language) => (
            <Tab key={language.value} value={language.value} handleClick={tabChange} label={language.shortTitle} activeTab={activeTab} isActive={language.isActive}/>
        )))
    }, [activeTab, languages])

    return (
        <div>
            <Label>{t('AdminPage.ArticleMenu.PageLanguages')}</Label>
            <div className={styles.tab_menu}>
                {tabs}
            </div>
        </div>
    )
}