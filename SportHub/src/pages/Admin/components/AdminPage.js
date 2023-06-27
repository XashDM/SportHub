import React, {useEffect, useState} from 'react'
import styles from "../styles/style.module.scss"
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import SECTION_NAMES from "../constants/SectionsNames"
import AdminMainArticlesSection from "../../../modules/AdminMainArticlesSection"
import LanguagesManagement from "../../../modules/LanguagesManagement"
import NavigationSystem from '../../../modules/NavigationAdminSystem'
import AdminArticlesList from "../../../modules/AdminArticlesList"


export default function AdminPage() {
    const [selectedMenuElement, setSelectedMenuElement] = useState("Home")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [content, setContent] = useState(<AdminMainArticlesSection />)
    const [headerButtons, setHeaderButtons] = useState([])

    useEffect(() =>{
            switch (selectedMenuElement){
                case SECTION_NAMES["Home"]:
                    setContent(<AdminMainArticlesSection setButtons={setHeaderButtons} />)
                    break
                case "Languages":
                    setContent(<LanguagesManagement setButtons={setHeaderButtons} />)
                    break
                case "IA":
                    setContent(<NavigationSystem/>)
                    break
                default:
                    setContent(<AdminArticlesList setButtons={setHeaderButtons} category={selectedCategory} setContent={setContent}/>)
                    break
            }
    }, [selectedMenuElement])

    return (
        <div>
                <AdminHeader />
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
