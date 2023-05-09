import React,{useEffect, useState} from 'react'
import styles from "../styles/style.module.scss"
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import NavigationSystem from '../../../modules/NavigationAdminSystem'


export default function AdminPage() {
    const [selectedMenuElement, setSelectedMenuElement] = useState("Home")
    const [content, setContent] = useState(null)
    const [headerButtons, setHeaderButtons] = useState([])

    useEffect(() =>{
            switch (selectedMenuElement){
                    case "IA":
                            setContent(<NavigationSystem/>)
                            break
                    default:
                            break
            }
    }, [selectedMenuElement])

    return (
        <div>
                <AdminHeader />
                <HorizontalAdminMenu/>
                <div className={styles.vertical_menu_and_content}>
                <VerticalAdminMenu
                            currentMenuElement={selectedMenuElement}
                            setCurrentMenuElement={setSelectedMenuElement} />

                        <div>
                                {content}
                        </div>
                </div>
        </div>
    )
}
