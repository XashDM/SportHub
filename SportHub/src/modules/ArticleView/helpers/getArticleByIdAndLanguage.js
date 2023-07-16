import axios from "axios"
const getArticleByIdAndLanguage = async (articleId, language) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.get( `${backendHost}/Article/?id=${articleId}&language=${language}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getArticleByIdAndLanguage
