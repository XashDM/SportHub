import axios from "axios"
const getUsersRequest = async () => {
    try {
        const response = await axios.get("https://localhost:7168/User/users", {})
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}
export default getUsersRequest
