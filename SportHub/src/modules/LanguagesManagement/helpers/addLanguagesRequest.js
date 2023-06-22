import axios from "axios"


const addLanguagesRequest = async (languages) => {
    // need to map from LANGUAGE_CONSTANTS form to languageRequest (DTO)
    const languagesRequest = languages.map(language => ({
        shortTitle: language.code
    }))
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST

        const response = await axios.post(`${backendHost}/Language`,
            languagesRequest,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default addLanguagesRequest
