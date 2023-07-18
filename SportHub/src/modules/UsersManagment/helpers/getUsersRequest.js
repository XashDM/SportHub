import extendedAxios from "../../../extendedAxios"

const getUsersRequest = async () => {
    try {
        const response = await extendedAxios.get(`/User/users`, {})
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}
export default getUsersRequest
