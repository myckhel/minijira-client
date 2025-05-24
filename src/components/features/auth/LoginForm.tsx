import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Alert, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../../stores/authStore";
import { validateEmail } from "../../../utils/auth";
import type { LoginCredentials } from "../../../types";

export function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (values: LoginCredentials) => {
    setLocalError(null);
    clearError();

    // Client-side validation
    if (!validateEmail(values.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    if (!values.password || values.password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    try {
      await login(values);
      message.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      // Error is already handled by the store
      console.error("Login error:", err);
    }
  };

  const displayError = localError || error;

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            create a new account
          </Link>
        </p>
      </div>

      {/* Demo credentials alert */}
      <Alert
        message="Demo Credentials"
        description="Email: demo@example.com | Password: password"
        type="info"
        showIcon
        className="mb-4"
      />

      {displayError && (
        <Alert
          message={displayError}
          type="error"
          showIcon
          closable
          onClose={() => {
            setLocalError(null);
            clearError();
          }}
          className="mb-4"
        />
      )}

      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            className="h-10 font-medium"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
