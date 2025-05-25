import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../../stores/authStore";
import { validateEmail, validatePassword } from "../../../utils/auth";
import type { RegisterCredentials } from "../../../types";

export function RegisterForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (
    values: RegisterCredentials & { confirmPassword: string }
  ) => {
    setLocalError(null);
    clearError();

    // Client-side validation
    if (values.name.length < 2) {
      setLocalError("Name must be at least 2 characters long");
      return;
    }

    if (!validateEmail(values.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    const passwordValidation = validatePassword(values.password);
    if (!passwordValidation.isValid) {
      setLocalError(passwordValidation.errors[0]);
      return;
    }

    if (values.password !== values.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = values;
      await register(registerData);
      message.success("Registration successful! Welcome aboard!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Error is already handled by the store
      console.error("Registration error:", err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>

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
        name="register"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        autoComplete="off"
        className="w-full"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 2, message: "Name must be at least 2 characters!" },
            { max: 50, message: "Name cannot exceed 50 characters!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Enter your full name"
            autoComplete="name"
            className="h-11"
          />
        </Form.Item>

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
            className="h-11"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Create a password"
            autoComplete="new-password"
            className="h-11"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="h-11"
          />
        </Form.Item>

        <Form.Item className="mb-0 mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            className="h-11 font-medium text-base"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
}
