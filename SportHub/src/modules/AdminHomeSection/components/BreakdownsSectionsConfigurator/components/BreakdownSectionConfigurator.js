import React, {useEffect, useState} from 'react'
import CapsuleLable from "../../../../../ui/CapsuleLable"
import styles from "../styles/style.module.scss"
import AddBreakdown from "./AddBreakdown"
import getBreakdownsRequest from "../helpers/getBreakdownsRequest"
import postBreakdownsRequest from "../helpers/postBreakdownsRequest"

export default function BreakdownSectionConfigurator({setSaveBreakdown, setCancelBreakdown, language, setFleshMessageIsSuccessful, categories = []}){

    const [startBreakDownData, setStartBreakDownData] = useState([])
    const [breakDownsData, setBreakDownsData] = useState([])
    const [breakDownsForm, setBreakDownsForm] = useState([])

    const GetBreakdowns = async () => {
        const request = await getBreakdownsRequest(language?.languageId)
        let breakdowns = []
        for (let breakdownsCount = 0; breakdownsCount < request.data?.length; breakdownsCount++){
            const data = request.data[breakdownsCount]
            breakdowns[breakdownsCount] = {
                order: null,
                isLastBreakDown: null,
                category: data.categories[0],
            }

            data.subCategories !== null ? breakdowns[breakdownsCount].subcategory = data.subCategories[0] : breakdowns[breakdownsCount].subcategory = null
            data.teams !== null ? breakdowns[breakdownsCount].team = data.teams[0] : breakdowns[breakdownsCount].team = null

        }
        setBreakDownsData(breakdowns)
        setStartBreakDownData(breakdowns)
    }

    const SaveBreakdowns = () => {
        try {
            let jsonPostRequest = []
            for (let breakdownsCounter = 0; breakdownsCounter < breakDownsData.length; breakdownsCounter++) {
                jsonPostRequest.push({
                    languageId: language?.languageId,
                    categoryId: breakDownsData[breakdownsCounter].category.categoryId,
                    subCategoryId: breakDownsData[breakdownsCounter].subcategory?.subCategoryId,
                    teamId: breakDownsData[breakdownsCounter].team?.teamId
                })
            }
            postBreakdownsRequest(language?.languageId, jsonPostRequest)
            setStartBreakDownData(breakDownsData)
        }
        catch (error){
            setFleshMessageIsSuccessful(false)
        }
    }

    const CancelBreakdowns = () => {
        setBreakDownsData(startBreakDownData)
    }

    const AddNewBreakDown = () => {
        setBreakDownsData([...breakDownsData, {
            order: null,
            isLastBreakDown: null,
            category: null,
            subcategory: null,
            team: null
        }])
    }

    const DeleteBreakDown = (index) => {
        const newBreakDownData = [...breakDownsData]
        console.log("delete " + index)
        newBreakDownData.splice(index, 1)
        console.log(newBreakDownData)
        setBreakDownsData(newBreakDownData);
    }

    const SaveChangedOption = (order, category, subcategory, team) => {
        const newBreakDownData = [...breakDownsData]

        newBreakDownData[order].category = category
        newBreakDownData[order].subcategory = subcategory
        newBreakDownData[order].team = team

        setBreakDownsData(newBreakDownData)
    }

    const GenerateBreakdownsForms = () => {
        let newBreakdownsForms = []
        setBreakDownsForm([])
        for (let breakdownsFormsCount = 0; breakdownsFormsCount < breakDownsData.length; breakdownsFormsCount++){
            const breakdownsDataWithNewOrder = [...breakDownsData];
            breakdownsDataWithNewOrder[breakdownsFormsCount].order = breakdownsFormsCount
            breakdownsDataWithNewOrder[breakdownsFormsCount].isLastBreakDown = breakdownsFormsCount === breakdownsDataWithNewOrder.length - 1
            setBreakDownsData(breakdownsDataWithNewOrder)

            const breakdownsProps = breakDownsData[breakdownsFormsCount]
            newBreakdownsForms[breakdownsFormsCount] = (<AddBreakdown {...breakdownsProps}
                                                                     key={breakdownsFormsCount}
                                                                     language={language}
                                                                      categoriesOptions={categories}
                                                                      AddNewBreakDown={AddNewBreakDown}
                                                                      DeleteBreakDown={DeleteBreakDown}
                                                                     SaveData={SaveChangedOption} />)
        }

        setBreakDownsForm(newBreakdownsForms)
    }

    useEffect(() => {
        GetBreakdowns()
    }, [language])

    useEffect(() => {
        if(typeof(setSaveBreakdown) == "function" && typeof(setCancelBreakdown) == "function") {
            setSaveBreakdown({function: SaveBreakdowns})
            setCancelBreakdown({function: CancelBreakdowns})
        }
        GenerateBreakdownsForms()
    }, [breakDownsData, language])

    return( <div className={styles.content}>
        <CapsuleLable label={"BREAKDOWNS"} />
        {breakDownsData.length === 0
            ?
            <div className={styles.add_one_more_breakdown} >
                <div className={styles.click_box} onClick={() => AddNewBreakDown()}>
                + Add breakdown
                </div>
            </div>
            : null}

        {breakDownsForm}
    </div>)
}