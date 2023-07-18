import hashPassword from "../../../helpers/hashPassword"
import extendedAxios from "../../../extendedAxios"

const passwordChangeRequest = async (token, password) => {
    try {
        const response = await extendedAxios.get(
            `/Auth/changePassword?token=${token}&password=${hashPassword(password)}`)

        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default passwordChangeRequest
