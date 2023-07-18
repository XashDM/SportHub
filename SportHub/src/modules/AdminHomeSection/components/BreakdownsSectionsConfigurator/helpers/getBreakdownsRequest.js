import extendedAxios from "../../../../../extendedAxios"

const getBreakdownsRequest = async (languageId) => {
    try {
        return await extendedAxios.get(`/BreakDown/GetDetails?languageId=${languageId}`)
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getBreakdownsRequest
