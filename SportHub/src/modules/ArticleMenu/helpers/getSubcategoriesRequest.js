import axios from "axios"


const getSubcategoriesRequest = async (categoryId) => {
    try {
        const response = await axios.get(`https://localhost:7168/SubCategory/category/${categoryId}`, {})
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getSubcategoriesRequest
