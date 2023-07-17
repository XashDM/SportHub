import hashPassword from "../../../helpers/hashPassword"
import extendedAxios from "../../../extendedAxios"
const loginRequest = async (email, password) => {
    try {
        const response = await extendedAxios.post(`/Auth/login`,null, {
            params: {
                email: email,
                password: hashPassword(password)
            }
        })

        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export default loginRequest
