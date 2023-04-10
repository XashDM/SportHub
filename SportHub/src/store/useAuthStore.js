import {create} from 'zustand'

export const useAuthStore = create((set) => ({
    userData: {},
    accessToken: '',
    setUserData: (userData) => set({ userData }),
    setAccessToken: (accessToken) => set({ accessToken }),
}))
