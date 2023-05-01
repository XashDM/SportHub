import React from 'react'
import styles from "../styles/style.module.scss"
function GoogleLoginButton({ onClick }){

    return (
        <button onClick={onClick} className={styles.button}>
            <img src="icons/Google.svg" alt="google icon" className={styles.icon}/>
        </button>
    )
}

export default GoogleLoginButton
