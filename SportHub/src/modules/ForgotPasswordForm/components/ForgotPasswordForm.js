import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../../routes/routes"
import EmailSentContainer from "../../../components/EmailSentContainer"
import passwordResetRequest from "../helpers/passwordResetRequest"
import { useTranslation } from "react-i18next"

function ForgotPasswordForm() {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const navigate = useNavigate()
    const handleRequestPasswordButton = async (event) => {
        event.preventDefault()
        const result = await passwordResetRequest(email)

        if (result.status === 200) {
            setIsSent(true)
        } else {
            setError(true)
        }
    }


    return (

        !isSent ?
            <div className={styles.container}>
                <div>
                    <h2 className={styles.heading}>{t('AuthContainer.QuestionForgotPassword')}</h2>
                    {error && <h3 className={styles.error}>{t('AuthContainer.ForgotPasswordForm.IncorrectDataText')}</h3>}
                </div>

                <p className={styles.text_muted}>{t('AuthContainer.ForgotPasswordForm.EnterEmailText')}</p>

                <Input label={"Email"}
                    placeholder={"Email@gmail.com"}
                    error={error}
                    onChange={(event) => setEmail(event.target.value)} />

                <Button onClick={handleRequestPasswordButton} text={t('AuthContainer.RequestLinkBtn')} />
                <button className={styles.bottom_link} onClick={() => navigate(ROUTES.LOGIN)}>{t('AuthContainer.BackToLogInBtn')}</button>
            </div>
            :
            <EmailSentContainer
                heading={t('AuthContainer.CheckYourEmail') + " " + email}
                sub_heading={t('AuthContainer.ForgotPasswordForm.LetterInfo')} />
    )
}

export default ForgotPasswordForm
