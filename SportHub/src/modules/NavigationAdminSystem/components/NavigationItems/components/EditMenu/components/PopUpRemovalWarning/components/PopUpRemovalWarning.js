import Button from '../../../../../../../../../ui/Button'
import PopUpRemovalWarningStyles from '../styles/PopUpRemovalWarningStyles'
import styles from "../styles/style.module.scss"
import { useTranslation } from "react-i18next"

function PopUpRemovalWarning({ open, handleDelete, handleClose,title }) {
    const { t } = useTranslation()
    return (
        <div>
            <PopUpRemovalWarningStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <img src={process.env.PUBLIC_URL + '/icons/PopUpRemovalWarningTrashBin.svg'} alt="TrashBin" />
                    <h3>{title}</h3>
                    <span>
                        {"Are you sure?"}
                    </span>
                </div>
                <hr></hr>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text={t('AdminPage.LanguagesManagement.PopUpRemovalWarning.CancelBtn')}></Button>
                    <Button onClick={handleDelete} text={t('AdminPage.LanguagesManagement.PopUpRemovalWarning.DeleteBtn')}></Button>
                </div>
            </PopUpRemovalWarningStyles>
        </div>
    )
}

export default PopUpRemovalWarning;
