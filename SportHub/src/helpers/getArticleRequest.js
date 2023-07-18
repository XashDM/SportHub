import extendedAxios from "../extendedAxios"

const getArticleRequest = async (articleId) => {
    try {
        const response = await extendedAxios.get(`/Article/${articleId}`)
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getArticleRequest
