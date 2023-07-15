import axios from "axios"

const getCategoriesRequest = async () => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        return await axios.get(`${backendHost}/Category/all`, {})
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getCategoriesRequest
