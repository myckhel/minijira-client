import React from "react";
import { Card, Typography, Tag, Button, Space } from "antd";
import { useAuthStore } from "../../../stores/authStore";

const { Text, Title } = Typography;

export function AuthStatus() {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  return (
    <Card title="Authentication Status" className="w-full max-w-md">
      <Space direction="vertical" className="w-full">
        <div>
          <Text strong>Status: </Text>
          {isLoading ? (
            <Tag color="blue">Loading...</Tag>
          ) : isAuthenticated ? (
            <Tag color="green">Authenticated</Tag>
          ) : (
            <Tag color="red">Not Authenticated</Tag>
          )}
        </div>

        {user && (
          <div>
            <Title level={5}>User Info:</Title>
            <div>
              <Text strong>Name: </Text>
              <Text>{user.name}</Text>
            </div>
            <div>
              <Text strong>Email: </Text>
              <Text>{user.email}</Text>
            </div>
            <div>
              <Text strong>Role: </Text>
              <Tag color="blue">{user.role}</Tag>
            </div>
          </div>
        )}

        {isAuthenticated && (
          <Button type="primary" danger onClick={logout} size="small">
            Logout
          </Button>
        )}
      </Space>
    </Card>
  );
}

export default AuthStatus;
