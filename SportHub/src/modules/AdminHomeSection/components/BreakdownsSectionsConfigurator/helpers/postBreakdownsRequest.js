import axios from "axios"

const postBreakdownsRequest = async (languageId, breakdowns) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        return axios.post(`${backendHost}/BreakDown?languageId=` + languageId, JSON.stringify(breakdowns),
            {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return error.code
    }
}

export default postBreakdownsRequest
