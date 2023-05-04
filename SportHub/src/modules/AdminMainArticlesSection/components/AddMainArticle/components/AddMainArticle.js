import React, {useEffect, useState} from "react"
import AutoComplete from "../../../../../ui/AutoComplete"
import styles from "../styles/style.module.scss"

export default function AddMainArticle({selectedOrder = null, selectedCategory = null, selectedSubcategory = null,
                                           selectedTeam = null, selectedArticle= null, isLastMainArticle,
                                           AddNewMainArticle, DeleteMainArticle, SaveData}){

    const [order, setOrder] = useState(selectedOrder)

    const [category, setCategory] = useState(selectedCategory)
    useEffect(() => setCategory(selectedCategory), [selectedCategory])

    const [subcategory, setSubcategory] = useState(selectedSubcategory)
    useEffect(() => setSubcategory(selectedSubcategory), [selectedSubcategory])

    const [team, setTeam] = useState(selectedTeam)
    useEffect(() => setTeam(selectedTeam), [selectedTeam])

    const [article, setArticle] = useState(selectedArticle)
    useEffect(() => setArticle(selectedArticle), [selectedArticle])

    const [disabled, setDisabled] = useState(category === undefined || category === null)

    useEffect(() => {
        setDisabled(category === undefined || category === null)
        setSubcategory(null)
        setTeam(null)
        setArticle(null)
    }, [category])

    useEffect(() => {
        SaveData(order, category, subcategory, team, article)
    }, [order, category, subcategory, team, article])

    const GenerateAddOneMoreArticleButton = () => {
        if (isLastMainArticle)
            return(
            <div className={styles.add_one_more_article} onClick={event => AddNewMainArticle()}>
                + Add one more article
            </div>
        )
    }

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.upper_autocompletes}>
                    <AutoComplete
                        label={"Category*"}
                        width={"17vw"}
                        value={selectedCategory}
                        setValue={setCategory}
                        options={[{id: 1, name:"Name1"}, {id: 2, name:"Name2"}, {id: 3, name:"Name3"}, {id: 4, name:"Name4"}, {id: 5, name:"Name5"}]}
                        areOptionsObjects={true}
                        optionLable={"name"}
                        propertyToCompare={"id"} />
                    <AutoComplete
                        label={"Subcategory"}
                        width={"17vw"}
                        value={selectedSubcategory}
                        setValue={setSubcategory}
                        disabled={disabled}
                        options={[{id: 1, name:"Name1"}, {id: 2, name:"Name2"}, {id: 3, name:"Name3"}, {id: 4, name:"Name4"}, {id: 5, name:"Name5"}]}
                        areOptionsObjects={true}
                        optionLable={"name"}
                        propertyToCompare={"id"} />
                    <AutoComplete
                        label={"Team"}
                        width={"17vw"}
                        value={selectedTeam}
                        setValue={setTeam}
                        disabled={disabled}
                        options={[{id: 1, name:"Name1"}, {id: 2, name:"Name2"}, {id: 3, name:"Name3"}, {id: 4, name:"Name4"}, {id: 5, name:"Name5"}]}
                        areOptionsObjects={true}
                        optionLable={"name"}
                        propertyToCompare={"id"} />
                </div>
                <div className={styles.add_article_autocomplete}>
                    <AutoComplete
                        label={"Article*"}
                        width={"100%"}
                        value={selectedArticle}
                        setValue={setArticle}
                        disabled={disabled}
                        options={[{id: 1, name:"Name1"}, {id: 2, name:"Name2"}, {id: 3, name:"Name3"}, {id: 4, name:"Name4"}, {id: 5, name:"Name5"}]}
                        areOptionsObjects={true}
                        optionLable={"name"}
                        propertyToCompare={"id"} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.delete_button} onClick={event => {DeleteMainArticle(order)}}>Delete</div>
                    {GenerateAddOneMoreArticleButton()}
                </div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}