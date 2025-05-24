import { apiClient } from "../services/api";
import type { Project, CreateProjectData, UpdateProjectData, ApiResponse } from "../types";

class ProjectAPI {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    const response = await apiClient.get<ApiResponse<Project[]>>("/projects");
    return response.data.data || [];
  }

  // Get single project by ID
  async getProject(id: string): Promise<Project> {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data!;
  }

  // Create new project
  async createProject(data: CreateProjectData): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>("/projects", data);
    return response.data.data!;
  }

  // Update project
  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    const response = await apiClient.patch<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data!;
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  }
}

export const projectAPI = new ProjectAPI();
