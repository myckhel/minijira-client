import { apiRequest } from "../services/api";
import { mockAuthAPI } from "../mocks/auth";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types";

// Use mock API for development/testing
const USE_MOCK_API = true;

class AuthAPI {
  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      return mockAuthAPI.register(credentials);
    }
    return apiRequest<AuthResponse>("POST", "/auth/register", credentials);
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      return mockAuthAPI.login(credentials);
    }
    return apiRequest<AuthResponse>("POST", "/auth/login", credentials);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    if (USE_MOCK_API) {
      return mockAuthAPI.getCurrentUser();
    }
    return apiRequest<User>("GET", "/users/profile");
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
