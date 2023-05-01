import * as React from 'react'
import styles from "../styles/style.module.scss"
import FlashMessageStyles from '../styles/FlashMessageStyles'

function FlashMessage({ title, content, open, handleClose }) {

    const action = (
        <React.Fragment>
            <div className={styles.container}>
                <img src={process.env.PUBLIC_URL + '/icons/Success.svg'} alt="Success" />
                <div className={styles.textContainer}>
                    <h3>{title}</h3>
                    <span>{content}</span>
                </div>
            </div>
            <span className={styles.closeButton} onClick={handleClose}>
                    <img src={process.env.PUBLIC_URL + '/icons/Close.svg'} alt="Close" />
                </span>
        </React.Fragment>
    );

    return (
        <div>
            <FlashMessageStyles
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                action={action}
            />
        </div>
    );
}

export default FlashMessage
