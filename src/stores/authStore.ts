import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authAPI } from "../apis/auth";
import {
  getStoredToken,
  getStoredUser,
  storeToken,
  storeUser,
  clearAuthData,
} from "../utils/auth";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  ApiError,
} from "../types";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
  updateProfile: (data: { name?: string; avatarUrl?: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, _get) => ({
      // Initial state
      user: getStoredUser(),
      isAuthenticated: !!getStoredToken(),
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authAPI.login(credentials);

          // Store token and user data
          storeToken(response.access_token);
          storeUser(response.user);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Login failed",
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Register action
      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authAPI.register(credentials);

          // Store token and user data
          storeToken(response.access_token);
          storeUser(response.user);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Registration failed",
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Logout action
      logout: () => {
        clearAuthData();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // Clear error action
      clearError: () => {
        set({ error: null });
      },

      // Check auth status (verify token is still valid)
      checkAuthStatus: async () => {
        const token = getStoredToken();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        try {
          set({ isLoading: true });
          const user = await authAPI.getCurrentUser();

          // Update stored user data
          storeUser(user);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (_error) {
          // Token is invalid, clear auth data
          clearAuthData();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Update profile action
      updateProfile: async (data: { name?: string; avatarUrl?: string }) => {
        set({ isLoading: true, error: null });

        try {
          const updatedUser = await authAPI.updateProfile(data);

          // Update stored user data
          storeUser(updatedUser);

          set({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Profile update failed",
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-store", // Name for devtools
    }
  )
);
