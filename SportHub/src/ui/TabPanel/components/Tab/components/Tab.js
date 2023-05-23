import React from "react"
import styles from "../styles/style.module.scss"

export default function Tab({value, handleClick, icon, label, activeTab}){
    return (
        <div className={value==activeTab ? styles.tab + ' ' + styles.active_tab: styles.tab} value={value} onClick={handleClick}>
            <img className={styles.flag} src={icon} value={value} />
            {label}
        </div>
      )
}