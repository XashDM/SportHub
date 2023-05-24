import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"

import signUpRequest from "../helpers/signUpRequest"
import EmailSentContainer from "../../../components/EmailSentContainer"
import { useTranslation } from "react-i18next"

function SignUpForm(){
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const handleSignUp = async (event) => {
        event.preventDefault()

        const result = await signUpRequest({email, password, firstName, lastName})

        if (result === "ERR_BAD_REQUEST") {
           setError(true)
        }else{
            setIsSent(true)
            setError(false)
        }
    }

    return (
        !isSent ?
            <div className={styles.container}>

                <div>
                    <h2>{t('AuthContainer.SignUpForm.SignUpFormCaption')}</h2>
                    {error && <h3 className={styles.error}>{t('AuthContainer.SignUpForm.IncorrectDataText')}</h3>}
                </div>

                <div className={styles.two_col_container}>
                    <Input label={t('AuthContainer.FirstNameLabel')}
                           placeholder={"Oleh"}
                           error={error}
                           onChange={(event) => setFirstName(event.target.value)}/>

                    <Input label={t('AuthContainer.LastNameLabel')}
                           placeholder={"Doe"}
                           error={error}
                           onChange={(event) => setLastName(event.target.value)}/>
                </div>


                <Input label={"Email"}
                       placeholder={"JohnDoe@gmail.com"}
                       error={error}
                       onChange={(event) => setEmail(event.target.value)}/>

                <Input label={t('AuthContainer.PasswordLabel')}
                       placeholder={t('AuthContainer.PasswordPlaceholder')}
                       error={error}
                       onChange={(event) => setPassword(event.target.value)}
                />

                <Button onClick={handleSignUp} text={t('AuthContainer.SignUpBtn')}/>

            </div>
            :
            <EmailSentContainer
                heading={t('AuthContainer.CheckYourEmail') + email}
                sub_heading={t('AuthContainer.SignUpForm.LetterInfo')}/>
    )
}

export default SignUpForm;
