import React from "react"
import Footer from "../../../modules/Footer"
import styles from "../styles/style.module.scss"
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft";
import Header from "../../../modules/Header";
import MainArticlesSlider from "../../../modules/MainArticlesSlider"
import UserBreakdownSection from "../../../modules/UserBreakdownsSection"

export default function HomePage(){
    return (
        <>
            <div className={styles.container}>
                <Header/>
                <SidebarLeft/>
                <div className={styles.content}>
                    <span className={styles.bg_all}>ALL</span>
                    <MainArticlesSlider/>
                    <span className={styles.bg_news}>NEWS</span>
                    <UserBreakdownSection />
                </div>
                <Footer/>
            </div>
        </>)
}
