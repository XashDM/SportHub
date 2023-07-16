import axios from "axios"

const getNumberOfArticlesRequest = async (language, findText) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST
        const response = await axios.get(`${backendHost}/Article/GetNumberOfSearchArticles?language=${language}&findText=${findText}`, {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getNumberOfArticlesRequest
