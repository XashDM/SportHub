import extendedAxios from "../../../../../extendedAxios"

const postBreakdownsRequest = async (languageId, breakdowns) => {
    try {
        return extendedAxios.post(`/BreakDown?languageId=` + languageId, JSON.stringify(breakdowns),
            {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return error.code
    }
}

export default postBreakdownsRequest
