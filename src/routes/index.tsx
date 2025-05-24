import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { AuthLayout } from "../components/features/auth/AuthLayout";
import { AppLayout } from "../components/common/AppLayout";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ROUTES } from "../constants";

// Lazy load pages for code splitting
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("../pages/ProjectDetailPage"));
const TasksPage = lazy(() => import("../pages/TasksPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="large" />
  </div>
);

// Wrapper component for lazy-loaded pages
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: "/auth",
    element: (
      <LazyWrapper>
        <AuthLayout />
      </LazyWrapper>
    ),
    children: [
      {
        path: "login",
        element: (
          <LazyWrapper>
            <LoginPage />
          </LazyWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <LazyWrapper>
            <RegisterPage />
          </LazyWrapper>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <LazyWrapper>
            <DashboardPage />
          </LazyWrapper>
        ),
      },
      {
        path: "projects",
        element: (
          <LazyWrapper>
            <ProjectsPage />
          </LazyWrapper>
        ),
      },
      {
        path: "projects/:id",
        element: (
          <LazyWrapper>
            <ProjectDetailPage />
          </LazyWrapper>
        ),
      },
      {
        path: "tasks",
        element: (
          <LazyWrapper>
            <TasksPage />
          </LazyWrapper>
        ),
      },
      {
        path: "profile",
        element: (
          <LazyWrapper>
            <ProfilePage />
          </LazyWrapper>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/register",
    element: <Navigate to="/auth/register" replace />,
  },
  {
    path: "*",
    element: (
      <LazyWrapper>
        <NotFoundPage />
      </LazyWrapper>
    ),
  },
]);
