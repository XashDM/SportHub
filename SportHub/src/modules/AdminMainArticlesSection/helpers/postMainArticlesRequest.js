import axios from "axios"

const postMainArticlesRequest = async (mainArticles) => {
    try {
        return axios.post("https://localhost:7168/Article/MainArticles", JSON.stringify(mainArticles),
            {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return error.code
    }
}

export default postMainArticlesRequest