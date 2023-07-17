import getLanguagesRequest from "../../LanguagesManagement/helpers/getLanguagesRequest"
import { useEffect, useState } from "react"
import { changeLanguage } from "i18next"
import SelectStyles from "../styles/SelectStyles"
import MenuItemStyles from "../styles/MenuItemStyles"

export default function SelectLanguage() {
    const [languages, setLanguages] = useState([])
    const handleLanguagesGet = async () => {
        const result = await getLanguagesRequest()
        console.log(result)
        setLanguages(result.data)
    }
    const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("i18nextLng"))
    const handleSetCurrentLanguage = async (event) => {
        changeLanguage(event.target.value)
        setCurrentLanguage(event.target.value)
    }

    useEffect(() => {
        handleLanguagesGet()
    }, [])

    return (
        <>
            <SelectStyles
                value={currentLanguage}
                onChange={handleSetCurrentLanguage}
                autoWidth
            >
                {languages?.map((language) => (
                    language.isActive
                        ?
                        <MenuItemStyles key={language.shortTitle} value={language.shortTitle}>{language.shortTitle.toUpperCase()}</MenuItemStyles>
                        :
                        null
                ))}
            </SelectStyles>
        </>
    )
}
