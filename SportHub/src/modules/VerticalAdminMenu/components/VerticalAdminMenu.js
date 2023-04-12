import React, {useState} from 'react'
import styles from "../styles/style.module.scss"
import VerticalAdminMenuElement from "./VerticalAdminMenuElement"
import {VERTICALMENUELEMENTS, VERTICALMENUHINTS} from "../../../constants/VerticalMenuConstants";

export default function VerticalAdminMenu(){

    const [verticalMenuElements, setVerticalMenuElements] = useState(VERTICALMENUELEMENTS)
    const [hintText, setHintText] = useState(VERTICALMENUHINTS)
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
                            isActive={index === currentVerticalMenuElement}  />
                    </div>
                })}
            </div>
        </div>
    )
}
