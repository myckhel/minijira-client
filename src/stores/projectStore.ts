import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { projectAPI } from "../apis/projects";
import type {
  Project,
  CreateProjectData,
  UpdateProjectData,
  ApiError,
} from "../types";

interface ProjectState {
  // State
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProjects: () => Promise<void>;
  getProject: (id: string) => Promise<Project>;
  createProject: (data: CreateProjectData) => Promise<Project>;
  updateProject: (id: string, data: UpdateProjectData) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  selectProject: (project: Project | null) => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set, get) => ({
      // Initial state
      projects: [],
      selectedProject: null,
      isLoading: false,
      error: null,

      // Fetch all projects
      fetchProjects: async () => {
        set({ isLoading: true, error: null });

        try {
          const projects = await projectAPI.getProjects();
          set({
            projects,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to fetch projects",
          });
          throw error;
        }
      },

      // Get single project
      getProject: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          const project = await projectAPI.getProject(id);
          set({
            selectedProject: project,
            isLoading: false,
            error: null,
          });
          return project;
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to fetch project",
          });
          throw error;
        }
      },

      // Create new project
      createProject: async (data: CreateProjectData) => {
        set({ isLoading: true, error: null });

        try {
          const newProject = await projectAPI.createProject(data);

          // Add to projects list
          const { projects } = get();
          set({
            projects: [newProject, ...projects],
            isLoading: false,
            error: null,
          });

          return newProject;
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to create project",
          });
          throw error;
        }
      },

      // Update project
      updateProject: async (id: string, data: UpdateProjectData) => {
        set({ isLoading: true, error: null });

        try {
          const updatedProject = await projectAPI.updateProject(id, data);

          // Update in projects list
          const { projects, selectedProject } = get();
          const updatedProjects = projects.map((project) =>
            project.id === id ? updatedProject : project
          );

          set({
            projects: updatedProjects,
            selectedProject:
              selectedProject?.id === id ? updatedProject : selectedProject,
            isLoading: false,
            error: null,
          });

          return updatedProject;
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to update project",
          });
          throw error;
        }
      },

      // Delete project
      deleteProject: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          await projectAPI.deleteProject(id);

          // Remove from projects list
          const { projects, selectedProject } = get();
          const filteredProjects = projects.filter(
            (project) => project.id !== id
          );

          set({
            projects: filteredProjects,
            selectedProject:
              selectedProject?.id === id ? null : selectedProject,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Failed to delete project",
          });
          throw error;
        }
      },

      // Select project
      selectProject: (project: Project | null) => {
        set({ selectedProject: project });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "project-store", // Name for devtools
    }
  )
);
