import { apiClient } from "../services/api";
import type { User, ApiResponse } from "../types";

export const userAPI = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>("/users");
    return response.data.data || [];
  },

  // Get user by ID
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data!;
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/users/me");
    return response.data.data!;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(
      `/users/${id}`,
      data
    );
    return response.data.data!;
  },
};
