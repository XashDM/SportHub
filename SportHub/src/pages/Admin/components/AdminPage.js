import React, {useEffect, useState} from 'react'
import styles from "../styles/style.module.scss"
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import AdminMainArticlesSection from "../../../modules/AdminMainArticlesSection/components/AdminMainArticlesSection"
import Surveys from "../../../modules/Surveys"

export default function AdminPage() {

    const [selectedMenuElement, setSelectedMenuElement] = useState("Home")
    const [content, setContent] = useState(<AdminMainArticlesSection />)
    const [headerButtons, setHeaderButtons] = useState([])

    useEffect(() =>{
        switch (selectedMenuElement){
            case "Home":
                setContent(<AdminMainArticlesSection setButtons={setHeaderButtons} />)
                break
            case "Surveys":
                setContent(<Surveys />)
                setHeaderButtons([])
                break
            default:
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
