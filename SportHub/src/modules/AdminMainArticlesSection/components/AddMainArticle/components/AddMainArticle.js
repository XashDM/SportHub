import React, {useEffect, useState} from "react"
import AutoComplete from "../../../../../ui/AutoComplete"
import styles from "../styles/style.module.scss"
import OPTIONS from "../../../constants/Options"

export default function AddMainArticle({order = null, category = null, subcategory = null,
                                           team = null, article= null, isLastMainArticle,
                                           AddNewMainArticle, DeleteMainArticle, SaveData}){

    const [currentOrder, setCurrentOrder] = useState(order)

    const [currentCategory, setCurrentCategory] = useState(category)
    useEffect(() => setCurrentCategory(category), [category])

    const [currentSubcategory, setCurrentSubcategory] = useState(subcategory)
    useEffect(() => setCurrentSubcategory(subcategory), [subcategory])

    const [currentTeam, setCurrentTeam] = useState(team)
    useEffect(() => setCurrentTeam(team), [team])

    const [currentArticle, setCurrentArticle] = useState(article)
    useEffect(() => setCurrentArticle(article), [article])

    const [disabled, setDisabled] = useState(currentCategory === undefined || currentCategory === null)

    useEffect(() => {
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
        SaveData(currentOrder, currentCategory, currentSubcategory, currentTeam, currentArticle)
    }, [currentOrder, currentCategory, currentSubcategory, currentTeam, currentArticle])

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.upper_autocompletes}>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={"Category*"}
                            value={category}
                            setValue={setCurrentCategory}
                            options={OPTIONS}
                            areOptionsObjects={true}
                            optionLable={"name"}
                            propertyToCompare={"id"} />
                    </div>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={"Subcategory"}
                            value={subcategory}
                            setValue={setCurrentSubcategory}
                            disabled={disabled}
                            options={OPTIONS}
                            areOptionsObjects={true}
                            optionLable={"name"}
                            propertyToCompare={"id"} />
                    </div>
                    <div className={styles.small_autocomplete}>
                        <AutoComplete
                            label={"Team"}
                            value={team}
                            setValue={setCurrentTeam}
                            disabled={disabled}
                            options={OPTIONS}
                            areOptionsObjects={true}
                            optionLable={"name"}
                            propertyToCompare={"id"} />
                    </div>
                </div>
                <div className={styles.add_article_autocomplete}>
                    <AutoComplete
                        label={"Article*"}
                        value={article}
                        setValue={setCurrentArticle}
                        disabled={disabled}
                        options={OPTIONS}
                        areOptionsObjects={true}
                        optionLable={"name"}
                        propertyToCompare={"id"} />
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