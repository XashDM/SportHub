import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"

import signUpRequest from "../helpers/signUpRequest"
import EmailSentContainer from "../../../components/EmailSentContainer"
function SignUpForm(){
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
                    <h2>Create Account</h2>
                    {error && <h3 className={styles.error}>Your account already exist. Log in</h3>}
                </div>

                <div className={styles.two_col_container}>
                    <Input label={"First name"}
                           placeholder={"Oleh"}
                           error={error}
                           onChange={(event) => setFirstName(event.target.value)}/>

                    <Input label={"Last name"}
                           placeholder={"Doe"}
                           error={error}
                           onChange={(event) => setLastName(event.target.value)}/>
                </div>


                <Input label={"Email"}
                       placeholder={"JohnDoe@gmail.com"}
                       error={error}
                       onChange={(event) => setEmail(event.target.value)}/>

                <Input label={"Password"}
                       placeholder={"8 + characters (letters and numbers)"}
                       error={error}
                       onChange={(event) => setPassword(event.target.value)}
                />

                <Button onClick={handleSignUp} text={"SIGN UP"}/>

            </div>
            :
            <EmailSentContainer
                heading={`Check your email ${email}`}
                sub_heading={"You will receive a letter with activation link"}/>
    )
}

export default SignUpForm;
