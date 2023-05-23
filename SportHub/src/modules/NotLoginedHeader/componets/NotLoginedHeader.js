import styles from "../style/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useNavigate } from "react-router-dom"
import HeaderContainer from "../../../components/HeaderContainer"
import { useTranslation } from "react-i18next"
import getLanguagesRequest from "../../LanguagesManagement/helpers/getLanguagesRequest"
import { useEffect, useState } from "react"

const NotLoginedHeader = () =>
{
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const onClickLoginHandler = () => navigate(`/log-in`)
    const onClickSignUpHandler = () => navigate("/sign-up")

    const [languages, setLanguages] = useState([])
    const handleLanguagesGet = async () => {
        const result = await getLanguagesRequest()
        console.log(result)
        setLanguages(result.data)
    }
    const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("i18nextLng"))
    const handleSetCurrentLanguage = async (event) => {
        i18n.changeLanguage(event.target.value)
        setCurrentLanguage(event.target.value)
    } 

    useEffect(() => {
        handleLanguagesGet()
    }, [])

    return (
        <HeaderContainer>
            <div className={styles.header}>
                <div className={styles.searchbar}>
                    <img className={styles.img_icon} src={'/icons/Magnifying-glass.svg'} ></img>
                    <Input className={styles.input} placeholder={t('Header.NotLoginedHeader.SearchByCaption')}></Input>
                </div>
                <div className={styles.media}>
                    <span className={styles.share}>{t('Header.NotLoginedHeader.ShareCaption')}</span>
                    <img className={styles.icons} src={'/icons/FacebookWithoutCircle.svg'} ></img>
                    <img className={styles.icons} src={'/icons/Twitter.svg'} ></img>
                    <img className={styles.icons} src={'/icons/Google+.svg'}  ></img>
                </div>
                <div className={styles.auth}>
                    <button className={styles.btn_signup} onClick={onClickSignUpHandler} value={"Sign up"}>{t('Header.NotLoginedHeader.SignUpBtn')}</button>
                    <Button text={t('Header.NotLoginedHeader.LoginBtn')} onClick={onClickLoginHandler} isOutlined={true}></Button>
                </div>
                <div className={styles.languages}>
                    <select className={styles.slect} onChange={handleSetCurrentLanguage} value={currentLanguage}>
                        {languages?.map((language) => (
                            language.isActive
                            ?
                            <option key={language.shortTitle} value={language.shortTitle}>{language.shortTitle.toUpperCase()}</option>
                            :
                            <></>
                        ))}
                    </select>
                </div>
            </div>
        </HeaderContainer>
)
}
export default NotLoginedHeader
