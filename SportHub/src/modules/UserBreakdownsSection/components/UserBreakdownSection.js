import CapsuleLable from "../../../ui/CapsuleLable"
import BreakDown from "./Breakdown"
import {useEffect, useState} from "react"
import getBreakdowns from "../helpers/getBreakdowns"
import constants from "../constants/constants"
import {useTranslation} from "react-i18next"

export default function UserBreakdownSection(){

    const [breakdowns, setBreakDowns] = useState([])
    const [breakdownSection, setBreakdownSection] = useState()
    const { i18n } = useTranslation()

    const GetBreakDowns = async (languageId, lastArticles, numberOfArticles) => {
        const response = await getBreakdowns(languageId, lastArticles, numberOfArticles)
        setBreakDowns(response.data)
    }

    const SetBreakdownsSection = (breakdowns) => {
        if(breakdowns !== undefined && breakdowns !== null) {
            let breakdownSection = []
            for (let breakdownsCounter = 0; breakdownsCounter < breakdowns?.length; breakdownsCounter++) {
                breakdownSection.push(<BreakDown groupName={breakdowns[breakdownsCounter].groupName}
                                                 articles={breakdowns[breakdownsCounter].articles}/>)
            }
            setBreakdownSection(breakdownSection)
        }
    }

    useEffect(() => {
        GetBreakDowns(i18n.language, constants.LAST_ARTICLES, constants.NUMBER_OF_ARTICLES)
    }, [i18n.language])

    useEffect(() => {
        SetBreakdownsSection(breakdowns)
    }, [breakdowns])

    return(<div>
        <CapsuleLable label={"BREAKDOWNS"} />
        {breakdownSection}
    </div>)
}