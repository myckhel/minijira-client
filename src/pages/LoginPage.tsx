import { LoginForm } from "../components/features/auth/LoginForm";
import { HFCard } from "../components/ui";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* HF Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 hf-bg-gradient rounded-full flex items-center justify-center shadow-lg hf-animate-pulse-glow">
              <span className="text-white font-bold text-xl">HF</span>
            </div>
            <Title level={1} className="hf-text-gradient m-0">
              Mini Jira
            </Title>
          </div>
          <Paragraph className="text-gray-600 text-lg">
            Welcome to the Hugging Face powered task management system
          </Paragraph>
        </div>

        {/* Login Form Card */}
        <HFCard variant="glow" className="backdrop-blur-sm">
          <LoginForm />
        </HFCard>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Powered by Hugging Face Design System
        </div>
      </div>
    </div>
  );
}
