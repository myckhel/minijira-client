// Mock authentication API for testing
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "../types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    role: "USER",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock JWT token
const generateMockToken = () => "mock_jwt_token_" + Date.now();

// Helper to create API-like errors
const createAPIError = (message: string, status: number = 400) => {
  const error = new Error(message) as Error & {
    response?: { data: { message: string }; status: number };
  };
  error.response = {
    data: { message },
    status,
  };
  return error;
};

export const mockAuthAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500); // Simulate network delay

    const user = mockUsers.find((u) => u.email === credentials.email);

    if (!user || credentials.password !== "password") {
      throw createAPIError("Invalid email or password", 401);
    }

    return {
      user,
      access_token: generateMockToken(),
    };
  },

  async register(userData: RegisterCredentials): Promise<AuthResponse> {
    await delay(500); // Simulate network delay

    // Check if user already exists
    if (mockUsers.find((u) => u.email === userData.email)) {
      throw createAPIError("User with this email already exists", 409);
    }

    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: userData.email,
      name: userData.name,
      role: "USER",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return {
      user: newUser,
      access_token: generateMockToken(),
    };
  },

  async getCurrentUser(): Promise<User> {
    await delay(200);

    // Return the first user as the authenticated user
    const user = mockUsers[0];
    if (!user) {
      throw createAPIError("User not found", 404);
    }

    return user;
  },
};
