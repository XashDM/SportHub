import React, {useState} from 'react'
import styles from '../styles/style.module.scss'
import ProfileSidebar from "./ProfileSidebar"

export default function AdminHeader(){

    const [profileDropdownListActive, setProfileDropdownListActive] = useState(false)
    return (
        <div>
            <div className={styles.header}>

                <div className={styles.logo}>
                    <p className={styles.logo_inscription}>Sports Hub</p>
                </div>

                <div className={styles.profile_sector}>

                    <div className={styles.switch}>
                        <span hint="Switch to user view" direction="down">
                            <img className={styles.switch_image} src={process.env.PUBLIC_URL + '/icons/AccountSwitcher.svg'}  alt={""}/>
                        </span>
                    </div>

                    <div className={styles.mini_profile} onClick={() => setProfileDropdownListActive(!profileDropdownListActive)}>
                        <div className={styles.mini_profile_wrapper}>
                            <img className={styles.profile_picture} src="https://images.pexels.com/photos/14306688/pexels-photo-14306688.jpeg"  alt={""}/>

                            <div className={styles.profile_info} >
                                <div className={styles.profile_labels}>
                                    <div className={styles.name_surname_label}>
                                        <div>Test Testenko</div> <img className={styles.open_profile_menu} src={process.env.PUBLIC_URL + '/icons/Polygon.svg'}  alt={""}/>
                                    </div>
                                    <div className={styles.administrator_label}>Administrator</div>
                                </div>
                            </div>
                        </div>
                        <ProfileSidebar active={profileDropdownListActive} />
                    </div>

                </div>
            </div>
        </div>
    )
}
