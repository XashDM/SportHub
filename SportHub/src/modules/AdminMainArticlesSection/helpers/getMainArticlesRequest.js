import axios from "axios"

const getMainArticlesRequest = async (languageId) => {
    try {
        return await axios.get('https://localhost:7168/MainArticlesFullInfo/' + languageId)
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getMainArticlesRequest