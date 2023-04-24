import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import {ROUTES} from "../../../routes/routes"
import passwordChangeRequest from "../helpers/passwordChangeRequest"
import { useParams } from "react-router-dom"


function ChangePasswordForm(){
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
                setErrorText("Something went wrong. Please try again later.")
                setError(true)
            }
        }else{
            setError(true)
            setErrorText("Passwords doesn't match")
        }
    }


    return(
            <div className={styles.container}>
                <div>
                    <h2 className={styles.heading}>Please enter your new password.</h2>
                    {error && <h3 className={styles.error}>{errorText}</h3>}
                </div>

                <Input label={"NEW PASSWORD"}
                    placeholder={"new password"}
                    error={error}
                    onChange={(event) => setPassword(event.target.value)}/>

                <Input label={"CONFIRM PASSWORD"}
                   placeholder={"confirm password"}
                   error={error}
                   onChange={(event) => setConfirmPassword(event.target.value)}/>

                <Button onClick={handleRequestPasswordButton} text={"SET NEW PASSWORD"}/>
                <button className={styles.bottom_link} onClick={() => navigate(ROUTES.LOGIN)}>Back to Log In</button>
            </div>
    )
}

export default ChangePasswordForm
