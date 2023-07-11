import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"

import signUpRequest from "../helpers/signUpRequest"
import EmailSentContainer from "../../../components/EmailSentContainer"
import { useTranslation } from "react-i18next"
import isEmailValid from "../../../helpers/validation/validateEmail"
import isPasswordValid from "../../../helpers/validation/validatePassword"

function SignUpForm(){
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorText, setErrorText] = useState("")
    const [isSent, setIsSent] = useState(false)
    const isFormFilled = !(firstName === "" || lastName === "" || email === "" || password === "")

    function isFormValid(){
        if(!isEmailValid(email)){
            setErrorText("AuthContainer.SignUpForm.IncorrectEmail")
            return false
        }else if(!isPasswordValid(password)){
            setErrorText("AuthContainer.SignUpForm.ShortPassword")
            return false
        }

        return true
    }

    const handleSignUp = async (event) => {
        event.preventDefault()

        if(!isFormValid()) return

        const response = await signUpRequest({email, password, firstName, lastName})

        if (response?.status === 200) {
            setIsSent(true)
            setErrorText("")
        }else{
            setErrorText("AuthContainer.SignUpForm.UnexpectedError")
        }
    }

    return (
        !isSent ?
            <div className={styles.container}>

                <div>
                    <h2>{t('AuthContainer.SignUpForm.SignUpFormCaption')}</h2>
                    {errorText && <h3 className={styles.error}>{t(errorText)}</h3>}
                </div>

                <div className={styles.two_col_container}>
                    <Input label={t('AuthContainer.FirstNameLabel')}
                           placeholder={"Oleh"}
                           error={errorText}
                           onChange={(event) => setFirstName(event.target.value)}/>

                    <Input label={t('AuthContainer.LastNameLabel')}
                           placeholder={"Doe"}
                           error={errorText}
                           onChange={(event) => setLastName(event.target.value)}/>
                </div>


                <Input label={t('AuthContainer.EmailLabel')}
                       placeholder={"JohnDoe@gmail.com"}
                       error={errorText}
                       onChange={(event) => setEmail(event.target.value)}/>

                <Input label={t('AuthContainer.PasswordLabel')}
                       placeholder={t('AuthContainer.PasswordPlaceholder')}
                       error={errorText}
                       onChange={(event) => setPassword(event.target.value)}
                />

                <Button onClick={handleSignUp} text={t('AuthContainer.SignUpBtn')} disabled={!isFormFilled}/>

            </div>
            :
            <EmailSentContainer
                heading={t('AuthContainer.CheckYourEmail') + " " + email}
                sub_heading={t('AuthContainer.SignUpForm.LetterInfo')}/>
    )
}

export default SignUpForm;
