import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import HeaderContainer from "../../../components/HeaderContainer"
import SelectLanguage from "../../SelectLanguage"

const UserHeader = ({username, userimg}) =>
{
    return (
        <HeaderContainer>
            <div className={styles.header}>
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
                    <img className={styles.profile_img} src={"/icons/UserPicture.png"}></img>
                    <span className={styles.user_name_text}>Ostap Luskevych</span>
                    <img className={styles.profile_img_icon} src={'/icons/Polygon.svg'}></img>
                </div>
                <div className={styles.languages}>
                    <SelectLanguage/>
                </div>
            </div>
        </HeaderContainer>
    )
}
export default UserHeader
