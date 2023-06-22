import axios from "axios"


const editLanguageRequest = async (shortTitle, isActive) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST

        const response = await axios.put(`${backendHost}/Language/${shortTitle}`,
            isActive,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default editLanguageRequest
