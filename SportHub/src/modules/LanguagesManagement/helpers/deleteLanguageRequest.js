import extendedAxios from "../../../extendedAxios"

const deleteLanguageRequest = async (shortTitle) => {
    try {
        const response = await extendedAxios.delete(`/Language/${shortTitle}`, {})
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default deleteLanguageRequest
