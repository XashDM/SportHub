import React from "react"
import styles from "../styles/style.module.scss"

export default function ProfileSidebar(props)
{
        return(
            <div>
                <div className={props.active ? styles.profile_sidebar_active : styles.profile_sidebar_inactive}>
                    <div className={styles.name_surname}>Test Testenko</div>
                    <div className={styles.email}>testtestenko@gmail.com</div>
                    <div className={styles.view_profile_button}>VIEW PROFILE</div>
                    <div className={styles.personal}>Personal</div>
                    <div className={styles.change_password}>Change password</div>
                    <div className={styles.change_password}>Log out</div>
                </div>
            </div>
        )
}