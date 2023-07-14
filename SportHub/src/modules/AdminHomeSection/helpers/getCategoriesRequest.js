import axios from "axios"

const getCategoriesRequest = async () => {

    try {
        const response = await axios.get(`https://localhost:7168/Category/all`)
        return response.data
    } catch (error) {
        return error.code
    }
}

export default getCategoriesRequest
