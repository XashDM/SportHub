import extendedAxios from "../../../extendedAxios"

const mainArticlesRequest = async (language) => {
    try {
        const response = await extendedAxios.get(`/Article/MainArticles?language=${language}`)

        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default mainArticlesRequest
