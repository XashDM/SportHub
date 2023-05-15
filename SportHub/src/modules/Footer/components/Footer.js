import styles from "../style/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
function Footer(){
    return(
        <>
            <div>
            <footer className={styles.footer}>
                <div className={styles.footer_div}>
                    <div className={styles.top_footer}>
                        <div className={styles.newsletter}>
                            <h1>NEWSLETTER</h1>
                            <ul>
                                <li>Sign up to recive the latest sports news</li>
                            </ul>
                            <div className={styles.input}>
                                <Input className={styles.search_bar} placeholder={"Your email address"}/>

                                <Button text={"Subscribe"}/>
                            </div>
                        </div>
                        <div className={styles.contributors}>
                            <h1>CONTRIBUTIONS</h1>
                            <ul>
                                <li>Featured Writers Program</li>
                                <li>Featured Team Writers Program</li>
                                <li>Internship Program</li>
                            </ul>
                        </div>
                        <div className={styles.company_info}>
                            <h1>COMPANY INFO</h1>
                            <ul>
                                <li>About Sports Hub</li>
                                <li>News / In the Press</li>
                                <li>Advertising / Sports Blogger Ad Network</li>
                                <li>Events</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>

                    </div>
                    <div className={styles.bottom_footer}>
                        <div className={styles.logo}>
                            <span>Sport Hub</span>
                        </div>
                        <div className={styles.copyright}>
                            <ul>
                                <li><span>Copyright &copy;2019 Sport Hub</span></li>
                                <li><span>Privacy / Terms</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </>
    );
}
export default Footer;