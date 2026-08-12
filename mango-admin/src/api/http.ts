// src/services/http.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export function createHttpClient(baseURL: string, config?: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create({
        baseURL,
        withCredentials: true, // esențial pentru cookie-session
        headers: {
            'Content-Type': 'application/json',
        },
        ...config,
    })

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // sesiune expirată/invalidă -> redirect la login
                window.location.href = '/login'
            }
            return Promise.reject(error)
        },
    )

    return instance
}



export const api = createHttpClient(import.meta.env.VITE_API_URL)