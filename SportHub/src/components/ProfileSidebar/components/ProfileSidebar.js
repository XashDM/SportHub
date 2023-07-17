import React from "react"
import styles from "../styles/style.module.scss"
import {useAuthStore} from "../../../store/useAuthStore"

export default function ProfileSidebar({active, left})
{
    const user = useAuthStore()

        return(
            <div>
                <div className={active ? styles.profile_sidebar_active : styles.profile_sidebar_inactive} style={{left:left}}>
                    <div className={styles.name_surname}>{user.userData?.firstName} {user.userData?.lastName}</div>
                    <div className={styles.email}>{user.userData?.email}</div>
                    <div className={styles.view_profile_button}>VIEW PROFILE</div>
                    <div className={styles.personal}>Personal</div>
                    <div className={styles.change_password}>Change password</div>
                    <div className={styles.change_password}>Log out</div>
                </div>
            </div>
        )
}