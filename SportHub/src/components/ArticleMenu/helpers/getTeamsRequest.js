import axios from "axios"


const getTeamsRequest = async (subcategoryId) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST
        const response = await axios.get(`${backendHost}/Teams/subcategory/${subcategoryId}`, {})
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getTeamsRequest
