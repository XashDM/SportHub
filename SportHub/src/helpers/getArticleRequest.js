import axios from "axios"


const getArticleRequest = async (articleId) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST
        const response = await axios.get(`${backendHost}/Article/${articleId}`)
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getArticleRequest
