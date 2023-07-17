import extendedAxios from "../extendedAxios"

const getLanguagesRequest = async () => {
    try {
        const response = await extendedAxios.get('/Language')
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default getLanguagesRequest
