import extendedAxios from "../../../../../extendedAxios"

const getMainArticlesRequest = async (languageId) => {
    try {
        const result = await extendedAxios.get(`/Article/MainArticlesDetails?languageId=${languageId}`)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getMainArticlesRequest
