import { Button, Dropdown, Avatar, Space, Typography, Badge } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { formatUserName, getUserInitials } from "../../utils/auth";
import type { MenuProps } from "antd";

const { Text } = Typography;

interface HeaderProps {
  style?: React.CSSProperties;
}

export function Header({ style }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sign out",
      onClick: handleLogout,
    },
  ];

  return (
    <div
      style={style}
      className="bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm"
    >
      {/* Left side - could add breadcrumbs or page title here */}
      <div className="flex items-center">
        <Button
          type="text"
          icon={<MenuOutlined />}
          className="lg:hidden mr-2"
          // onClick={() => setMobileDrawerOpen(true)} // Would need mobile drawer state
        />
        <Text className="text-lg font-medium text-gray-800 hidden sm:block">
          Dashboard
        </Text>
      </div>

      {/* Right side - notifications and user menu */}
      <Space size="middle">
        {/* Notifications */}
        <Badge count={0} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="flex items-center justify-center"
          />
        </Badge>

        {/* User dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button type="text" className="h-auto p-1">
            <Space>
              <Avatar
                size="small"
                src={user?.avatarUrl}
                icon={<UserOutlined />}
                className="bg-blue-500"
              >
                {user && !user.avatarUrl ? getUserInitials(user) : null}
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {user ? formatUserName(user) : "User"}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.role?.toLowerCase()}
                </div>
              </div>
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
}
