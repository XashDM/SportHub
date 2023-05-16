import styles from "../styles/style.module.scss"

function HeaderContainer({children}){
    return(
        <div className={styles.container}>
            <div className={styles.logo}><span className={styles.logo_text}>Sport Hub</span></div>

               {children}

        </div>
    )
}

export default HeaderContainer;
