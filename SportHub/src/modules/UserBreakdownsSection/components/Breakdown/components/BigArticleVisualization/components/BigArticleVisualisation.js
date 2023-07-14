import styles from "../styles/style.module.scss"
import {ReactSVG} from "react-svg"

export default function BigArticleVisualisation({groupName, article}){

    const GetPhoto = () => {
        try{
            const s = require("../../../../../../../../public/images/" + article.image.imageId + ".png")
            const path = "/images/" + article.image.imageId + ".png"
            return(<img className={styles.image} src={path}/>)
        }
        catch(error){
            console.log(error)
            return(<img className={styles.image} src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"}/>)
        }
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