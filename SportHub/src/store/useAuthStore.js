import {create} from 'zustand'
import useLocalStorage from 'react-use-localstorage'

const authStore = create((set) => ({
    userData: null,
    accessToken: '',
    setUserData: (userData) => set(() => ({ userData })),
    setAccessToken: (accessToken) => set(() => ({ accessToken })),
}))

export const useAuthStore = () => {
    const [storedUserData, setStoredUserData] = useLocalStorage('userData', null)
    const [storedAccessToken, setStoredAccessToken] = useLocalStorage(
        'accessToken',
        ''
    )

    return authStore((state) => ({
        userData: JSON.parse(storedUserData) || state.userData,
        accessToken: storedAccessToken || state.accessToken,
        setUserData: (userData) => {
            if(userData !== undefined){
                setStoredUserData(JSON.stringify(userData))
                state.setUserData(userData)
            }
        },
        setAccessToken: (accessToken) => {
            if(accessToken !== undefined){
                setStoredAccessToken(accessToken)
                state.setAccessToken(accessToken)
            }
        },
    }))
}
