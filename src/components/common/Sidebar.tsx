import { Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useUiStore } from "../../stores/uiStore";
import { useIsMobile } from "../../hooks/useMediaQuery";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { setSidebarCollapsed } = useUiStore();

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => handleNavigation("/dashboard"),
    },
    {
      key: "/board",
      icon: <AppstoreOutlined />,
      label: "Board",
      onClick: () => handleNavigation("/board"),
    },
    {
      key: "/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
      onClick: () => handleNavigation("/projects"),
    },
    {
      key: "/tasks",
      icon: <CheckSquareOutlined />,
      label: "Tasks",
      onClick: () => handleNavigation("/tasks"),
    },
    {
      type: "divider",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => handleNavigation("/profile"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => handleNavigation("/settings"),
    },
  ];

  // Get current selected key based on pathname
  const selectedKey = location.pathname;

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Close Button */}
      {isMobile && !collapsed && (
        <div className="p-4 flex justify-end border-b border-gray-200">
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setSidebarCollapsed(true)}
            className="flex items-center justify-center"
          />
        </div>
      )}

      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 hf-bg-gradient rounded-lg flex items-center justify-center shadow-md">
            <CheckSquareOutlined className="text-white text-lg" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-lg font-bold hf-text-gradient">Mini Jira</h1>
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
