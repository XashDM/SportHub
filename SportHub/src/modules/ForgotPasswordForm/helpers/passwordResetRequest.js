import extendedAxios from "../../../extendedAxios"

const passwordResetRequest = async (email) => {
    try {
        return await extendedAxios.get(`/Auth/requestResetPassword/${email}`)
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default passwordResetRequest
