import extendedAxios from "../../../extendedAxios"

const getLanguageRequest = async (shortTitle) => {
    try {
        const response = await extendedAxios.get(`/Language/${shortTitle}`, {})
        if (response.status === 204) {
            return null
        }
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLanguageRequest
