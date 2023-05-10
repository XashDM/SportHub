import styles from "../styles/style.module.scss"
import Button from "../../Button"

export default function BigCard({ idx, onClick, title, mainText, imageUrl, publishingDate, category }) {
    return (
        <div className={styles.container} onClick={onClick} data-idx={idx}>
            <span className={styles.category}>{category?.toUpperCase()}</span>
            <img
                src={imageUrl}
                alt="sport"
                className={styles.image}
            />
            <div className={styles.card}>
                <p className={styles.text_muted}>Published / {publishingDate}</p>
                <p className={styles.text_red}>{title}</p>
                <h3 className={styles.heading}>{mainText}</h3>

                <div className={styles.button_container}>
                    <Button
                        text={"More"}
                        onClick={() => console.log("Let's go to article page")}/>
                </div>
            </div>
        </div>
    )
}
