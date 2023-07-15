import axios from "axios"
const getUsersRequest = async () => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    try {
        const response = await axios.get(`${backendHost}/User/users`, {})
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}
export default getUsersRequest
