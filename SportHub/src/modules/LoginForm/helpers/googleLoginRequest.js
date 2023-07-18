import extendedAxios from "../../../extendedAxios"

const googleLoginRequest = async (accessToken) => {
    try {
        const response = await extendedAxios.post(`/GoogleAuthorization`,null, {
            params: {
                accessToken
            }
        })

        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default googleLoginRequest
