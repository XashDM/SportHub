import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useState} from "react"

import signUpRequest from "../helpers/signUpRequest"
function SignUpForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState(false)
    const handleSignUp = async (event) => {
        event.preventDefault()

        const result = await signUpRequest({email, password, firstName, lastName})

        if (result === "ERR_BAD_REQUEST") {
           setError(true)
        }else{
            setError(false)
        }
    }

    const handleSignUpSuccess = (response) => {
        // handle successful sign up
        console.log('Sign up success:', response)
    }

    const handleSignUpFailure = (response) => {
        // handle sign up failure
        console.log('Sign up failure:', response)
    }

    return(
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
                   error={error} isVisible={false}
                   onClick={() => console.log("Forgot password clicked!")}
                   onChange={(event) => setPassword(event.target.value)}
            />

            <Button onClick={handleSignUp} text={"SIGN UP"}/>

        </div>
    )
}

export default SignUpForm;
