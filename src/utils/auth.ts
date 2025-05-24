import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../constants";
import type { User } from "../types";

/**
 * Get stored auth token
 */
export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Store auth token
 */
export function storeToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Remove stored auth token
 */
export function removeToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Get stored user
 */
export function getStoredUser(): User | null {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Store user data
 */
export function storeUser(user: User): void {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

/**
 * Remove stored user
 */
export function removeUser(): void {
  localStorage.removeItem(AUTH_USER_KEY);
}

/**
 * Clear all auth data
 */
export function clearAuthData(): void {
  removeToken();
  removeUser();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getStoredToken() !== null;
}

/**
 * Format user display name
 */
export function formatUserName(user: User): string {
  return user.name || user.email;
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: User): string {
  const name = user.name || user.email;
  const parts = name.split(" ");

  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push("Password must contain at least one letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
