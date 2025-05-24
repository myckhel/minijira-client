import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
      onClick: () => navigate("/projects"),
    },
    {
      key: "/tasks",
      icon: <CheckSquareOutlined />,
      label: "Tasks",
      onClick: () => navigate("/tasks"),
    },
    {
      type: "divider",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  // Get current selected key based on pathname
  const selectedKey = location.pathname;

  return (
    <div className="h-full flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <CheckSquareOutlined className="text-white text-lg" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">Mini Jira</h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="border-none"
          inlineIndent={collapsed ? 0 : 24}
        />
      </div>

      {/* Footer/Version info */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">v1.0.0</div>
        </div>
      )}
    </div>
  );
}
