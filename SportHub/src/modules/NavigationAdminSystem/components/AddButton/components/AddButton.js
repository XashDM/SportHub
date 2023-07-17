import styles from "../styles/style.module.scss"
import React from "react"

const AddButton =  ({onClick, text}) => {
    return(
        <button className={styles.add_button} onClick={onClick}>
            {text}
        </button>
    )
}

export default AddButton