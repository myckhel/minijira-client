// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Auth Constants
export const AUTH_TOKEN_KEY = "mini_jira_token";
export const AUTH_USER_KEY = "mini_jira_user";

// Status Options
export const TASK_STATUSES = [
  { value: "TODO", label: "To Do", color: "#6b7280" },
  { value: "IN_PROGRESS", label: "In Progress", color: "#f59e0b" },
  { value: "DONE", label: "Done", color: "#10b981" },
] as const;

// Priority Options
export const TASK_PRIORITIES = [
  { value: "LOW", label: "Low", color: "#6b7280" },
  { value: "MEDIUM", label: "Medium", color: "#f59e0b" },
  { value: "HIGH", label: "High", color: "#ef4444" },
] as const;

// Project Colors
export const PROJECT_COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#ec4899", // Pink
  "#84cc16", // Lime
];

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Routes
export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  TASKS: "/tasks",
  TASK_DETAIL: "/tasks/:id",
  TASK_BOARD: "/board",
  PROFILE: "/profile",
  USERS: "/users",
  NOT_FOUND: "/404",
} as const;

// Validation
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  PROJECT_NAME_MAX_LENGTH: 50,
} as const;

// UI Constants
export const SIDEBAR_WIDTH = 256;
export const HEADER_HEIGHT = 64;
export const MOBILE_BREAKPOINT = 768;

// Theme
export const THEME = {
  colors: {
    primary: "#1890ff",
    success: "#52c41a",
    warning: "#faad14",
    error: "#ff4d4f",
    info: "#1890ff",
  },
  borderRadius: {
    small: "4px",
    medium: "6px",
    large: "8px",
  },
} as const;
