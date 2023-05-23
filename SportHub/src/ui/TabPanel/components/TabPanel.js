import React, { useEffect, useState } from "react"
import styles from "../styles/style.module.scss"
import Tab from "./Tab"
import Label from "../../../ui/Label"


export default function TabPanel({activeTab, setActiveTab, tabList}){
    const tabChange = (event) => {
        const newTab = Number(event.target.getAttribute("value"))
        setActiveTab(newTab)
    }

    const [tabs, setTabs] = useState([])

    const path = process.env.PUBLIC_URL + '/icons/flags/'
    
    useEffect(() => {
        setTabs(tabList.map((language) => (
            <Tab key={language.value} value={language.value} handleClick={tabChange} icon={path + language.icon} label={language.label} activeTab={activeTab}/>
        )))
    }, [activeTab])

    return (
        <div>
            <Label>Page Languages</Label>
            <div className={styles.tab_menu}>
                {tabs}
            </div>
        </div>
    )
}