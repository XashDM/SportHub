import axios from "axios"


const getLanguagesRequest = async () => {
    try {
        const response = await axios.get('https://localhost:7168/Language', {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLanguagesRequest
