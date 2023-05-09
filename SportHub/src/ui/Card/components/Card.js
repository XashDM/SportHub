import styles from "../styles/style.module.scss"

export default function Card({ idx, onClick, title, mainText, imageUrl }) {
    return (
        <div className={styles.card} onClick={onClick} data-idx={idx}>
            <img
                src={imageUrl}
                alt="sport"
                className={styles.image}
            />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.main_text}>{mainText}</p>
            <img className={styles.arrow} src={"/icons/Arrow.svg"} alt={"view"}/>
        </div>
    )
}
