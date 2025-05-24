import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { router } from "./routes";
import { useAuthStore } from "./stores/authStore";

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: "#1890ff",
    borderRadius: 6,
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  components: {
    Layout: {
      siderBg: "#ffffff",
      headerBg: "#ffffff",
    },
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: "#e6f4ff",
      itemHoverBg: "#f5f5f5",
    },
  },
};

function App() {
  const { checkAuthStatus } = useAuthStore();

  // Check authentication status on app startup
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
