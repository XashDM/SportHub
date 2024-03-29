import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import loginRequest from "../helpers/loginRequest"
import googleLoginRequest from "../helpers/googleLoginRequest"
import {useAuthStore} from "../../../store/useAuthStore"
import {ROUTES} from "../../../routes/routes"
import GoogleLoginButton from "../../../ui/GoogleLoginButton"
import {useGoogleLogin} from "@react-oauth/google"
import { useTranslation } from "react-i18next"

function LoginForm(){
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { userData, setUserData, setAccessToken } = useAuthStore()
    const isFormFilled = !(email === "" || password === "")
    function setResultDataIfSuccess(result){
        if (result.user && result.accessToken) {
            setUserData(result.user)
            setAccessToken(result.accessToken)
            setError(false)
            navigate(ROUTES.HOME)
        }else{
            setError(true)
        }
    }
    const handleLogin = async (event) => {
        event.preventDefault()

        const response = await loginRequest(email, password)

        setResultDataIfSuccess(response.data)
    }

    const handleLoginSuccess = async (googleResponse) => {
        // handle successful login
        console.log('Login success:', googleResponse)

        try {
            const result = await googleLoginRequest(googleResponse.access_token)

            setResultDataIfSuccess(result)
        } catch (error) {
            console.error(error)
        }

        setAccessToken(googleResponse.code)
        setError(false)
        navigate(ROUTES.HOME)
    }
    const handleLoginFailure = (response) => {
        console.log('Login failure:', response)
        setError(true)
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: response => handleLoginSuccess(response),
        onError: response => handleLoginFailure(response),
        flow: 'implicit',
    })


    return(
        <div className={styles.container}>

            <div>
                <h2>{t('AuthContainer.LoginForm.LogInFormCaption')}</h2>
                {error && <h3 className={styles.error}>{t('AuthContainer.LoginForm.IncorrectDataText')}</h3>}
            </div>

            <GoogleLoginButton
                onClick={handleGoogleLogin}
            />

            <Input label={t('AuthContainer.EmailLabel')}
                   placeholder={"Email@gmail.com"}
                   error={error}
                   onChange={(event) => setEmail(event.target.value)}/>

            <Input label={t('AuthContainer.PasswordLabel')}
                   placeholder={t('AuthContainer.PasswordPlaceholder')}
                   error={error} isVisible={false}
                   onClick={() => navigate(ROUTES.PASSWORD_RESET)}
                   onChange={(event) => setPassword(event.target.value)}
            />

            <Button onClick={handleLogin} text={t('AuthContainer.LogInBtn')} disabled={!isFormFilled}/>
        </div>
    )
}

export default LoginForm
