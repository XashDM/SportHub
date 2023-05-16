import Button from "../../../../../ui/Button"
import PopUpAddLanguagesStyles from '../styles/PopUpAddLanguagesStyles'
import SearchLanguages from '../components/SearchLanguages'
import styles from "../styles/style.module.scss"

function PopUpAddLanguages({ open, handleAdd, handleClose, currentLanguages, languagesToAdd, setLanguagesToAdd }) {
    return (
        <div>
            <PopUpAddLanguagesStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <h1>Add language</h1>
                    <SearchLanguages
                        currentLanguages={currentLanguages}
                        selectedLanguages={languagesToAdd}
                        onSelectedLanguagesChange={setLanguagesToAdd} />
                </div>
                <hr></hr>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text={"Cancel"}></Button>
                    <Button onClick={handleAdd} text={"Add"}></Button>
                </div>
            </PopUpAddLanguagesStyles>
        </div>
    )
}

export default PopUpAddLanguages
