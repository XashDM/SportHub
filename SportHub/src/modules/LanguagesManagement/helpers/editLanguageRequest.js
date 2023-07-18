import extendedAxios from "../../../extendedAxios"

const editLanguageRequest = async (shortTitle, isActive) => {
    try {
        const response = await extendedAxios.put(`/Language/${shortTitle}`,
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
