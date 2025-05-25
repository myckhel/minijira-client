import { Typography, Row, Col, Statistic } from "antd";
import {
  ProjectOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import AuthStatus from "../components/features/auth/AuthStatus";
import { HFCard, HFBadge } from "../components/ui";

const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header with HF Styling */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border-l-4 border-orange-400">
        <Title level={2} className="mb-2 hf-text-gradient">
          Dashboard
        </Title>
        <Paragraph className="hf-text-secondary text-lg font-medium">
          Welcome back! Here's an overview of your projects and tasks.
        </Paragraph>
        <HFBadge variant="gradient" glow className="mt-2">
          Hugging Face Design System
        </HFBadge>
      </div>

      {/* Stats Cards with HF Styling */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <HFCard variant="elevated" interactive>
            <Statistic
              title="Total Projects"
              value={0}
              prefix={<ProjectOutlined className="text-orange-500" />}
              valueStyle={{
                color: "#ff9d00",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            />
          </HFCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <HFCard variant="glow" interactive>
            <Statistic
              title="Total Tasks"
              value={0}
              prefix={<CheckSquareOutlined className="text-green-500" />}
              valueStyle={{
                color: "#22c55e",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            />
          </HFCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <HFCard variant="outlined" interactive>
            <Statistic
              title="In Progress"
              value={0}
              prefix={<ClockCircleOutlined className="text-yellow-500" />}
              valueStyle={{
                color: "#faad14",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            />
          </HFCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <HFCard variant="default" interactive>
            <Statistic
              title="Completed"
              value={0}
              prefix={<CheckCircleOutlined className="text-green-600" />}
              valueStyle={{
                color: "#16a34a",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            />
          </HFCard>
        </Col>
      </Row>

      {/* Authentication Status */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <AuthStatus />
        </Col>
        <Col xs={24} lg={12}>
          <HFCard title="Quick Actions" variant="glow" className="h-full">
            <div className="text-center py-4 text-gray-600">
              <ProjectOutlined className="text-4xl mb-3 text-orange-500 hf-animate-bounce-subtle" />
              <p className="text-lg font-medium mb-2">Ready to get started?</p>
              <p className="text-sm text-gray-500">
                Create your first project!
              </p>
              <HFBadge variant="gradient" className="mt-3">
                New Feature
              </HFBadge>
            </div>
          </HFCard>
        </Col>
      </Row>

      {/* Recent Activity */}
      <HFCard title="Recent Activity" variant="elevated" className="w-full">
        <div className="text-center py-8 text-gray-500">
          <CheckSquareOutlined className="text-5xl mb-4 text-orange-400 hf-animate-pulse-glow" />
          <p className="text-lg font-medium mb-2">No recent activity</p>
          <p className="text-sm">Start by creating your first project!</p>
          <div className="mt-4 space-x-2">
            <HFBadge variant="info">Ready to start</HFBadge>
            <HFBadge variant="warning">New user</HFBadge>
          </div>
        </div>
      </HFCard>
    </div>
  );
}
