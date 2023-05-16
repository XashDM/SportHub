import React, {useState} from 'react'
import styles from '../styles/style.module.scss'
import ProfileSidebar from "./ProfileSidebar"
import HeaderContainer from "../../../components/HeaderContainer"

export default function AdminHeader(){

    const [profileDropdownListActive, setProfileDropdownListActive] = useState(false)
    return (
        <HeaderContainer>
            <div className={styles.header}>
                <div className={styles.profile_sector}>

                    <div className={styles.switch}>
                        <span hint="Switch to user view" direction="down">
                            <img className={styles.switch_image} src={'/icons/AccountSwitcher.svg'}  alt={""}/>
                        </span>
                    </div>

                    <div className={styles.mini_profile} onClick={() => setProfileDropdownListActive(!profileDropdownListActive)}>

                        <img className={styles.profile_picture} src="https://images.pexels.com/photos/14306688/pexels-photo-14306688.jpeg"  alt={""}/>

                            <div className={styles.profile_info} >
                                <div className={styles.profile_labels}>
                                    <div className={styles.name_surname_label}>
                                        <div>Test Testenko</div><img className={styles.open_profile_menu} src={process.env.PUBLIC_URL + '/icons/Polygon.svg'}/>
                                    </div>
                                    <div className={styles.administrator_label}>Administrator</div>
                                </div>
                            </div>
                            <ProfileSidebar active={profileDropdownListActive} />
                        </div>

                    </div>
                </div>
            </div>
        </HeaderContainer>
    )
}
