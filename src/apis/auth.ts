import { apiRequest } from "../services/api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types";

// Use mock API for development/testing

class AuthAPI {
  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>("POST", "/auth/register", credentials);
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>("POST", "/auth/login", credentials);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    return apiRequest<User>("GET", "/users/me");
  }

  /**
   * Update user profile
   */
  async updateProfile(data: {
    name?: string;
    avatarUrl?: string;
  }): Promise<User> {
    return apiRequest<User>("PATCH", "/users/profile", data);
  }
}

export const authAPI = new AuthAPI();
