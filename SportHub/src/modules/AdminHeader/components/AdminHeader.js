import React, { useState } from 'react'
import styles from '../styles/style.module.scss'
import ProfileSidebar from "./ProfileSidebar"
import HeaderContainer from "../../../components/HeaderContainer"
import { useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "../../../routes/routes"
import SearchDropdownList from '../../SearchDropdownList/components/SearchDropdownList'
import SelectLanguage from "../../SelectLanguage"
import {useAuthStore} from "../../../store/useAuthStore"

export default function AdminHeader({ setIsContentSearch, setContentSearchValue }) {

    const [profileDropdownListActive, setProfileDropdownListActive] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const user = useAuthStore()

    return (
        <HeaderContainer>
            <div className={styles.header}>
                <div className={styles.searchbar}>
                    <SearchDropdownList setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                </div>
                <div className={styles.blank}></div>
                <div className={styles.profile_sector}>
                    <div className={styles.switch}>
                        <span hint={location.pathname === ROUTES.HOME ? "Switch to admin page" : "Switch to user view"} direction="down">
                            <img className={styles.switch_image}
                                onClick={() => location.pathname === ROUTES.HOME ? navigate(ROUTES.ADMIN) : navigate(ROUTES.HOME)}
                                src={'/icons/AccountSwitcher.svg'} alt={""} />
                        </span>
                    </div>
                    <div className={styles.mini_profile} onClick={() => setProfileDropdownListActive(!profileDropdownListActive)}>
                        <div className={styles.mini_profile_wrapper}>
                            <img className={styles.profile_picture} src="/icons/UserPicture.png" alt={""} />
                            <div className={styles.profile_info} >
                                <div className={styles.profile_labels}>
                                    <div className={styles.name_surname_label}>
                                        <div>{user.userData?.firstName} {user.userData?.lastName}</div>
                                        <img className={styles.open_profile_menu} src={'/icons/Polygon.svg'} />
                                    </div>
                                    <div className={styles.administrator_label}>Administrator</div>
                                </div>
                            </div>
                            <ProfileSidebar active={profileDropdownListActive} user={user} />
                        </div>
                    </div>
                </div>
                <div className={styles.languages}>
                    <SelectLanguage />
                </div>
            </div>
        </HeaderContainer>
    )
}
