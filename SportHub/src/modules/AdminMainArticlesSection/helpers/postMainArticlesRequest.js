import axios from "axios"

const postMainArticlesRequest = async (mainArticles) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        return axios.post(`${backendHost}/Article/MainArticles`, JSON.stringify(mainArticles),
            {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return error.code
    }
}

export default postMainArticlesRequest
