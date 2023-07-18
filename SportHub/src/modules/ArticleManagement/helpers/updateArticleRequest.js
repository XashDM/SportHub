import extendedAxios from "../../../extendedAxios"

const updateArticleRequest = async (articleForm) => {
    try {
        const response = await extendedAxios.put(`/Article`,
        articleForm,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default updateArticleRequest
