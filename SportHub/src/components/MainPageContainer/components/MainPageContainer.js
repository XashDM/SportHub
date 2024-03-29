import React, { useState } from "react"
import Footer from "../../../modules/Footer"
import styles from "../styles/style.module.scss"
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft"
import Header from "../../../modules/Header"

export default function HomePage({ children }) {
    return (
        <div>
            <div className={styles.container}>
                <Header />
                <SidebarLeft />
                <div className={styles.content}>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}
