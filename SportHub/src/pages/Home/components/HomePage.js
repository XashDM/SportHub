import React, { useState } from "react"
import styles from "../styles/style.module.scss"
import MainPageContainer from "../../../components/MainPageContainer"
import MainArticlesSlider from "../../../modules/MainArticlesSlider"
import UserBreakdownSection from "../../../modules/UserBreakdownsSection"

export default function HomePage() {
    return (
        <MainPageContainer>
            <span className={styles.bg_all}>ALL</span>
            <MainArticlesSlider />
            <span className={styles.bg_news}>NEWS</span>
            <UserBreakdownSection />
        </MainPageContainer>
    )
}
