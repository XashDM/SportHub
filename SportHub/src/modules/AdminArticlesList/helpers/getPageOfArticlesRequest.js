import axios from "axios"
const getPageOfArticlesRequest = async (language, categoryId, pageNumber) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.get(
            `${backendHost}/Article/GetPageOfArticlesByCategory?categoryId=${categoryId}&language=${language}&pageNumber=${pageNumber}`)

        console.log(response)
        return response.data
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getPageOfArticlesRequest
