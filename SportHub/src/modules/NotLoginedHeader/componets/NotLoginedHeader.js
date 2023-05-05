import styles from "../style/style.module.scss"
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
const NotLoginedHeader = () =>
{
    return(
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.logo}><span className={styles.logo_text}>Sport Hub</span></div>
                    <div className={styles.searchbar}>
                        <img className={styles.img_icon} src={process.env.PUBLIC_URL + '/icons/Magnifying-glass.svg'} ></img>
                        <Input className={styles.input} placeholder={"Search by"}></Input>
                    </div>
                    <div className={styles.media}>
                        <span className={styles.share}>Share</span>
                        <img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/Facebook2.svg'} ></img>
                        <img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/Twitter.svg'} ></img>
                        <img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/Google+.svg'}  ></img>
                    </div>
                    <div className={styles.auth}>
                        <button className={styles.btn_signup} value={"Sign up"}>Sign up</button>
                        <Button text={"Login"} isOutlined={true}></Button>
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
        </>);
}
export default NotLoginedHeader