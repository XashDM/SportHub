import axios from "axios"
const passwordResetRequest = async (email) => {
    try {
        return await axios.get(`https://localhost:7168/Auth/requestResetPassword/${email}`)
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default passwordResetRequest
