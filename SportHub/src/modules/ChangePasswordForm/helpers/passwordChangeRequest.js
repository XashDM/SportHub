import axios from "axios"
import hashPassword from "../../../helpers/hashPassword"
const passwordChangeRequest = async (token, password) => {
    try {
        const response = await axios.get(
            `https://localhost:7168/Auth/changePassword?token=${token}&password=${hashPassword(password)}`)

        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default passwordChangeRequest
