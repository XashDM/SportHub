import axios from "axios"


const mainArticlesRequest = async (language) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.get(`${backendHost}/Article/MainArticles?language=${language}`)

        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default mainArticlesRequest
