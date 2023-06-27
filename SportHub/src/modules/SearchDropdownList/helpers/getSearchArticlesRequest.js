import axios from "axios"

const getSearchArticlesRequest = async (language, findText, pageNumber, pageSize) => {
    try {
        const response = await axios.get(`https://localhost:7168/Article/GetPageOfSearchArticles?language=${language}&findText=${findText}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getSearchArticlesRequest
