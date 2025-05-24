import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SIDEBAR_WIDTH, HEADER_HEIGHT } from "../../constants";

const { Content, Sider } = Layout;

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
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
        <Sidebar collapsed={collapsed} />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : SIDEBAR_WIDTH,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: collapsed ? 80 : SIDEBAR_WIDTH,
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
