import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import loginRequest from "../helpers/loginRequest"
import {useAuthStore} from "../../../store/useAuthStore"
import {ROUTES} from "../../../routes/routes"
import GoogleLoginButton from "../../../ui/GoogleLoginButton"
import jwt_decode from "jwt-decode"
import {useGoogleLogin} from "@react-oauth/google"

function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { userData, setUserData, setAccessToken } = useAuthStore()
    const handleLogin = async (event) => {
        event.preventDefault()

        const result = await loginRequest(email, password)

        if (result === "ERR_BAD_REQUEST") {
           setError(true)
        }else{
            setUserData(result.user)
            setAccessToken(result.accessToken)
            setError(false)
            navigate(ROUTES.HOME)
        }
    }
    useEffect(() => {
        console.log(userData)
    }, [userData])

    const handleLoginSuccess = (response) => {
        // handle successful login
        console.log('Login success:', response)
        setUserData({firstName: "Oleh", lastName: "Kril", email: "mayorford777@gmail.com"})
        setAccessToken(response.code)
        setError(false)
        navigate(ROUTES.HOME)
    }
    const handleLoginFailure = (response) => {
        // handle login failure
        console.log('Login failure:')
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
                <h2>Log in to Sports Hub</h2>
                {error && <h3 className={styles.error}>Incorrect user email or password. Try again</h3>}
            </div>

            <GoogleLoginButton
                onClick={handleGoogleLogin}
            />

            <Input label={"Email"}
                   placeholder={"Email@gmail.com"}
                   error={error}
                   onChange={(event) => setEmail(event.target.value)}/>

            <Input label={"Password"}
                   placeholder={"8 + characters (letters and numbers)"}
                   error={error} isVisible={false}
                   onClick={() => console.log("Forgot password clicked!")}
                   onChange={(event) => setPassword(event.target.value)}
            />

            <Button onClick={handleLogin} text={"LOG IN"}/>
        </div>
    )
}

export default LoginForm
