import extendedAxios from "../../../extendedAxios"

const getTeamsRequest = async (subcategoryId) => {
    try {
        const response = await extendedAxios.get(`/Teams/subcategory/${subcategoryId}`, {})
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getTeamsRequest
