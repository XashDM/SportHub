import React, {useState} from 'react'
import styles from "../styles/style.module.scss"
import VerticalAdminMenuElement from "./VerticalAdminMenuElement"
import {VERTICAL_MENU_ELEMENTS, VERTICAL_MENU_HINTS} from "../../../constants/VerticalMenuConstants";
import NavigationSystem from "../../../modules/NavigationAdminSystem"

export default function VerticalAdminMenu(){

    const [verticalMenuElements, setVerticalMenuElements] = useState(VERTICAL_MENU_ELEMENTS)
    const [hintText, setHintText] = useState(VERTICAL_MENU_HINTS)
    const [currentVerticalMenuElement, setCurrentVerticalMenuElement] = useState()

    return (
        <div>
            <div className={styles.vertical_menu}>
                {verticalMenuElements.map((verticalMenuElement, index) => {
                    return <div
                        onClick={() => setCurrentVerticalMenuElement(index)} className={styles.vertical_menu_element}>

                        <VerticalAdminMenuElement
                            name={verticalMenuElement}
                            hintText={hintText[index]}
                            isActive={index === currentVerticalMenuElement} />
                    </div>
                })}
            </div>
            {currentVerticalMenuElement === 5 && (
                <div className={styles.module_content_container}>
                    <NavigationSystem />
                </div>
            )}
        </div>
        
    )
}
