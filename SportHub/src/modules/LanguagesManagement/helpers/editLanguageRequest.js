import axios from "axios"


const editLanguageRequest = async (shortTitle, isActive) => {
    try {
        const response = await axios.put(`https://localhost:7168/Language/${shortTitle}`,
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
