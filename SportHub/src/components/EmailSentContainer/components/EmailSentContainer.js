import styles from "../styles/style.module.scss"

function EmailSentContainer({heading, sub_heading}){
    return(
        <div className={styles.container}>
            <img src="/icons/EmailSent.svg" alt="letter" className={styles.icon}/>
            <h2>{heading}</h2>
            <p className={styles.sub_heading}>{sub_heading}</p>
        </div>
    )
}

export default EmailSentContainer;
