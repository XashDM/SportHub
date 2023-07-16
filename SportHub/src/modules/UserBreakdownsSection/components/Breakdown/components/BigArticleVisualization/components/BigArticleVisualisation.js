import styles from "../styles/style.module.scss"
import {ReactSVG} from "react-svg"

export default function BigArticleVisualisation({groupName, article}){

    const GetPhoto = () => {
        return(<img className={styles.image} src={article.image.url}/>)
    }

    return(<div>
        <div className={styles.content}>
            <div className={styles.group_name}>{groupName}</div>
            {GetPhoto()}
            <div className={styles.down_text}>{article.title}</div>
            <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'} className={styles.arrow} />
        </div>
    </div>)
}