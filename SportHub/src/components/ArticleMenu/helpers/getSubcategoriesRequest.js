import extendedAxios from "../../../extendedAxios"

const getSubcategoriesRequest = async (categoryId) => {
    try {
        const response = await extendedAxios.get(`/SubCategory/category/${categoryId}`, {})
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
