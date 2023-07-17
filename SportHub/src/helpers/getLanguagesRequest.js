import axios from "axios"


const getLanguagesRequest = async () => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST
        const response = await axios.get(`${backendHost}/Language`, {})
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLanguagesRequest
