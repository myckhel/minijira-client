import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useUiStore } from "../../stores/uiStore";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { SIDEBAR_WIDTH, HEADER_HEIGHT } from "../../constants";

const { Content, Sider } = Layout;

export function AppLayout() {
  const { sidebarCollapsed, setSidebarCollapsed } = useUiStore();
  const { token } = theme.useToken();
  const isMobile = useIsMobile();

  // Handle responsive behavior
  useEffect(() => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [isMobile, setSidebarCollapsed, sidebarCollapsed]);

  return (
    <Layout className="min-h-screen">
      {/* Mobile overlay when sidebar is open */}
      {!sidebarCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        width={SIDEBAR_WIDTH}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
        className="bg-white border-r border-gray-200"
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </Sider>

      <Layout
        style={{
          marginLeft: isMobile ? 0 : sidebarCollapsed ? 80 : SIDEBAR_WIDTH,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: isMobile ? 0 : sidebarCollapsed ? 80 : SIDEBAR_WIDTH,
            zIndex: 99,
            height: HEADER_HEIGHT,
            transition: "left 0.2s",
          }}
        />
        <Content
          style={{
            marginTop: HEADER_HEIGHT,
            padding: "24px",
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            backgroundColor: token.colorBgLayout,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
