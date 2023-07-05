import React, {useState} from 'react'
import styles from "../styles/style.module.scss"
import VerticalAdminMenuElement from "./VerticalAdminMenuElement"
import {VERTICAL_MENU_ELEMENTS} from "../constants/VerticalMenuConstants"
import { useTranslation } from "react-i18next"

export default function VerticalAdminMenu({currentMenuElement, setCurrentMenuElement}){
    const { t } = useTranslation()
    const [verticalMenuElements, setVerticalMenuElements] = useState(VERTICAL_MENU_ELEMENTS)

    return (
        <div>
            <div className={styles.vertical_menu}>
                {verticalMenuElements.map(({label, isDisabled}, index) => {
                    return <div
                        key={index}
                        onClick={() => {
                            if(!isDisabled){
                                setCurrentMenuElement(label)
                            }
                        }}
                        className={styles.vertical_menu_element}>

                        <VerticalAdminMenuElement
                            name={label}
                            isDisabled={isDisabled}
                            hintText={t('AdminPage.VerticalAdminMenu.' + label)}
                            isActive={label === currentMenuElement}  />
                    </div>
                })}
            </div>
        </div>
    )
}
