import React from "react"
import styles from "../styles/style.module.scss"
import { useAuthStore } from "../../../store/useAuthStore"
import { ROUTES } from "../../../routes/routes"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"

export default function ProfileSidebar({ active, left }) {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { userData, accessToken, setUserData, setAccessToken } = useAuthStore()

    const handleLogout = async (event) => {
        event.preventDefault()
        setUserData(null)
        setAccessToken(null)
    }

    return (
        <div>
            <div className={active ? styles.profile_sidebar_active : styles.profile_sidebar_inactive} style={{ left: left }}>
                <div className={styles.name_surname}>{userData?.firstName} {userData?.lastName}</div>
                <div className={styles.email}>{userData?.email}</div>
                <div className={styles.view_profile_button}>{t('ProfileSidebar.ViewProfile')}</div>
                <div className={styles.personal}>{t('ProfileSidebar.Personal')}</div>
                <div className={styles.change_password} onClick={() => navigate(ROUTES.PASSWORD_CHANGE.replace(':token', accessToken))}>{t('ProfileSidebar.ChangePassword')}</div>
                <div className={styles.change_password} onClick={handleLogout}>{t('ProfileSidebar.LogOut')}</div>
            </div>
        </div>
    )
}