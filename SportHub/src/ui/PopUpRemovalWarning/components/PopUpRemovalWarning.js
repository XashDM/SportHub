import Button from "../../Button"
import PopUpRemovalWarningStyles from '../styles/PopUpRemovalWarningStyles'
import styles from "../styles/style.module.scss"
import { useTranslation } from "react-i18next"

function PopUpRemovalWarning({ open, handleAction, handleCancel, icon, section }) {
    const { t } = useTranslation()
    return (
        <div>
            <PopUpRemovalWarningStyles
                open={open}
                onClose={handleCancel}>
                <div className={styles.container}>
                    <img src={process.env.PUBLIC_URL + '/icons/' + icon} alt="TrashBin" />
                    <h3>{t(`AdminPage.${section}.PopUpRemovalWarning.Title`)}</h3>
                    <span>
                        {t(`AdminPage.${section}.PopUpRemovalWarning.Content`)}
                        <br></br>
                        {t(`AdminPage.${section}.PopUpRemovalWarning.AreYouSure`)}
                    </span>
                </div>
                <hr></hr>
                <div className={styles.buttonContainer}>
                    {handleCancel ? <Button onClick={handleCancel} isOutlined={true} text={t(`AdminPage.${section}.PopUpRemovalWarning.CancelBtn`)}></Button> : null}
                    <Button onClick={handleAction} text={t(`AdminPage.${section}.PopUpRemovalWarning.DeleteBtn`)}></Button>
                </div>
            </PopUpRemovalWarningStyles>
        </div>
    )
}

export default PopUpRemovalWarning;
