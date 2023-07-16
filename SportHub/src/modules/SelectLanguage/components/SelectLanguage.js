import getLanguagesRequest from "../../LanguagesManagement/helpers/getLanguagesRequest"
import { useEffect, useState } from "react"
import { changeLanguage } from "i18next"
import SelectStyles from "../styles/SelectStyles"
import MenuItemStyles from "../styles/MenuItemStyles"
import { useTranslation } from "react-i18next"

export default function SelectLanguage() {
    const { t, i18n } = useTranslation()
    const [languages, setLanguages] = useState([])
    const handleLanguagesGet = async () => {
        const result = await getLanguagesRequest()
        console.log(result)
        setLanguages(result.data)
    }

    const handleSetCurrentLanguage = async (event) => {
        changeLanguage(event.target.value)
    }

    useEffect(() => {
        handleLanguagesGet()
    }, [i18n.language])

    return (
        <>
            <SelectStyles
                value={i18n.language}
                onChange={handleSetCurrentLanguage}
                onMouseDown={handleLanguagesGet}
                autoWidth
            >
                {
                    languages
                        ?
                        languages.filter((language) => language.isActive).map((language) => (
                            <MenuItemStyles key={language.shortTitle} value={language.shortTitle}>
                                {language.shortTitle.toUpperCase()}
                            </MenuItemStyles>
                        ))
                        :
                        <MenuItemStyles key={i18n.language} value={i18n.language}>
                            {i18n.language.toUpperCase()}
                        </MenuItemStyles>
                }
            </SelectStyles>
        </>
    )
}
