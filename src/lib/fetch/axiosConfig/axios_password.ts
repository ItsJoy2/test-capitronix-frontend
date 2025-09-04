import { handleLogout } from "@/lib/logout/logout";
import axios, { type AxiosResponse, type AxiosError } from "axios";
import Cookies from "js-cookie";

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string | undefined;
}

// Extended error response type that includes the errors field
export interface ApiErrorResponse extends ApiResponse {
  errors?: Record<string, string[]>;
}

const axios_password = axios.create({
  baseURL: "https://admin.capitronix.com/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to headers
axios_password.interceptors.request.use((config) => {
  const token = Cookies.get("cpnx_t");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axios_password.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const transformedResponse = {
      ...response,
      data: {
        data: response.data,
        status: response.status,
        success: response.data.success,
      },
    };
    return transformedResponse;
  },
  (error: AxiosError<ApiResponse>) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      handleLogout();
    }

    // Use proper typing instead of any
    const errorData = error.response?.data as ApiErrorResponse | undefined;
    let dynamicMessage: string | undefined;

    if (errorData?.errors && typeof errorData.errors === "object") {
      const firstKey = Object.keys(errorData.errors)[0];
      const firstMessage = errorData.errors[firstKey]?.[0];
      dynamicMessage = firstMessage;
    }

    const responseObject: IGenericErrorResponse = {
      statusCode: error.response?.status || 500,
      message: errorData?.message || dynamicMessage || "Something went wrong",
      success: errorData?.success?.toString(),
    };

    return Promise.reject(responseObject);
  }
);

export default axios_password;
