// Base API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp?: string;
  path?: string;
}

// Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string;
  ownerId: string;
  owner: User;
  createdAt: string;
  updatedAt: string;
  _count?: {
    tasks: number;
  };
}

export interface CreateProjectData {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  color?: string;
}

// Task Types
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  position: number;
  dueDate?: string;
  projectId: string;
  project: Project;
  assigneeId?: string;
  assignee?: User;
  createdById: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  position?: number;
  dueDate?: string;
  projectId: string;
  assigneeId?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  position?: number;
  dueDate?: string;
  assigneeId?: string;
}

export interface ReorderTasksData {
  taskId: string;
  newPosition: number;
  newStatus?: TaskStatus;
}

// Query Parameters
export interface TaskQueryParams {
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: string;
  assigneeId?: string;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// UI State Types
export interface LoadingStates {
  login: boolean;
  register: boolean;
  fetchTasks: boolean;
  createTask: boolean;
  updateTask: boolean;
  deleteTask: boolean;
  fetchProjects: boolean;
  createProject: boolean;
  updateProject: boolean;
  deleteProject: boolean;
  fetchUsers: boolean;
}

export interface ModalStates {
  createTask: boolean;
  editTask: boolean;
  createProject: boolean;
  editProject: boolean;
  userProfile: boolean;
}

// Form Types
export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
  assigneeId?: string;
}

export interface ProjectFormData {
  name: string;
  description?: string;
  color?: string;
}

export interface UserFormData {
  name: string;
  avatarUrl?: string;
}

// Error Types
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  timestamp?: string;
  path?: string;
}
