import hashPassword from "../../../helpers/hashPassword"
import extendedAxios from "../../../extendedAxios"

const signUpRequest = async (user) => {
    try {
        const response = await extendedAxios.post(`/Auth/register`,
            {...user, password: hashPassword(user.password)})

        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export default signUpRequest
