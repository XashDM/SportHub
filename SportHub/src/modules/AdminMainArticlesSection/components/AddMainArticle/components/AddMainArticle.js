import React, {useEffect, useState} from "react"
import AutoComplete from "../../../../../ui/AutoComplete"
import styles from "../styles/style.module.scss"
import Requests from "../requests"

export default function AddMainArticle({order = null, category = null, categoriesOptions = [], subcategory = null,
                                           team = null, article= null, languageId, isLastMainArticle,
                                           AddNewMainArticle, DeleteMainArticle, SaveData}){

    const request = new Requests();

    const [currentOrder, setCurrentOrder] = useState(order)

    const [currentCategory, setCurrentCategory] = useState(category)
    useEffect(() => setCurrentCategory(category), [category])

    const [subcategoriesOptions, setSubcategoriesOptions] = useState([])
    const [currentSubcategory, setCurrentSubcategory] = useState(subcategory)
    useEffect(() => setCurrentSubcategory(subcategory), [subcategory])

    const [teamsOptions, setTeamsOptions] = useState([])
    const [currentTeam, setCurrentTeam] = useState(team)
    useEffect(() => setCurrentTeam(team), [team])

    const [articlesOptions, setArticlesOptions] = useState([])
    const [currentArticle, setCurrentArticle] = useState(article)
    useEffect(() => setCurrentArticle(article), [article])

    const [disabled, setDisabled] = useState(currentCategory === undefined || currentCategory === null)

    const GetDataAfterChoosingCategory = async () => {
        if(currentCategory !== null) {
            setSubcategoriesOptions(await request.getSubCategories(currentCategory?.categoryId))
            setTeamsOptions(await request.getTeamsByCategoryId(currentCategory?.categoryId))
            setArticlesOptions(await request.getArticleByLanguageIdAndCategoryId(languageId, currentCategory?.categoryId))
        }
    }

    const GetDataAfterChoosingSubCategory = async () => {
        if(currentSubcategory !== null) {
            setTeamsOptions(await request.getTeamBySubCategoryId(currentSubcategory?.subCategoryId))
            setArticlesOptions(await request.getArticleByLanguageIdAndSubCategoryId(languageId, currentSubcategory?.subCategoryId))
        }
    }

    const GetDataAfterChoosingTeam = async () => {
        if (currentTeam !== null) setArticlesOptions(await request.getArticleByLanguageIdAndTeamId(languageId, currentTeam?.teamId))
    }

    useEffect(() => {
        SaveData(currentOrder, currentCategory, currentSubcategory, currentTeam, currentArticle)
    }, [currentOrder, currentCategory, currentSubcategory, currentTeam, currentArticle])

    useEffect(() => {
        GetDataAfterChoosingTeam()

        setCurrentArticle(null)

        if(currentTeam === team){
            setCurrentArticle(article)
        }

    }, [currentTeam])

    useEffect(() => {
        GetDataAfterChoosingSubCategory()

        setCurrentTeam(null)
        setCurrentArticle(null)

        if(currentSubcategory === subcategory){
            setCurrentTeam(team)
            setCurrentArticle(article)
        }

    }, [currentSubcategory])

    useEffect(() => {
        GetDataAfterChoosingCategory()

        setDisabled(currentCategory === undefined || currentCategory === null)
        setCurrentSubcategory(null)
        setCurrentTeam(null)
        setCurrentArticle(null)

        if(currentCategory === category){
            setCurrentSubcategory(subcategory)
            setCurrentTeam(team)
            setCurrentArticle(article)
        }

    }, [currentCategory])

    useEffect(() => {
        GetDataAfterChoosingCategory()
    }, [])

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.upper_autocompletes}>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={"CATEGORY*"}
                            value={category}
                            setValue={setCurrentCategory}
                            options={categoriesOptions}//{categoriesOptions}
                            areOptionsObjects={true}
                            optionLable={"categoryName"}
                            propertyToCompare={"categoryId"} />
                    </div>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={"SUBCATEGORY"}
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
                            label={"TEAM"}
                            value={team}
                            setValue={setCurrentTeam}
                            disabled={disabled}
                            options={teamsOptions}
                            areOptionsObjects={true}
                            optionLable={"teamName"}
                            propertyToCompare={"teamId"} />
                    </div>
                </div>
                <div className={styles.add_article_autocomplete}>
                    <AutoComplete
                        label={"ARTICLE*"}
                        value={article}
                        setValue={setCurrentArticle}
                        disabled={disabled}
                        options={articlesOptions}
                        areOptionsObjects={true}
                        optionLable={"title"}
                        propertyToCompare={"articleId"} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.delete_button} onClick={() => {DeleteMainArticle(currentOrder)}}>Delete</div>
                    {isLastMainArticle
                        ? <div className={styles.add_one_more_article} onClick={() => AddNewMainArticle()}>
                            + Add one more article
                        </div>
                        : null}
                </div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}