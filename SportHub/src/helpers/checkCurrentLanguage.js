import { changeLanguage } from "i18next"
import getLanguageRequest from "../modules/LanguagesManagement/helpers/getLanguageRequest"

export default async function checkCurrentLanguage() {
    const currentLanguage = localStorage.getItem("i18nextLng")
    const languageFromBackend = await getLanguageRequest(currentLanguage)
    if (!languageFromBackend || !languageFromBackend.data.isActive) {
        changeLanguage("en")
        return true
    }
    return false
}
