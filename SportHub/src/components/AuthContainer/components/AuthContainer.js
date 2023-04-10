import styles from "../styles/style.module.scss"
import Button from "../../../ui/Button"
import {useNavigate} from "react-router-dom"

function AuthContainer({isLogIn, children}){
    const navigate = useNavigate()

    function handleLogToSign(e){
        e.stopPropagation()
        navigate("/sign-up")
    }

    function handleSignToLog(e){
        e.stopPropagation()
        navigate("/log-in")
    }
    return(
        <div className={styles.container}>
           <div className={styles.img_container} style={isLogIn ? {} : {filter: "brightness(70%)"}}>
               <div className={styles.logo}>Sport Hub</div>
           </div>
           <div className={styles.form_container}>
               <div className={styles.controls_container}>
                   <p>{isLogIn ? "Don't have an account?" : "Already have an account?"}</p>
                   <Button isOutlined={true} text={isLogIn ? "Get started" : "Log in"}
                           onClick={ isLogIn ? handleLogToSign : handleSignToLog}/>
               </div>

               {children}

           </div>
        </div>
    )
}

export default AuthContainer;
