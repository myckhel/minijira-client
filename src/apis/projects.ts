import { apiRequest } from "../services/api";
import type { Project, CreateProjectData, UpdateProjectData } from "../types";

class ProjectAPI {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    return apiRequest<Project[]>("GET", "/projects");
  }

  // Get single project by ID
  async getProject(id: string): Promise<Project> {
    return apiRequest<Project>("GET", `/projects/${id}`);
  }

  // Create new project
  async createProject(data: CreateProjectData): Promise<Project> {
    return apiRequest<Project>("POST", "/projects", data);
  }

  // Update project
  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    return apiRequest<Project>("PATCH", `/projects/${id}`, data);
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    return apiRequest<void>("DELETE", `/projects/${id}`);
  }
}

export const projectAPI = new ProjectAPI();
