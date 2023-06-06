import axios from "axios"


const newArticleRequest = async (article) => {
    try {
        const response = await axios.post('https://localhost:7168/Article',
            article,
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

export default newArticleRequest
