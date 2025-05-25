import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { userAPI } from "../apis/users";
import type { User, ApiError } from "../types";

interface UserState {
  // State
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  getUser: (id: string) => Promise<User>;
  updateUser: (id: string, data: Partial<User>) => Promise<User>;
  selectUser: (user: User | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      // Initial state
      users: [],
      selectedUser: null,
      isLoading: false,
      error: null,

      // Fetch all users
      fetchUsers: async () => {
        set({ isLoading: true, error: null });

        try {
          const users = await userAPI.getUsers();
          set({
            users,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to fetch users",
          });
          throw error;
        }
      },

      // Get single user
      getUser: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await userAPI.getUser(id);
          set({
            selectedUser: user,
            isLoading: false,
            error: null,
          });
          return user;
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to fetch user",
          });
          throw error;
        }
      },

      // Update user
      updateUser: async (id: string, data: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
          const updatedUser = await userAPI.updateUser(id, data);

          set((state) => ({
            users: state.users.map((user) =>
              user.id === id ? updatedUser : user
            ),
            selectedUser:
              state.selectedUser?.id === id ? updatedUser : state.selectedUser,
            isLoading: false,
            error: null,
          }));

          return updatedUser;
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to update user",
          });
          throw error;
        }
      },

      // Select user
      selectUser: (user: User | null) => {
        set({ selectedUser: user });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "user-store",
    }
  )
);
