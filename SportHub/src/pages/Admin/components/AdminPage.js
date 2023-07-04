import React, { useEffect, useState } from 'react'
import styles from "../styles/style.module.scss"
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import SECTION_NAMES from "../constants/SectionsNames"
import AdminMainArticlesSection from "../../../modules/AdminMainArticlesSection"
import LanguagesManagement from "../../../modules/LanguagesManagement"
import NavigationSystem from '../../../modules/NavigationAdminSystem'
import AdminArticlesList from "../../../modules/AdminArticlesList"
import SearchResultsList from '../../../modules/SearchResultsList/components/SearchResultsList'


export default function AdminPage() {
    const [selectedMenuElement, setSelectedMenuElement] = useState("Home")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [content, setContent] = useState(<AdminMainArticlesSection />)
    const [headerButtons, setHeaderButtons] = useState([])

    const [isContentSearch, setIsContentSearch] = useState(false)
    const [contentSearchValue, setContentSearchValue] = useState("")

    useEffect(() => {
        switch (selectedMenuElement) {
            case SECTION_NAMES["Home"]:
                setContent(<AdminMainArticlesSection setButtons={setHeaderButtons} />)
                setIsContentSearch(false)
                break
            case "Languages":
                setContent(<LanguagesManagement setButtons={setHeaderButtons} />)
                setIsContentSearch(false)
                break
            case "IA":
                setContent(<NavigationSystem />)
                setIsContentSearch(false)
                break
            case "Search":
                setContent(<SearchResultsList contentSearchValue={contentSearchValue}/>)
                break
            default:
                setContent(<AdminArticlesList setButtons={setHeaderButtons} category={selectedCategory} setContent={setContent} />)
                setIsContentSearch(false)
                break
        }
    }, [selectedMenuElement])

    useEffect(() => {
        if (isContentSearch && contentSearchValue) {
            setSelectedMenuElement("Search")
            setHeaderButtons([])
            setContent(<SearchResultsList contentSearchValue={contentSearchValue}/>)
        }
    }, [contentSearchValue, isContentSearch])
    return (
        <div>
            <AdminHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
            <HorizontalAdminMenu currentMenuElement={selectedMenuElement}
                setCurrentMenuElement={setSelectedMenuElement}
                headerButtons={headerButtons}
                setSelectedCategory={setSelectedCategory} />
            <div className={styles.vertical_menu_and_content}>
                <VerticalAdminMenu
                    currentMenuElement={selectedMenuElement}
                    setCurrentMenuElement={setSelectedMenuElement} />

                <div className={styles.content}>
                    {content}
                </div>
            </div>
        </div>
    )
}
