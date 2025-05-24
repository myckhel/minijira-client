import { apiClient } from "../services/api";
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskQueryParams,
  ApiResponse,
} from "../types";

export const taskAPI = {
  // Get all tasks with filtering
  getTasks: async (params?: TaskQueryParams): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>("/tasks", {
      params,
    });
    return response.data.data || [];
  },

  // Get single task
  getTask: async (id: string): Promise<Task> => {
    const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data!;
  },

  // Create new task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await apiClient.post<ApiResponse<Task>>("/tasks", data);
    return response.data.data!;
  },

  // Update task
  updateTask: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const response = await apiClient.patch<ApiResponse<Task>>(
      `/tasks/${id}`,
      data
    );
    return response.data.data!;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  // Reorder tasks (for Kanban)
  reorderTasks: async (
    projectId: string,
    tasks: Array<{ id: string; position: number; status?: string }>
  ): Promise<Task[]> => {
    const response = await apiClient.patch<ApiResponse<Task[]>>(
      `/tasks/projects/${projectId}/reorder`,
      { tasks }
    );
    return response.data.data || [];
  },
};
