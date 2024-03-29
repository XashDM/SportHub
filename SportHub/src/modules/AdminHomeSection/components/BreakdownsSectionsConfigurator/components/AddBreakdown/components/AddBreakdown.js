import Requests from "../../../../MainArtcilesConfigurator/components/AddMainArticle/requests"
import React, { useEffect, useState } from "react"
import styles from "../../../../MainArtcilesConfigurator/components/AddMainArticle/styles/style.module.scss"
import AutoComplete from "../../../../../../../ui/AutoComplete"
import { useTranslation } from "react-i18next"

export default function AddBreakdown({ order = null, category = null, categoriesOptions = [], subcategory = null,
    team = null, language, isLastBreakDown, AddNewBreakDown, DeleteBreakDown, SaveData }) {

    const { t, i18n } = useTranslation()

    const request = new Requests()

    const [currentOrder, setCurrentOrder] = useState(order)

    const [currentCategory, setCurrentCategory] = useState(category)

    const [subcategoriesOptions, setSubcategoriesOptions] = useState([])
    const [currentSubcategory, setCurrentSubcategory] = useState(subcategory)

    const [teamsOptions, setTeamsOptions] = useState([])
    const [currentTeam, setCurrentTeam] = useState(team)

    const [disabled, setDisabled] = useState(currentCategory === undefined || currentCategory === null)

    const GetDataAfterChoosingCategory = async () => {
        if (currentCategory !== null) {
            setSubcategoriesOptions(await request.getSubCategories(category?.categoryId))
            setTeamsOptions(await request.getTeamsByCategoryId(category?.categoryId))
        }
    }

    const GetDataAfterChoosingSubCategory = async () => {
        if (currentSubcategory !== null)
            setTeamsOptions(await request.getTeamBySubCategoryId(currentSubcategory?.subCategoryId))
    }

    useEffect(() => {
        SaveData(currentOrder, currentCategory, currentSubcategory, currentTeam)
    }, [currentOrder, currentCategory, currentSubcategory, currentTeam])

    useEffect(() => {
        GetDataAfterChoosingSubCategory()

        setCurrentTeam(null)

        if (currentSubcategory === subcategory)
            setCurrentTeam(team)

    }, [currentSubcategory])

    useEffect(() => {
        GetDataAfterChoosingCategory()

        setDisabled(currentCategory === undefined || currentCategory === null)
        setCurrentSubcategory(null)
        setCurrentTeam(null)

        if (currentCategory === category) {
            setCurrentSubcategory(subcategory)
            setCurrentTeam(team)
        }

    }, [category])

    useEffect(() => {
        GetDataAfterChoosingCategory()
    }, [language])

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
                            areOptionsObjects={true}
                            optionLable={"teamName"}
                            propertyToCompare={"teamId"} />
                    </div>
                </div>

                <div className={styles.buttons}>
                    <div className={styles.delete_button} onClick={() => { DeleteBreakDown(currentOrder) }}>
                        {t('AdminPage.HomeSection.DeleteBtn')}
                    </div>
                    {
                        isLastBreakDown
                            ?
                            <div className={styles.add_one_more_article} onClick={() => AddNewBreakDown()}>
                                {t('AdminPage.HomeSection.AddBreakdownBtn')}
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