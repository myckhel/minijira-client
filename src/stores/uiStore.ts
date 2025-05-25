import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UiState {
  // Sidebar state
  sidebarCollapsed: boolean;

  // Modal states
  taskModalOpen: boolean;
  projectModalOpen: boolean;

  // Loading states
  pageLoading: boolean;

  // Notification states
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    description?: string;
  }>;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Modal actions
  openTaskModal: () => void;
  closeTaskModal: () => void;
  openProjectModal: () => void;
  closeProjectModal: () => void;

  // Loading actions
  setPageLoading: (loading: boolean) => void;

  // Notification actions
  addNotification: (
    notification: Omit<UiState["notifications"][0], "id">
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    (set) => ({
      // Initial state
      sidebarCollapsed: false,
      taskModalOpen: false,
      projectModalOpen: false,
      pageLoading: false,
      notifications: [],

      // Sidebar actions
      toggleSidebar: () => {
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        }));
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },

      // Modal actions
      openTaskModal: () => {
        set({ taskModalOpen: true });
      },

      closeTaskModal: () => {
        set({ taskModalOpen: false });
      },

      openProjectModal: () => {
        set({ projectModalOpen: true });
      },

      closeProjectModal: () => {
        set({ projectModalOpen: false });
      },

      // Loading actions
      setPageLoading: (loading: boolean) => {
        set({ pageLoading: loading });
      },

      // Notification actions
      addNotification: (notification) => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id }],
        }));
      },

      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: "ui-store", // Name for devtools
    }
  )
);
