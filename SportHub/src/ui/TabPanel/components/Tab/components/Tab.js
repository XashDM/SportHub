import React from "react"
import styles from "../styles/style.module.scss"
import {LANGUAGES_CONSTANTS} from "../../../../../constants/LanguagesConstants"


export default function Tab({value, handleClick, icon, label, activeTab}){
    let flagCode = "";

    for (const language of LANGUAGES_CONSTANTS) {
    if (language.code === label) {
        flagCode = language.flag_code;
        break;
    }

    flagCode = flagCode ? flagCode : label;
}
    return (
        <div key={value} className={value===activeTab ? styles.tab + ' ' + styles.active_tab: styles.tab} value={value} onClick={handleClick}>
            <img className={styles.flag} src={`https://flagcdn.com/w20/${flagCode.toLowerCase()}.png`} value={value} />
            {label}
        </div>
      )
}