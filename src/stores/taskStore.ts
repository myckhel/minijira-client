import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { taskAPI } from "../apis/tasks";
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskQueryParams,
  TaskStatus,
} from "../types";

interface TaskState {
  // State
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  filters: Partial<TaskQueryParams>;

  // Actions
  fetchTasks: (params?: TaskQueryParams) => Promise<void>;
  getTask: (id: string) => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reorderTasks: (
    projectId: string,
    tasks: Array<{ id: string; position: number; status?: string }>
  ) => Promise<void>;
  setFilters: (filters: Partial<TaskQueryParams>) => void;
  clearError: () => void;
  selectTask: (task: Task | null) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools(
    (set, get) => ({
      // Initial state
      tasks: [],
      selectedTask: null,
      isLoading: false,
      error: null,
      filters: {},

      // Fetch tasks
      fetchTasks: async (params?: TaskQueryParams) => {
        set({ isLoading: true, error: null });

        try {
          const mergedParams = { ...get().filters, ...params };
          const tasks = await taskAPI.getTasks(mergedParams);

          set({
            tasks,
            isLoading: false,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to fetch tasks";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      // Get single task
      getTask: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          const task = await taskAPI.getTask(id);
          set({
            selectedTask: task,
            isLoading: false,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to fetch task";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      // Create task
      createTask: async (data: CreateTaskData) => {
        set({ isLoading: true, error: null });

        try {
          const newTask = await taskAPI.createTask(data);

          set((state) => ({
            tasks: [...state.tasks, newTask],
            isLoading: false,
          }));

          return newTask;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to create task";
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Update task
      updateTask: async (id: string, data: UpdateTaskData) => {
        set({ isLoading: true, error: null });

        try {
          const updatedTask = await taskAPI.updateTask(id, data);

          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? updatedTask : task
            ),
            selectedTask:
              state.selectedTask?.id === id ? updatedTask : state.selectedTask,
            isLoading: false,
          }));
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to update task";
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete task
      deleteTask: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          await taskAPI.deleteTask(id);

          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
            selectedTask:
              state.selectedTask?.id === id ? null : state.selectedTask,
            isLoading: false,
          }));
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to delete task";
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Reorder tasks (optimistic update)
      reorderTasks: async (
        projectId: string,
        taskUpdates: Array<{ id: string; position: number; status?: string }>
      ) => {
        const { tasks } = get();

        // Optimistic update
        const optimisticTasks = tasks.map((task) => {
          const update = taskUpdates.find((u) => u.id === task.id);
          if (update) {
            return {
              ...task,
              position: update.position,
              status: (update.status as TaskStatus) || task.status,
            };
          }
          return task;
        });

        set({ tasks: optimisticTasks });

        try {
          const updatedTasks = await taskAPI.reorderTasks(
            projectId,
            taskUpdates
          );
          set({ tasks: updatedTasks });
        } catch (error) {
          // Rollback on error
          set({ tasks });
          const message =
            error instanceof Error ? error.message : "Failed to reorder tasks";
          set({ error: message });
          throw error;
        }
      },

      // Set filters
      setFilters: (filters: Partial<TaskQueryParams>) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Select task
      selectTask: (task: Task | null) => {
        set({ selectedTask: task });
      },
    }),
    {
      name: "task-store",
    }
  )
);
