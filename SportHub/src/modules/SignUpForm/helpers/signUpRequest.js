import axios from "axios"

const signUpRequest = async (user) => {
    console.log(user)
    try {
        const response = await axios.post('https://localhost:7168/User',
            {...user, secondName: user.lastName})

        console.log(response.data)
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default signUpRequest
