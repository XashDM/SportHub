import Button from "../../../../../ui/Button"
import PopUpRemovalWarningStyles from '../styles/PopUpRemovalWarningStyles'
import styles from "../styles/style.module.scss"

function PopUpRemovalWarning({ open, handleDelete, handleClose }) {
    return (
        <div>
            <PopUpRemovalWarningStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <img src={process.env.PUBLIC_URL + '/icons/PopUpRemovalWarningTrashBin.svg'} alt="TrashBin" />
                    <h3>You are about to delete this language!</h3>
                    <span>
                        This language will be deleted from Sports Hub<br></br>
                        Are you sure?
                    </span>
                </div>
                <hr></hr>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text={"Cancel"}></Button>
                    <Button onClick={handleDelete} text={"Delete"}></Button>
                </div>
            </PopUpRemovalWarningStyles>
        </div>
    )
}

export default PopUpRemovalWarning;
