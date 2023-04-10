import axios from "axios"

const loginRequest = async (email, password) => {
    try {
        const response = await axios.post('https://localhost:7168/Auth/login',null, {
            params: {
                email: email,
                password: password
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
