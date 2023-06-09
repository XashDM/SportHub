import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useNavigate } from "react-router-dom"
import HeaderContainer from "../../../components/HeaderContainer"
import { useTranslation } from "react-i18next"
import SelectLanguage from "../../SelectLanguage"
import SearchDropdownList from "../../SearchDropdownList/components/SearchDropdownList"

const NotLoginedHeader = ({setIsContentSearch, setContentSearchValue}) =>
{
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const onClickLoginHandler = () => navigate(`/log-in`)
    const onClickSignUpHandler = () => navigate("/sign-up")

    return (
        <HeaderContainer>
            <div className={styles.header}>
                <div className={styles.searchbar}>
                    <SearchDropdownList setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue}/>
                </div>
                <div className={styles.media}>
                    <span className={styles.share}>{t('Header.UserHeader.ShareCaption')}</span>
                    <img className={styles.icons} src={'/icons/FacebookWithoutCircle.svg'} ></img>
                    <img className={styles.icons} src={'/icons/Twitter.svg'} ></img>
                    <img className={styles.icons} src={'/icons/Google+.svg'}  ></img>
                </div>
                <div className={styles.auth}>
                    <button className={styles.btn_signup} onClick={onClickSignUpHandler} value={"Sign up"}>{t('Header.UserHeader.SignUpBtn')}</button>
                    <Button text={t('Header.UserHeader.LoginBtn')} onClick={onClickLoginHandler} isOutlined={true}></Button>
                </div>
                <div className={styles.languages}>
                    <SelectLanguage/>
                </div>
            </div>
        </HeaderContainer>
)
}
export default NotLoginedHeader
