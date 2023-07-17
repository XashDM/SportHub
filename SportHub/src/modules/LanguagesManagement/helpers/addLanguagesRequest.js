import extendedAxios from "../../../extendedAxios"

const addLanguagesRequest = async (languages) => {
    // need to map from LANGUAGE_CONSTANTS form to languageRequest (DTO)
    const languagesRequest = languages.map(language => ({
        shortTitle: language.code
    }))
    try {
        const response = await extendedAxios.post(`/Language`,
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
