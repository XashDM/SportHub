import axios from "axios"


const getLanguageRequest = async (shortTitle) => {
    try {
        const response = await axios.get(`https://localhost:7168/Language/${shortTitle}`, {})
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLanguageRequest
