import styles from "../styles/style.module.scss"
import { ROUTES } from "../../../routes/routes"
import { useNavigate } from "react-router-dom"

function HeaderContainer({ children }) {
    const navigate = useNavigate()

    const handleRedirectHome = async () => {
        navigate(ROUTES.HOME)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo} onClick={handleRedirectHome}>
                <span className={styles.logo_text}>Sport Hub</span>
            </div>
            {children}
        </div>
    )
}

export default HeaderContainer;
