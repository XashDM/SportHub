import axios from "axios"

const getMainArticlesRequest = async (languageId) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        return await axios.get(`${backendHost}/Article/MainArticlesDetails?languageId=${languageId}`)
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getMainArticlesRequest
