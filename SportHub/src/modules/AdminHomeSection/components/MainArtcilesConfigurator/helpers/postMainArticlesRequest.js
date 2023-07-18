import extendedAxios from "../../../../../extendedAxios"

const postMainArticlesRequest = async (mainArticles) => {

    try {
        return extendedAxios.post(`/Article/MainArticle`, JSON.stringify(mainArticles),
            {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return error.code
    }
}

export default postMainArticlesRequest
