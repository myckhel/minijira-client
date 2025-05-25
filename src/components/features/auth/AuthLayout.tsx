import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { Card } from "antd";

export function AuthLayout() {
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-80 sm:w-96">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mini Jira</h1>
          <p className="text-gray-600">
            Manage your projects and tasks efficiently
          </p>
        </div>

        <Card className="shadow-xl border border-gray-200 rounded-lg">
          <div className="px-2 py-4">
            <Outlet />
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2025 Mini Jira Clone. Built with React & NestJS.
          </p>
        </div>
      </div>
    </div>
  );
}
