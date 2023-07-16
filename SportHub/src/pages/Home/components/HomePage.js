import React, { useState } from "react"
import Footer from "../../../modules/Footer"
import styles from "../styles/style.module.scss"
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft"
import Header from "../../../modules/Header"
import MainArticlesSlider from "../../../modules/MainArticlesSlider"
import SearchResultsList from "../../../modules/SearchResultsList/components/SearchResultsList"
import UserBreakdownSection from "../../../modules/UserBreakdownsSection"

export default function HomePage() {
    const [isContentSearch, setIsContentSearch] = useState(false)
    const [contentSearchValue, setContentSearchValue] = useState("")
    return (
        <div>
            <div className={styles.container}>
                <Header setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                <SidebarLeft />
                <div className={styles.content}>
                    {isContentSearch && contentSearchValue
                        ?
                        <div className={styles.searchResultsBlock}>
                            <SearchResultsList contentSearchValue={contentSearchValue} />
                        </div>
                        :
                        <>
                            <span className={styles.bg_all}>ALL</span>
                            <MainArticlesSlider />
                            <span className={styles.bg_news}>NEWS</span>
                            <UserBreakdownSection />
                        </>
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}
