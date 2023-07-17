import styles from "../styles/style.module.scss"
import HeaderContainer from "../../../components/HeaderContainer"
import { useTranslation } from "react-i18next"
import SelectLanguage from "../../SelectLanguage"
import SearchDropdownList from "../../SearchDropdownList/components/SearchDropdownList"
import React, {useState} from "react"
import ProfileSidebar from "../../../components/ProfileSidebar"

const UserHeader = ({ username, userimg, setIsContentSearch, setContentSearchValue }) => {
    const { t, i18n } = useTranslation()
    const [profileDropdownListActive, setProfileDropdownListActive] = useState(false)

    return (
        <HeaderContainer>
            <div className={styles.header}>
                <div className={styles.searchbar}>
                    <SearchDropdownList setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                </div>
                <div className={styles.media}>
                    <span className={styles.share}>{t('Header.UserHeader.ShareCaption')}</span>
                    <img className={styles.icons} src={'/icons/FacebookWithoutCircle.svg'} ></img>
                    <img className={styles.icons} src={'/icons/Twitter.svg'} ></img>
                    <img className={styles.icons} src={'/icons/Google+.svg'}  ></img>
                </div>
                <div className={styles.auth} onClick={() => setProfileDropdownListActive(!profileDropdownListActive)}>
                    <img className={styles.profile_img} src={"/icons/UserPicture.png"}></img>
                    <span className={styles.user_name_text}>{username?.firstName} {username?.lastName}</span>
                    <img className={styles.profile_img_icon} src={'/icons/Polygon.svg'}></img>
                    <ProfileSidebar active={profileDropdownListActive} left={"73%"} />
                </div>

                <div className={styles.languages}>
                    <SelectLanguage />
                </div>
            </div>
        </HeaderContainer>
    )
}
export default UserHeader
