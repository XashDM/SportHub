import extendedAxios from "../../../extendedAxios"

const getPageOfArticlesRequest = async (language, categoryId, pageNumber) => {
    try {
        const response = await extendedAxios.get(
            `/Article/GetPageOfArticlesByCategory?categoryId=${categoryId}&language=${language}&pageNumber=${pageNumber}`)

        console.log(response)
        return response.data
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getPageOfArticlesRequest
