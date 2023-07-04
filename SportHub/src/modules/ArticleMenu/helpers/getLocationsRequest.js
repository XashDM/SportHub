import axios from "axios"


const getLocationsRequest = async () => {
    try {
        const response = await axios.get(`https://localhost:7168/Location/all`)
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLocationsRequest
