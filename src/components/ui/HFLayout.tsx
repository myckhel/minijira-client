import { Layout, Typography } from "antd";
import { cn } from "../../utils/cn";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

interface HFLayoutProps {
  children: React.ReactNode;
  title?: string;
  siderContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  className?: string;
  showSider?: boolean;
}

export function HFLayout({
  children,
  title,
  siderContent,
  headerContent,
  className,
  showSider = true,
}: HFLayoutProps) {
  return (
    <Layout
      className={cn(
        "min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50",
        className
      )}
    >
      {showSider && (
        <Sider
          width={280}
          className="bg-white shadow-xl border-r-4 border-orange-200"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 hf-bg-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">HF</span>
              </div>
              <Title level={4} className="hf-text-gradient m-0">
                Mini Jira
              </Title>
            </div>
            {siderContent}
          </div>
        </Sider>
      )}

      <Layout>
        <Header className="bg-white shadow-md border-b-2 border-orange-200 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {title && (
              <Title level={2} className="text-gray-800 m-0">
                {title}
              </Title>
            )}
          </div>
          <div className="flex items-center space-x-4">{headerContent}</div>
        </Header>

        <Content className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HFLayout;
