import React from 'react'
import {ReactSVG} from "react-svg"
import styles from "../styles/style.module.scss"

export default function VerticalAdminMenuElement(props) {

    return (
            <div>
                <div className={props.isActive === true ? styles.active : styles.inactive}
                     hint={props.hintText} direction={"right"}>
                    <ReactSVG src={process.env.PUBLIC_URL + "/icons/VerticalMenu/"+ props.name + ".svg"}  />
                </div>
            </div>
    )
}
