import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { router } from "./routes";
import { useAuthStore } from "./stores/authStore";
import { hfAntdTheme } from "./themes/hf-antd-theme";

// Use the comprehensive HF theme configuration
const theme = hfAntdTheme;

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
