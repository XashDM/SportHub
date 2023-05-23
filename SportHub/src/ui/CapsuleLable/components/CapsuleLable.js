import React from "react"
import styles from "../styles/style.module.scss"
export default function CapsuleLable({label}){

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.line}></div>
                <div className={styles.lableSection}>{label}</div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}