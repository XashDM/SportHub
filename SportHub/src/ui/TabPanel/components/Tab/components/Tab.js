import React from "react"
import styles from "../styles/style.module.scss"
import { LANGUAGES_CONSTANTS } from "../../../../../constants/LanguagesConstants"


export default function Tab({ value, handleClick, label, activeTab, isActive }) {
    let flagCode = "";

    for (const language of LANGUAGES_CONSTANTS) {
        if (language.code === label) {
            flagCode = language.flag_code;
            break;
        }
    }

    let languageName = label;
    for (const language of LANGUAGES_CONSTANTS) {
        if (language.code === label) {
            languageName = language.label;
            break;
        }
    }

    flagCode = flagCode ? flagCode : label;
    return (
        <div key={value} className={value === activeTab ? styles.tab + ' ' + styles.active_tab : styles.tab} value={value} onClick={handleClick}>
            <img className={styles.flag} src={`https://flagcdn.com/${flagCode.toLowerCase()}.svg`} value={value} />
            {languageName}
            {isActive ? null : <div className={styles.hidden} >hidden </div>}
        </div>
    )
}