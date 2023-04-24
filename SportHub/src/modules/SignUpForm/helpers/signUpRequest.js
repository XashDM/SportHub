import axios from "axios"
import hashPassword from "../../../helpers/hashPassword"


const signUpRequest = async (user) => {
    try {
        const response = await axios.post('https://localhost:7168/Auth/register',
            {...user, password: hashPassword(user.password)})

        console.log(response.data)
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default signUpRequest
