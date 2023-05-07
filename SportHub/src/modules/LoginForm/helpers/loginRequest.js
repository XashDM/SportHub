import axios from "axios"
import hashPassword from "../../../helpers/hashPassword"
const loginRequest = async (email, password) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.post(`${backendHost}/Auth/login`,null, {
            params: {
                email: email,
                password: hashPassword(password)
            }
        })

        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default loginRequest
