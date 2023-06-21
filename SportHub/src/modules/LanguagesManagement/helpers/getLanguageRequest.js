import axios from "axios"


const getLanguageRequest = async (shortTitle) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST

        const response = await axios.get(`${backendHost}/Language/${shortTitle}`, {})
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
