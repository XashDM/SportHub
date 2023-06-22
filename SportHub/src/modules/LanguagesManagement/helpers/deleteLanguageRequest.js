import axios from "axios"


const deleteLanguageRequest = async (shortTitle) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST

        const response = await axios.delete(`${backendHost}/Language/${shortTitle}`, {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default deleteLanguageRequest
