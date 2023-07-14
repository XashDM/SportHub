import axios from "axios"

const getBreakdowns = async (languageId, lastArticles, numberOfArticles) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        return await axios.get(`${backendHost}/BreakDown/GetArticles?languageId=${languageId}&lastArticles=${lastArticles}&numberOfArticles=${numberOfArticles}`)
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getBreakdowns
