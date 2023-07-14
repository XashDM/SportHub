import styles from "../styles/styles.module.scss"
import {ReactSVG} from "react-svg"

export default function SmallArticleVisualisation({article}){

    return(<div>
        <div className={styles.content}>
            <img className={styles.image} src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"} />
            <div className={styles.text}>
                <div className={styles.main_text}>{article.title}</div>
                <div className={styles.sub_text}>{article.mainText}</div>
                <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'} className={styles.arrow} />
            </div>
        </div>
    </div>)
}