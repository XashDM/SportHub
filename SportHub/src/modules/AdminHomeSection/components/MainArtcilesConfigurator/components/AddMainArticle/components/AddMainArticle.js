import React, { useEffect, useState } from "react"
import AutoComplete from "../../../../../../../ui/AutoComplete"
import styles from "../styles/style.module.scss"
import Requests from "../requests"
import { useTranslation } from "react-i18next"

export default function AddMainArticle({ order = null, category = null, categoriesOptions = [], subcategory = null,
    team = null, article = null, language, isLastMainArticle,
    AddNewMainArticle, DeleteMainArticle, SaveData }) {

    const { t, i18n } = useTranslation()

    const request = new Requests()

    const [currentOrder, setCurrentOrder] = useState(order)

    const [currentCategory, setCurrentCategory] = useState(category)

    const [subcategoriesOptions, setSubcategoriesOptions] = useState([])
    const [currentSubcategory, setCurrentSubcategory] = useState(subcategory)

    const [teamsOptions, setTeamsOptions] = useState([])
    const [currentTeam, setCurrentTeam] = useState(team)

    const [articlesOptions, setArticlesOptions] = useState([])
    const [currentArticle, setCurrentArticle] = useState(article)

    const [disabled, setDisabled] = useState(currentCategory === undefined || currentCategory === null)

    const GetDataAfterChoosingCategory = async () => {
        if (currentCategory !== null) {
            setSubcategoriesOptions(await request.getSubCategories(currentCategory?.categoryId))
            setTeamsOptions(await request.getTeamsByCategoryId(currentCategory?.categoryId))
            setArticlesOptions(await request.getArticleByLanguageIdAndCategoryId(language?.languageId, currentCategory?.categoryId))
        }
    }

    const GetDataAfterChoosingSubCategory = async () => {
        if (currentSubcategory !== null) {
            setTeamsOptions(await request.getTeamBySubCategoryId(currentSubcategory?.subCategoryId))
            setArticlesOptions(await request.getArticleByLanguageIdAndSubCategoryId(language?.languageId, currentSubcategory?.subCategoryId))
        }
    }

    const GetDataAfterChoosingTeam = async () => {
        if (currentTeam !== null) setArticlesOptions(await request.getArticleByLanguageIdAndTeamId(language?.languageId, currentTeam?.teamId))
    }

    useEffect(() => {
        SaveData(currentOrder, currentCategory, currentSubcategory, currentTeam, currentArticle)
    }, [currentOrder, currentCategory, currentSubcategory, currentTeam, currentArticle])

    useEffect(() => {
        if (currentCategory?.categoryId !== category?.categoryId) setCurrentCategory(category)
    }, [category])

    useEffect(() => {
        if (currentSubcategory?.subCategoryId !== subcategory?.subCategoryId) setCurrentSubcategory(subcategory)
    }, [subcategory])

    useEffect(() => {
        if (currentTeam?.teamId !== team?.teamId) setCurrentTeam(team)
    }, [team])

    useEffect(() => {
        if (currentArticle?.articleId !== article?.articleId) setCurrentArticle(article)
    }, [article])

    useEffect(() => {
        GetDataAfterChoosingCategory()

        setDisabled(currentCategory === undefined || currentCategory === null)
        setCurrentSubcategory(null)
        setCurrentTeam(null)
        setCurrentArticle(null)

        if (currentCategory === category) {
            setCurrentSubcategory(subcategory)
            setCurrentTeam(team)
            setCurrentArticle(article)
        }

    }, [currentCategory])

    useEffect(() => {
        if (currentSubcategory?.subCategoryName === undefined) GetDataAfterChoosingCategory()
        else GetDataAfterChoosingSubCategory()

        setCurrentTeam(null)
        setCurrentArticle(null)

        if (currentSubcategory === subcategory) {
            setCurrentTeam(team)
            setCurrentArticle(article)
        }

    }, [currentSubcategory])

    useEffect(() => {
        if (currentTeam?.teamName === undefined) GetDataAfterChoosingSubCategory()
        else GetDataAfterChoosingTeam()


        setCurrentArticle(null)

        if (currentTeam === team)
            setCurrentArticle(article)

    }, [currentTeam])


    return (
        <div>
            <div className={styles.content}>
                <div className={styles.upper_autocompletes}>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={t('AdminPage.HomeSection.CategoryLabel')}
                            value={category}
                            setValue={setCurrentCategory}
                            options={categoriesOptions}
                            areOptionsObjects={true}
                            optionLable={"categoryName"}
                            propertyToCompare={"categoryId"} />
                    </div>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={t('AdminPage.HomeSection.SubCategoryLabel')}
                            value={subcategory}
                            setValue={setCurrentSubcategory}
                            disabled={disabled}
                            options={subcategoriesOptions}
                            areOptionsObjects={true}
                            optionLable={"subCategoryName"}
                            propertyToCompare={"subCategoryId"} />
                    </div>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={t('AdminPage.HomeSection.TeamLabel')}
                            value={team}
                            setValue={setCurrentTeam}
                            disabled={disabled}
                            options={teamsOptions}
                            areOptionsObjects={typeof (team) === "object"}
                            optionLable={"teamName"}
                            propertyToCompare={"teamId"} />
                    </div>
                </div>
                <div className={styles.add_article_autocomplete}>
                    <AutoComplete
                        label={t('AdminPage.HomeSection.ArticleLabel')}
                        value={article}
                        setValue={setCurrentArticle}
                        disabled={disabled}
                        options={articlesOptions}
                        areOptionsObjects={true}
                        optionLable={"title"}
                        propertyToCompare={"articleId"} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.delete_button} onClick={() => { DeleteMainArticle(currentOrder) }}>
                        {t('AdminPage.HomeSection.DeleteBtn')}
                    </div>
                    {
                        isLastMainArticle
                            ?
                            <div className={styles.add_one_more_article} onClick={() => AddNewMainArticle()}>
                                {t('AdminPage.HomeSection.AddArticleBtn')}
                            </div>
                            :
                            null
                    }
                </div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}