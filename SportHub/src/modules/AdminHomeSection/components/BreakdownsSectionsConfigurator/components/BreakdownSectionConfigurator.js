import React, {useEffect, useState} from 'react'
import CapsuleLable from "../../../../../ui/CapsuleLable"
import styles from "../styles/style.module.scss"
import AddBreakdown from "./AddBreakdown"
import getBreakdownsRequest from "../helpers/getBreakdownsRequest"
import postBreakdownsRequest from "../helpers/postBreakdownsRequest"

export default function BreakdownSectionConfigurator({setSaveBreakdown, setCancelBreakdown, language, categories = []}){

    const [startBreakDownData, setStartBreakDownData] = useState([])
    const [breakDownsData, setBreakDownsData] = useState([])
    const [breakDownsForm, setBreakDownsForm] = useState([])
    const [languageId, setLanguageId] = useState()

    const GetBreakdowns = async () => {
        const request = await getBreakdownsRequest(languageId)
        let breakdowns = []
        for (let breakdownsCount in request.data){
            const data = request.data[breakdownsCount]
            breakdowns[breakdownsCount] = {
                order: null,
                isLastBreakDown: null,
                category: data.category,
                subcategory: data.subCategory,
                team: data.team
            }
        }
        setBreakDownsData(breakdowns)
        setStartBreakDownData(breakdowns)
    }

    const SaveBreakdowns = () => {
        try {
            let jsonPostRequest = []
            console.log(breakDownsData.length)
            for (let breakdownsCounter = 0; breakdownsCounter < breakDownsData.length; breakdownsCounter++) {
                jsonPostRequest.push({
                    languageId: languageId,
                    categoryId: breakDownsData[breakdownsCounter].category.categoryId,
                    subCategoryId: breakDownsData[breakdownsCounter].subCategory?.subCategoryId,
                    teamId: breakDownsData[breakdownsCounter].team?.teamId
                })
            }
            postBreakdownsRequest(languageId, jsonPostRequest)
            //setFleshMessageIsSuccessful(true)
            //setStartMainArticlesData(breakDownsData)
        }
        catch (error){
           // setFleshMessageIsSuccessful(false)
        }
        //setFleshMessageIsOpen(true)
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
        breakDownsData.splice(index, 1)
        setBreakDownsData(newBreakDownData);
    }

    const SaveChangedOption = (order, category, subcategory, team) => {
        const newbreakDownData = [...breakDownsData]

        newbreakDownData[order].category = category
        newbreakDownData[order].subcategory = subcategory
        newbreakDownData[order].team = team

        setBreakDownsData(newbreakDownData)
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
                                                                     languageId={languageId}
                                                                      categoriesOptions={categories}
                                                                      AddNewBreakDown={AddNewBreakDown}
                                                                      DeleteBreakDown={DeleteBreakDown}
                                                                     SaveData={SaveChangedOption} />)
        }

        setBreakDownsForm(newBreakdownsForms)
    }

    useEffect(() => {
        setLanguageId(language?.languageId)
    }, [language])

    useEffect(() => {
        GetBreakdowns()
    }, [languageId, language])

    useEffect(() => {
        GenerateBreakdownsForms()
    }, [breakDownsData])

    useEffect(() => {
        if(typeof(setSaveBreakdown) == "function" && typeof(setCancelBreakdown) == "function") {
            setSaveBreakdown({function: SaveBreakdowns})
            setCancelBreakdown({function: CancelBreakdowns})
        }
    }, [breakDownsData, languageId, language])

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

        {breakDownsForm.map((form) => {
            return form
        })}
    </div>)
}