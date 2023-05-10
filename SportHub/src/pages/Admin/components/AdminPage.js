import React, {useEffect, useState} from 'react'
import styles from "../styles/style.module.scss"
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import LanguagesManagement from "../../../modules/LanguagesManagement"

export default function AdminPage() {
    const [selectedMenuElement, setSelectedMenuElement] = useState("Home")
    const [content, setContent] = useState()
    const [headerButtons, setHeaderButtons] = useState([])

    useEffect(() =>{
        switch (selectedMenuElement){
            case "Home":
                //setContent(<AdminMainArticlesSection setButtons={setHeaderButtons} />)
                break
            case "Languages":
                setContent(<LanguagesManagement setButtons={setHeaderButtons} />)
                break
            default:
                setContent()
                break
        }
    }, [selectedMenuElement])

    return (
        <div>
            <AdminHeader />
            <HorizontalAdminMenu currentMenuElement={selectedMenuElement}
                                 setCurrentMenuElement={setSelectedMenuElement}
                                 headerButtons={headerButtons}/>
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
