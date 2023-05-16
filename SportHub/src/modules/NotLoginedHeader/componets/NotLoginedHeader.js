import styles from "../style/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import {useNavigate} from "react-router-dom"
const NotLoginedHeader = () =>
{
    const navigate = useNavigate()
    const onClickLoginHandler = () => navigate(`/log-in`)
    const onClickSignUpHandler = () => navigate("/sign-up")
    return(
        <>
            <div>
                <header className={styles.header}>
                    <div className={styles.logo}><span className={styles.logo_text}>Sports Hub</span></div>
                    <div className={styles.searchbar}>
                        <img className={styles.img_icon} src={'/icons/Magnifying-glass.svg'} ></img>
                        <Input className={styles.input} placeholder={"Search by"}></Input>
                    </div>
                    <div className={styles.media}>
                        <span className={styles.share}>Share</span>
                        <img className={styles.icons} src={'/icons/FacebookWithoutCircle.svg'} ></img>
                        <img className={styles.icons} src={'/icons/Twitter.svg'} ></img>
                        <img className={styles.icons} src={'/icons/Google+.svg'}  ></img>
                    </div>
                    <div className={styles.auth}>
                        <button className={styles.btn_signup} onClick={onClickSignUpHandler} value={"Sign up"}>Sign up</button>
                        <Button text={"Login"} onClick={onClickLoginHandler} isOutlined={true}></Button>
                    </div>
                    <div className={styles.languages}>
                        <select className={styles.slect}>
                            <option>EN</option>
                            <option>UA</option>
                            <option>PL</option>
                        </select>
                    </div>
                </header>
            </div>
        </>)
}
export default NotLoginedHeader
