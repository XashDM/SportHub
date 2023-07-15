import axios from "axios"


const updateArticleRequest = async (articleForm) => {
    try {
        const backendHost = process.env.REACT_APP_BACKEND_HOST
        const response = await axios.put(`${backendHost}/Article`,
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
