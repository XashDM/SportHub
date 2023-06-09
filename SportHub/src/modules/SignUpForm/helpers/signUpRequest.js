import axios from "axios"
import hashPassword from "../../../helpers/hashPassword"


const signUpRequest = async (user) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.post(`${backendHost}/Auth/register`,
            {...user, password: hashPassword(user.password)})

        console.log(response.data)
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default signUpRequest
