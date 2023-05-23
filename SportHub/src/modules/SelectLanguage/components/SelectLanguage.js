import styles from "../styles/style.module.scss"
import getLanguagesRequest from "../../LanguagesManagement/helpers/getLanguagesRequest"
import { useEffect, useState } from "react"
import { changeLanguage } from "i18next"

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
            <select className={styles.select} onChange={handleSetCurrentLanguage} value={currentLanguage}>
                {languages?.map((language) => (
                    language.isActive
                        ?
                        <option key={language.shortTitle} value={language.shortTitle}>{language.shortTitle.toUpperCase()}</option>
                        :
                        <></>
                ))}
            </select>
        </>
    )
}
