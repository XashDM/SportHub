import extendedAxios from "../../../extendedAxios"

const getCategoriesRequest = async () => {
    try {
        const response = await extendedAxios.get(`/Category/all`)
        return response.data
    } catch (error) {
        return error.code
    }
}

export default getCategoriesRequest
