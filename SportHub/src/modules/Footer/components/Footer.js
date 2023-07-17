import styles from "../style/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useTranslation } from "react-i18next"
function Footer(){
    const {t, i18n} = useTranslation()
    return(
            <footer className={styles.footer}>
                <div className={styles.footer_div}>
                    <div className={styles.top_footer}>
                        <div className={styles.newsletter}>
                            <h1>{t('Footer.Newsletter')}</h1>
                            <ul>
                                <li>{t('Footer.SignUpAgitation')}</li>
                            </ul>
                            <div className={styles.input}>
                                <Input className={styles.search_bar} placeholder={t('Footer.EmailPlaceholder')}/>

                                <Button text={t('Footer.Subscribe')}/>
                            </div>
                        </div>
                        <div className={styles.contributors}>
                            <h1>{t('Footer.Contributions')}</h1>
                            <ul>
                                <li>{t('Footer.FeaturedWritersProgram')}</li>
                                <li>{t('Footer.FeaturedTeamWritersProgram')}</li>
                                <li>{t('Footer.InternshipProgram')}</li>
                            </ul>
                        </div>
                        <div className={styles.company_info}>
                            <h1>{t('Footer.CompanyInfo')}</h1>
                            <ul>
                                <li>{t('Footer.About')}</li>
                                <li>{t('Footer.News')}</li>
                                <li>{t('Footer.Advertising')}</li>
                                <li>{t('Footer.Events')}</li>
                                <li>{t('Footer.ContactUs')}</li>
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
    )
}
export default Footer
