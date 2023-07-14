import styles from "../styles/style.module.scss"
import Button from "../../../ui/Button"
import {useNavigate} from "react-router-dom"
import {ROUTES} from "../../../routes/routes"
import { useTranslation } from "react-i18next"

function AuthContainer({isLogIn, children}){
    const { t } = useTranslation()
    const navigate = useNavigate()

    function handleLogToSign(e){
        e.stopPropagation()
        navigate(ROUTES.SIGNUP)
    }

    function handleSignToLog(e){
        e.stopPropagation()
        navigate(ROUTES.LOGIN)
    }
    return(
        <div className={styles.container}>
           <div className={styles.img_container}>
               <img className={`${styles.img} ${isLogIn && styles.img__darken}`} src="/images/SportBanner.png" alt="SportBanner"/>
               <div className={styles.logo}>Sport Hub</div>
           </div>
           <div className={styles.form_container}>
               <div className={styles.controls_container}>
                   <p>{isLogIn ? t('AuthContainer.QuestionDont') : t('AuthContainer.QuestionAlready')}</p>
                   <Button isOutlined={true} text={isLogIn ? t('AuthContainer.BtnGetStarted') : t('AuthContainer.BtnLogIn')}
                           onClick={ isLogIn ? handleLogToSign : handleSignToLog}/>
               </div>

               {children}

           </div>
        </div>
    )
}

export default AuthContainer;
