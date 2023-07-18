import styles from "../styles/style.module.scss"
import {ReactSVG} from "react-svg"
import {ROUTES} from "../../../../../../../routes/routes"
import {useNavigate} from "react-router-dom"

export default function BigArticleVisualisation({groupName, article}){

    const navigate = useNavigate()

    const GetPhoto = () => {
        return(<img className={styles.image} src={article.image.url}/>)
    }

    return(<div>
        <div className={styles.content} onClick={() => {navigate(ROUTES.ARTICLE.replace(':articleId', article.articleId))}}>
            <div className={styles.group_name}>{groupName}</div>
            {GetPhoto()}
            <div className={styles.down_text}>{article.title}</div>
            <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'} className={styles.arrow} />
        </div>
    </div>)
}