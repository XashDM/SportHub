import axios from "axios"


const getTeamsRequest = async (subcategoryId) => {
    try {
        const response = await axios.get(`https://localhost:7168/Teams/subcategory/${subcategoryId}`, {})
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
