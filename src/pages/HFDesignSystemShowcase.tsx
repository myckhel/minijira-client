import { Typography, Row, Col, Space, Divider } from "antd";
import { HFButton, HFCard, HFBadge, HFInput, HFLayout } from "../components/ui";
import {
  StarOutlined,
  HeartOutlined,
  RocketOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function HFDesignSystemShowcase() {
  return (
    <HFLayout
      title="HF Design System Showcase"
      headerContent={
        <Space>
          <HFBadge variant="gradient" glow>
            Live Demo
          </HFBadge>
          <HFButton variant="outline" size="small">
            Documentation
          </HFButton>
        </Space>
      }
      siderContent={
        <div className="space-y-4">
          <HFCard variant="outlined">
            <Text strong className="text-orange-600">
              Navigation
            </Text>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-gray-600 cursor-pointer hover:text-orange-500">
                🎨 Components
              </div>
              <div className="text-sm text-gray-600 cursor-pointer hover:text-orange-500">
                🌈 Colors
              </div>
              <div className="text-sm text-gray-600 cursor-pointer hover:text-orange-500">
                ✨ Animations
              </div>
              <div className="text-sm text-gray-600 cursor-pointer hover:text-orange-500">
                📱 Responsive
              </div>
            </div>
          </HFCard>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <HFCard variant="glow" className="text-center">
          <div className="py-8">
            <Title level={1} className="hf-text-gradient mb-4">
              Hugging Face Design System
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-6">
              A beautiful, modern design system inspired by Hugging Face's
              vibrant brand identity
            </Paragraph>
            <div className="flex justify-center space-x-4">
              <HFButton
                variant="primary"
                size="large"
                icon={<RocketOutlined />}
              >
                Get Started
              </HFButton>
              <HFButton variant="outline" size="large" icon={<StarOutlined />}>
                Star on GitHub
              </HFButton>
            </div>
          </div>
        </HFCard>

        {/* Buttons Section */}
        <div>
          <Title level={2} className="mb-4">
            Buttons
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <HFCard variant="default">
                <Title level={4}>Button Variants</Title>
                <Space wrap className="w-full">
                  <HFButton variant="primary">Primary</HFButton>
                  <HFButton variant="secondary">Secondary</HFButton>
                  <HFButton variant="outline">Outline</HFButton>
                  <HFButton variant="ghost">Ghost</HFButton>
                </Space>
              </HFCard>
            </Col>
            <Col xs={24} md={12}>
              <HFCard variant="default">
                <Title level={4}>Button Sizes</Title>
                <Space wrap className="w-full">
                  <HFButton variant="primary" hfSize="small">
                    Small
                  </HFButton>
                  <HFButton variant="primary" hfSize="medium">
                    Medium
                  </HFButton>
                  <HFButton variant="primary" hfSize="large">
                    Large
                  </HFButton>
                </Space>
              </HFCard>
            </Col>
          </Row>
        </div>

        {/* Cards Section */}
        <div>
          <Title level={2} className="mb-4">
            Cards
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <HFCard variant="default" interactive>
                <Title level={4}>Default Card</Title>
                <Paragraph>
                  A standard card with subtle shadow and hover effects.
                </Paragraph>
              </HFCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <HFCard variant="elevated" interactive>
                <Title level={4}>Elevated Card</Title>
                <Paragraph>
                  Enhanced elevation with stronger shadows for prominence.
                </Paragraph>
              </HFCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <HFCard variant="outlined" interactive>
                <Title level={4}>Outlined Card</Title>
                <Paragraph>
                  Orange-accented border with subtle background tint.
                </Paragraph>
              </HFCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <HFCard variant="glow" interactive>
                <Title level={4}>Glow Card</Title>
                <Paragraph>
                  Eye-catching glow effect with gradient background.
                </Paragraph>
              </HFCard>
            </Col>
          </Row>
        </div>

        {/* Badges Section */}
        <div>
          <Title level={2} className="mb-4">
            Badges
          </Title>
          <HFCard variant="default">
            <Title level={4} className="mb-4">
              Badge Variants
            </Title>
            <Space wrap size="middle">
              <HFBadge variant="default">Default</HFBadge>
              <HFBadge variant="success">Success</HFBadge>
              <HFBadge variant="warning">Warning</HFBadge>
              <HFBadge variant="danger">Error</HFBadge>
              <HFBadge variant="info">Info</HFBadge>
              <HFBadge variant="gradient" glow>
                Gradient Glow
              </HFBadge>
            </Space>

            <Divider />

            <Title level={4} className="mb-4">
              Badge Sizes
            </Title>
            <Space wrap size="middle">
              <HFBadge variant="gradient" size="small">
                Small
              </HFBadge>
              <HFBadge variant="gradient" size="medium">
                Medium
              </HFBadge>
              <HFBadge variant="gradient" size="large">
                Large
              </HFBadge>
            </Space>
          </HFCard>
        </div>

        {/* Inputs Section */}
        <div>
          <Title level={2} className="mb-4">
            Input Components
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <HFCard variant="default">
                <Title level={4}>Default Input</Title>
                <HFInput placeholder="Enter your text..." variant="default" />
              </HFCard>
            </Col>
            <Col xs={24} md={8}>
              <HFCard variant="default">
                <Title level={4}>Outlined Input</Title>
                <HFInput placeholder="Outlined style..." variant="outlined" />
              </HFCard>
            </Col>
            <Col xs={24} md={8}>
              <HFCard variant="default">
                <Title level={4}>Filled Input</Title>
                <HFInput placeholder="Filled background..." variant="filled" />
              </HFCard>
            </Col>
          </Row>
        </div>

        {/* Animations Section */}
        <div>
          <Title level={2} className="mb-4">
            Animations
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <HFCard variant="default" className="text-center">
                <Title level={4}>Bounce Animation</Title>
                <div className="hf-animate-bounce-subtle text-orange-500 text-4xl mb-4">
                  <HeartOutlined />
                </div>
                <Text>Subtle bounce animation for icons and elements</Text>
              </HFCard>
            </Col>
            <Col xs={24} md={12}>
              <HFCard variant="default" className="text-center">
                <Title level={4}>Pulse Glow</Title>
                <div className="hf-animate-pulse-glow text-orange-500 text-4xl mb-4 inline-block">
                  <ThunderboltOutlined />
                </div>
                <Text>
                  Glowing pulse effect for attention-grabbing elements
                </Text>
              </HFCard>
            </Col>
          </Row>
        </div>

        {/* Color Palette */}
        <div>
          <Title level={2} className="mb-4">
            Color Palette
          </Title>
          <HFCard variant="elevated">
            <Title level={4} className="mb-4">
              Hugging Face Colors
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: "#ffd21e" }}
                    ></div>
                    <div>
                      <Text strong>Primary Yellow</Text>
                      <br />
                      <Text code>#ffd21e</Text>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: "#ff9d00" }}
                    ></div>
                    <div>
                      <Text strong>Secondary Orange</Text>
                      <br />
                      <Text code>#ff9d00</Text>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: "#6b7280" }}
                    ></div>
                    <div>
                      <Text strong>Neutral Gray</Text>
                      <br />
                      <Text code>#6b7280</Text>
                    </div>
                  </div>
                  <div className="hf-bg-gradient w-full h-8 rounded-lg flex items-center justify-center">
                    <Text strong className="text-white">
                      Gradient Background
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>
          </HFCard>
        </div>

        {/* Footer */}
        <HFCard variant="outlined" className="text-center">
          <Title level={3} className="hf-text-gradient mb-2">
            Ready to build amazing UIs?
          </Title>
          <Paragraph className="text-gray-600 mb-4">
            Start using the Hugging Face design system in your next project
          </Paragraph>
          <HFButton variant="primary" size="large" icon={<RocketOutlined />}>
            Get Started Now
          </HFButton>
        </HFCard>
      </div>
    </HFLayout>
  );
}
