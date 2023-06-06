import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useNavigate } from "react-router-dom"
import HeaderContainer from "../../../components/HeaderContainer"
import { useTranslation } from "react-i18next"
import SelectLanguage from "../../SelectLanguage"

const NotLoginedHeader = () =>
{
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const onClickLoginHandler = () => navigate(`/log-in`)
    const onClickSignUpHandler = () => navigate("/sign-up")

    return (
        <HeaderContainer>
            <div className={styles.header}>
                <div className={styles.searchbar}>
                    <img className={styles.img_icon} src={'/icons/Magnifying-glass.svg'} ></img>
                    <Input className={styles.input} placeholder={t('Header.UserHeader.SearchByCaption')}></Input>
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
