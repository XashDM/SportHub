import axios from "axios"

const getCategoriesRequest = async () => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        const response = await axios.get(`${backendHost}/Category/all`)
        return response.data
    } catch (error) {
        return error.code
    }
}

export default getCategoriesRequest
