import axios from "axios"
const googleLoginRequest = async (accessToken) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.post(`${backendHost}/GoogleAuthorization`,null, {
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
