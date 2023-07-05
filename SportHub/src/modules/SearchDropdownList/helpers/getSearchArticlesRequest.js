import axios from "axios"

const getSearchArticlesRequest = async (language, findText, pageNumber, pageSize) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST
        const response = await axios.get(`${backendHost}/Article/GetPageOfSearchArticles?language=${language}&findText=${findText}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getSearchArticlesRequest
