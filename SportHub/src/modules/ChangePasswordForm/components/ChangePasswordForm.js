import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import {ROUTES} from "../../../routes/routes"
import passwordChangeRequest from "../helpers/passwordChangeRequest"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"


function ChangePasswordForm() {
    const { t } = useTranslation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [error, setError] = useState(false)

    const { token } = useParams()
    const navigate = useNavigate()

    const handleRequestPasswordButton = async (event) => {
        event.preventDefault()
        if (password === confirmPassword){
            const result = await passwordChangeRequest(token, password)

            if(result.status === 200){
                navigate(ROUTES.LOGIN)
            }else{
                setErrorText(t('AuthContainer.ChangePasswordForm.SomethingError'))
                setError(true)
            }
        }else{
            setError(true)
            setErrorText(t('AuthContainer.ChangePasswordForm.MatchError'))
        }
    }


    return(
            <div className={styles.container}>
                <div>
                    <h2 className={styles.heading}>{t('AuthContainer.ChangePasswordForm.ChangePasswordFormCaption')}</h2>
                    {error && <h3 className={styles.error}>{errorText}</h3>}
                </div>

                <Input label={t('AuthContainer.NewPasswordLabel')}
                    placeholder={t('AuthContainer.PasswordPlaceholder')}
                    error={error}
                    onChange={(event) => setPassword(event.target.value)}/>

                <Input label={t('AuthContainer.ConfirmPasswordLabel')}
                   placeholder={t('AuthContainer.PasswordPlaceholder')}
                   error={error}
                   onChange={(event) => setConfirmPassword(event.target.value)}/>

                <Button onClick={handleRequestPasswordButton} text={t('AuthContainer.SetNewPasswordBtn')}/>
                <button className={styles.bottom_link} onClick={() => navigate(ROUTES.LOGIN)}>{t('AuthContainer.BackToLogInBtn')}</button>
            </div>
    )
}

export default ChangePasswordForm
