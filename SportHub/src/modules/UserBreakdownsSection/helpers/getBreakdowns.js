import extendedAxios from "../../../extendedAxios"

const getBreakdowns = async (language, lastArticles, numberOfArticles) => {
    try {
        return await extendedAxios.get(`/BreakDown/GetArticles?language=${language}&lastArticles=${lastArticles}&numberOfArticles=${numberOfArticles}`)
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getBreakdowns
