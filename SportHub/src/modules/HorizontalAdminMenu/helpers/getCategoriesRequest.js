import extendedAxios from "../../../extendedAxios"

const getCategoriesRequest = async () => {
    try {
        return await extendedAxios.get(`/Category/all`, {})
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getCategoriesRequest
