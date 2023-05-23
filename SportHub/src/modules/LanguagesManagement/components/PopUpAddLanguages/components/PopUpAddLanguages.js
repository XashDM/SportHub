import Button from "../../../../../ui/Button"
import PopUpAddLanguagesStyles from '../styles/PopUpAddLanguagesStyles'
import SearchLanguages from '../components/SearchLanguages'
import styles from "../styles/style.module.scss"
import { useTranslation } from "react-i18next"

function PopUpAddLanguages({ open, handleAdd, handleClose, currentLanguages, languagesToAdd, setLanguagesToAdd }) {
    const { t } = useTranslation()
    return (
        <div>
            <PopUpAddLanguagesStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <h1>{t('AdminPage.LanguagesManagement.PopUpAddLanguages.AddLanguage')}</h1>
                    <SearchLanguages
                        currentLanguages={currentLanguages}
                        selectedLanguages={languagesToAdd}
                        onSelectedLanguagesChange={setLanguagesToAdd} />
                </div>
                <hr></hr>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text={t('AdminPage.LanguagesManagement.PopUpAddLanguages.CancelBtn')}></Button>
                    <Button onClick={handleAdd} text={t('AdminPage.LanguagesManagement.PopUpAddLanguages.AddBtn')}></Button>
                </div>
            </PopUpAddLanguagesStyles>
        </div>
    )
}

export default PopUpAddLanguages
