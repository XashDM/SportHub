import React, { useState } from "react"
import styles from "../styles/style.module.scss"
import MainPageContainer from "../../../components/MainPageContainer"
import SearchResultsList from "../../../modules/SearchResultsList"
import { useParams } from "react-router-dom"

export default function SearchArticlesPage() {
    const {searchValue} = useParams()
    return (
        <MainPageContainer>
            <div className={styles.searchResultsBlock}>
                <SearchResultsList contentSearchValue={searchValue} />
            </div>
        </MainPageContainer>
    )
}
