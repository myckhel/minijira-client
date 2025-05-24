import { apiClient } from "../services/api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  ApiResponse,
} from "../types";

// Use mock API for development/testing

class AuthAPI {
  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", credentials);
    return response.data.data!;
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", credentials);
    return response.data.data!;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/users/me");
    return response.data.data!;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: {
    name?: string;
    avatarUrl?: string;
  }): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>("/users/profile", data);
    return response.data.data!;
  }
}

export const authAPI = new AuthAPI();
