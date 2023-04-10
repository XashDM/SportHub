import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import loginRequest from "../helpers/loginRequest"
function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async (event) => {
        event.preventDefault()

        const result = await loginRequest(email, password)

        if (result === "ERR_BAD_REQUEST") {
           setError(true)
        }else{
            setError(false)
            navigate("/")
        }
    }

    return(
        <div className={styles.container}>

            <div>
                <h2>Log in to Sports Hub</h2>
                {error && <h3 className={styles.error}>Incorrect user email or password. Try again</h3>}
            </div>

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

export default LoginForm;
