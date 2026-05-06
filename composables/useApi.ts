import axios, { type AxiosInstance } from 'axios'

let apiInstance: AxiosInstance | null = null

export const useApi = () => {
  if (apiInstance) return apiInstance

  apiInstance = axios.create({
    baseURL: '/',
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  apiInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  return apiInstance
}
