import styles from "../styles/styles.module.scss"
import {ReactSVG} from "react-svg"

export default function SmallArticleVisualisation({article}){

    return(<div>
        <div className={styles.content}>
            <img className={styles.image} src={article.image.url} />
            <div className={styles.text}>
                <div className={styles.main_text}>{article.title}</div>
                <div className={styles.sub_text}>{article.mainText}</div>
                <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'} className={styles.arrow} />
            </div>
        </div>
    </div>)
}