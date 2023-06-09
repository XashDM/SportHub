import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import HeaderContainer from "../../../components/HeaderContainer"
import { useTranslation } from "react-i18next"
import SelectLanguage from "../../SelectLanguage"
import SearchDropdownList from "../../SearchDropdownList/components/SearchDropdownList"

const UserHeader = ({ username, userimg, setIsContentSearch, setContentSearchValue }) => {
    const { t, i18n } = useTranslation()
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
                <div className={styles.auth}>
                    <img className={styles.profile_img} src={"/icons/UserPicture.png"}></img>
                    <span className={styles.user_name_text}>Ostap Luskevych</span>
                    <img className={styles.profile_img_icon} src={'/icons/Polygon.svg'}></img>
                </div>
                <div className={styles.languages}>
                    <SelectLanguage />
                </div>
            </div>
        </HeaderContainer>
    )
}
export default UserHeader
