import extendedAxios from "../../../extendedAxios"

const getLocationsRequest = async () => {
    try {
        const response = await extendedAxios.get(`/Location/all`)
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLocationsRequest
