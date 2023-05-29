import styles from "../styles/style.module.scss"

function AddButton({onClick, text}){
    return(
        <button className={styles.add_button}>
            {text}
        </button>
    )
}

export default AddButton