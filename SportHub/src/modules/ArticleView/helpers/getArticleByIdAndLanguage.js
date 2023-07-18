import extendedAxios from "../../../extendedAxios"

const getArticleByIdAndLanguage = async (articleId, language) => {
    try {
        const response = await extendedAxios.get( `/Article/?id=${articleId}&language=${language}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getArticleByIdAndLanguage
