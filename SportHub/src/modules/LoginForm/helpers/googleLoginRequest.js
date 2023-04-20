import axios from "axios"
const googleLoginRequest = async (accessToken) => {
    try {
        const response = await axios.post('https://localhost:7168/GoogleAuthorization',null, {
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
