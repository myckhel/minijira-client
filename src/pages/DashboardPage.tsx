import { Typography, Card, Row, Col, Statistic } from "antd";
import {
  ProjectOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import AuthStatus from "../components/features/auth/AuthStatus";

const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <Title level={2} className="mb-2">
          Dashboard
        </Title>
        <Paragraph className="text-gray-600">
          Welcome back! Here's an overview of your projects and tasks.
        </Paragraph>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Projects"
              value={0}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={0}
              prefix={<CheckSquareOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed"
              value={0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Authentication Status */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <AuthStatus />
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" className="h-full">
            <div className="text-center py-4 text-gray-500">
              <ProjectOutlined className="text-3xl mb-2" />
              <p>Ready to get started?</p>
              <p className="text-sm">Create your first project!</p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card title="Recent Activity" className="w-full">
        <div className="text-center py-8 text-gray-500">
          <CheckSquareOutlined className="text-4xl mb-4" />
          <p>No recent activity</p>
          <p className="text-sm">Start by creating your first project!</p>
        </div>
      </Card>
    </div>
  );
}
