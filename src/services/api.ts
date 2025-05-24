import axios from "axios";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "../constants";
import type { ApiResponse } from "../types";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors by clearing auth and redirecting to login
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      // Don't redirect here to avoid circular dependencies
      // Let the auth store handle this
    }

    // Extract error message from response
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";

    return Promise.reject({
      message: errorMessage,
      statusCode: error.response?.status || 500,
      error: error.response?.data?.error,
      timestamp: error.response?.data?.timestamp,
      path: error.response?.data?.path,
    });
  }
);

// Generic API request function
export async function apiRequest<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  params?: any
): Promise<T> {
  const response = await apiClient.request<ApiResponse<T>>({
    method,
    url,
    data,
    params,
  });

  // For successful responses, return the data directly
  if (response.data.success !== false) {
    return (response.data.data || response.data) as T;
  }

  // If the response indicates failure, throw an error
  throw {
    message: response.data.message || "Request failed",
    statusCode: response.status,
    error: response.data.error,
    timestamp: response.data.timestamp,
    path: response.data.path,
  };
}
