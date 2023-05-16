import * as React from 'react'
import styles from "../styles/style.module.scss"
import FlashMessageStyles from '../styles/FlashMessageStyles'
import CancelIcon from '@mui/icons-material/Cancel'

function FlashMessage({ title, content, open, isSuccess, handleClose }) {
    const action = (
        <>
            <div className={styles.container}>
            {isSuccess ? (
                    <img src={process.env.PUBLIC_URL + '/icons/Success.svg'} alt="Success icon" />
                ) : (
                    <CancelIcon sx={{ width: 46, height: 46, color: "#D72130" }}/>
                )}
                <div className={styles.textContainer}>
                    <h3>{title}</h3>
                    <span>{content}</span>
                </div>
            </div>
            <span className={styles.closeButton} onClick={handleClose}>
                    <img src={'/icons/Close.svg'} alt="Close" />
                </span>
        </>
    )

    return (
        <div>
            <FlashMessageStyles
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                action={action}
            />
        </div>
    )
}

export default FlashMessage
