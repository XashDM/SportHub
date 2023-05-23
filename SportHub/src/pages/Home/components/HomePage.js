import React from "react"
import Footer from "../../../modules/Footer"
import styles from "../styles/style.module.scss"
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft"
import Header from "../../../modules/Header"

export default function HomePage(){
    return (
        <>
            <div className={styles.container}>
                <Header/>
                <SidebarLeft/>
                <div className={styles.content}>
                    <div style={{height: "100vh"}}>content</div>
                </div>
                <Footer/>
            </div>
        </>)
}
