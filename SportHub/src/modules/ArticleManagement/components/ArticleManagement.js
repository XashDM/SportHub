import { useEffect, useState } from "react"
import ArticleMenu from "../../../components/ArticleMenu"

import getArticleRequest from "../helpers/getArticleRequest"
import updateArticleRequest from "../helpers/updateArticleRequest"
import newArticleRequest from "../helpers/newArticleRequest"

export default function ArticleManagement({ articleId=null }){
    const [articleMenu, setArticleMenu] = useState(null)

    useEffect(() => {
         getArticle()
    }, [])

    const getArticle = async () => {
        if(articleId !== null){
            const result = await getArticleRequest(articleId)
            setArticleMenu(<ArticleMenu article={result.data.article} image={result.data.image} request={updateArticleRequest}/>)
        }
        else{
            setArticleMenu(<ArticleMenu request={newArticleRequest}/>)
        }
    }
    return (
        <div>{articleMenu}</div>
        
    )
}
