import { Link } from "react-router-dom";
import styles from "../styles/style.module.scss"

function HeaderContainer({children}){
    return(
        <div className={styles.container}>
            <Link to="/" className={styles.logo}>
                <span className={styles.logo_text}>Sport Hub</span>
            </Link>

               {children}

        </div>
    )
}

export default HeaderContainer;
