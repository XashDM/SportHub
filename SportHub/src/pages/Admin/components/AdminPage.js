import React from 'react'
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import NavigationSystem from "../../../modules/NavigationAdminSystem"
import styles from "../styles/style.module.scss"


export default function AdminPage() {

        return (
            <div>
                <AdminHeader />
                <HorizontalAdminMenu />
                <div className={styles.vertical_bar_content_container}>
                    <VerticalAdminMenu />
                    <NavigationSystem />
                </div>
            </div>
        )
}
