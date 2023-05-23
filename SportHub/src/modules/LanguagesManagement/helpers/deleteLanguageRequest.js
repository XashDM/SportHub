import axios from "axios"


const deleteLanguageRequest = async (shortTitle) => {
    try {
        const response = await axios.delete(`https://localhost:7168/Language/${shortTitle}`, {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default deleteLanguageRequest
