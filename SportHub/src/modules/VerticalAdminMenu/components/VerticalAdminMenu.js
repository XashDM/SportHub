import React, {useState} from 'react'
import styles from "../styles/style.module.scss"
import VerticalAdminMenuElement from "./VerticalAdminMenuElement"
import {VERTICAL_MENU_ELEMENTS} from "../constants/VerticalMenuConstants";

export default function VerticalAdminMenu({currentMenuElement, setCurrentMenuElement}){

    const [verticalMenuElements, setVerticalMenuElements] = useState(VERTICAL_MENU_ELEMENTS)

    return (
        <div>
            <div className={styles.vertical_menu}>
                {verticalMenuElements.map((verticalMenuElement, index) => {
                    return <div
                        key={index}
                        onClick={() => {
                            setCurrentMenuElement(verticalMenuElement)
                        }}
                        className={styles.vertical_menu_element}>

                        <VerticalAdminMenuElement
                            name={verticalMenuElement}
                            hintText={verticalMenuElement}
                            isActive={verticalMenuElement === currentMenuElement}  />
                    </div>
                })}
            </div>
        </div>
    )
}
