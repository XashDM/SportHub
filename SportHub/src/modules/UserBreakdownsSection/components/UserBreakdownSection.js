import CapsuleLable from "../../../ui/CapsuleLable"
import BreakDown from "./Breakdown"
import {useEffect, useState} from "react"
import getBreakdowns from "../helpers/getBreakdowns"
import constants from "../constants/constants"

export default function UserBreakdownSection(){

    const [breakdowns, setBreakDowns] = useState([])
    const [languageId, setLanguageId] = useState("0")
    const [breakdownSection, setBreakdownSection] = useState()

    const SetBreakDowns = async (languageId, lastArticles, numberOfArticles) => {
        const response = await getBreakdowns(languageId, lastArticles, numberOfArticles)
        setBreakDowns(response.data)
    }

    const SetBreakdownsSection = (breakdowns) => {
        let breakdownSection = []
        for(let breakdownsCounter = 0; breakdownsCounter < breakdowns.length; breakdownsCounter++){
            breakdownSection.push(<BreakDown groupName={breakdowns[breakdownsCounter].groupName} articles={breakdowns[breakdownsCounter].articles}/>)
        }

        setBreakdownSection(breakdownSection)
    }

    useEffect(() => {
        SetBreakDowns(languageId, constants.LAST_ARTICLES, constants.NUMBER_OF_ARTICLES)
    }, [])

    useEffect(() => {
        SetBreakdownsSection(breakdowns)
    }, [breakdowns])

    return(<div>
        <CapsuleLable label={"BREAKDOWNS"} />
        {breakdownSection}

    </div>)
}