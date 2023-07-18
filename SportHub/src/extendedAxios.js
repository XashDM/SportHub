import axios from 'axios'

const extendedAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST,
})

const refreshTokenRequest = async () => {
    try {
        const refreshResponse = await extendedAxios.post('/Auth/refresh',{}, {
            withCredentials: true
        })
        localStorage.setItem('accessToken', refreshResponse.data.access_token)
    } catch (error) {
        throw error
    }
}

function setAccessTokenToConfig(config){
    const accessToken = localStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ${accessToken}`
    console.log(config)

    return config
}

extendedAxios.interceptors.request.use(
    (config) => {
        return setAccessTokenToConfig(config)
    },
    (error) => {
        return Promise.reject(error)
    }
)

extendedAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401 && error.config.url !== "/Auth/refresh") {
            try {
                await refreshTokenRequest()
                return extendedAxios(error.config)
            } catch (refreshError) {
               console.log("Refresh token expired. Please log-in again")
            }
        }
        return Promise.reject(error)
    }
)
export default extendedAxios
