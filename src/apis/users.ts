import { apiClient } from "../services/api";
import type { ApiResponse } from "../types";

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Get all users (admin only)
export const getUsers = async (): Promise<UserResponse[]> => {
  const response = await apiClient.get<ApiResponse<UserResponse[]>>("/users");
  return response.data.data || [];
};

// Get current user profile
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<ApiResponse<UserResponse>>("/users/me");
  return response.data.data!;
};

// Get user by ID
export const getUserById = async (id: string): Promise<UserResponse> => {
  const response = await apiClient.get<ApiResponse<UserResponse>>(
    `/users/${id}`
  );
  return response.data.data!;
};
