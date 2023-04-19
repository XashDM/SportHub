import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import loginRequest from "../helpers/loginRequest"
import {useAuthStore} from "../../../store/useAuthStore"
import {ROUTES} from "../../../routes/routes"
import GoogleLoginButton from "../../../ui/GoogleLoginButton"
import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"

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

    const handleLoginSuccess = async (googleResponse) => {
        // handle successful login
        debugger
        console.log('Login success:', googleResponse)

        try {
            const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${googleResponse.access_token}`,
                },
            })
            setUserData(response.data)
        } catch (error) {
            console.error(error)
        }


        setAccessToken(googleResponse.code)
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
