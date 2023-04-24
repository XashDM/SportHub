import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import {ROUTES} from "../../../routes/routes"
import EmailSentContainer from "../../../components/EmailSentContainer"
import passwordResetRequest from "../helpers/passwordResetRequest"


function ForgotPasswordForm(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const navigate = useNavigate()
    const handleRequestPasswordButton = async (event) => {
        event.preventDefault()
        const result = await passwordResetRequest(email)

        if(result.status === 200){
            setIsSent(true)
        }else{
            setError(true)
        }
    }


    return(

        !isSent ?
            <div className={styles.container}>
                <div>
                    <h2 className={styles.heading}>Forgot your password?</h2>
                    {error && <h3 className={styles.error}>Something went wrong. Try again later</h3>}
                </div>

                <p className={styles.text_muted}>Enter your email address below and we'll get you back on track.</p>

                <Input label={"EMAIL ADRESS"}
                placeholder={"Email@gmail.com"}
                error={error}
                onChange={(event) => setEmail(event.target.value)}/>

                <Button onClick={handleRequestPasswordButton} text={"REQUEST RESET LINK"}/>
                <button className={styles.bottom_link} onClick={() => navigate(ROUTES.LOGIN)}>Back to Log In</button>
            </div>
     :
            <EmailSentContainer
                heading={`Check your email ${email}`}
                sub_heading={"If there's Sports Hub account linked to this email address, we'll send over instructions to reset your password."}/>
    )
}

export default ForgotPasswordForm
