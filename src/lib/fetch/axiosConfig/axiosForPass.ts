import axios, { type AxiosResponse, type AxiosError } from "axios"
import Cookies from "js-cookie"

export type IGenericErrorResponse = {
  statusCode?: number
  message?: string
  success?: string
  errorMessages?: IGenericErrorMessage[]
}

export type IGenericErrorMessage = {
  path: string | number
  message: string
}

// Define the expected API response structure
export interface ApiResponse<T = unknown> {
  data: T
  success: string | undefined
  message?: string
}

// Remove this interface as it's no longer needed
// export interface CustomResponse<T = unknown> {
//   data: ApiResponse<T>
//   status: number
//   success: boolean
// }

const axiosInstance = axios.create({
  baseURL: `http://test.biznode.io/api/user`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("petroxcinToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Transform the response data but keep the AxiosResponse structure
    const transformedResponse = {
      ...response,
      data: {
        data: response.data,
        status: response.status,
        success: response.data.success,
      },
    }
    return transformedResponse
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.location.href = "/logout"
    }

    const responseObject: IGenericErrorResponse = {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || "Something went wrong",
      success: error.response?.data?.success,
    }

    return Promise.reject(responseObject)
  },
)

export default axiosInstance
