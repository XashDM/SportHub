import axios from "axios"
const passwordResetRequest = async (email) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        return await axios.get(`${backendHost}/Auth/requestResetPassword/${email}`)
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default passwordResetRequest
