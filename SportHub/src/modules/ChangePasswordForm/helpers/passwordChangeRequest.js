import axios from "axios"
import hashPassword from "../../../helpers/hashPassword"
const passwordChangeRequest = async (token, password) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.get(
            `${backendHost}/Auth/changePassword?token=${token}&password=${hashPassword(password)}`)

        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default passwordChangeRequest
