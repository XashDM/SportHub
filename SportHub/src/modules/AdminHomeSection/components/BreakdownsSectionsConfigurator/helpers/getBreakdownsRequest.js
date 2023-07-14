import axios from "axios"

const getBreakdownsRequest = async (languageId) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        console.log(`${backendHost}/BreakDown/GetDetails?languageId=${languageId}`)
        return await axios.get(`${backendHost}/BreakDown/GetDetails?languageId=${languageId}`)
    } catch (error) {
        console.log(error)
        return error.code
    }
}

export default getBreakdownsRequest
