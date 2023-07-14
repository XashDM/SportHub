import styles from "../styles/styles.module.scss"
import BigArticleVisualisation from "./BigArticleVisualization"
import SmallArticleVisualisation from "./SmallArticleVisualisation"
import {useEffect, useState} from "react"

export default function BreakDown({groupName, articles}){

    const [bigArticle, setBigArticle] = useState(null)
    const [smallArticles, setSmallArticles] = useState([])

    const SetArticles = (groupName, articles) => {
        console.log(articles)
        if(articles.length !== 0) {
            setBigArticle(<BigArticleVisualisation groupName={groupName} article={articles[0]}/>)
        }

        let newSmallArticles = []
        for(let articleCounter = 1; articleCounter < articles.length; articleCounter++){
            newSmallArticles.push(<SmallArticleVisualisation article={articles[articleCounter]} />)
        }
        setSmallArticles(newSmallArticles)
    }

    useEffect(() => {
        SetArticles(groupName, articles)
    }, [groupName, articles])

    return(<div>
        <div className={styles.content}>
            {bigArticle}
            <div className={styles.small_articles}>
                {smallArticles}
            </div>
        </div>
    </div>)
}