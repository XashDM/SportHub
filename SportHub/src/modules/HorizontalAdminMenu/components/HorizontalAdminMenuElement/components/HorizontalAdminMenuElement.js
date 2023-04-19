import React from 'react'
import styles from "../styles/style.module.scss"

export default function HorizontalAdminMenuElement(props) {

        return (
            <div>
                <div className={props.active === true ? styles.active : styles.inactive}>{props.name}</div>
            </div>
        )
}
