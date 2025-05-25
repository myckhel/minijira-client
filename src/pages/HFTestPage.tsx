import { useState } from "react";
import { Typography, Space, Input, Button } from "antd";
import { HFButton, HFCard, HFBadge, HFInput } from "../components/ui";

const { Title, Paragraph, Text } = Typography;

export default function HFTestPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <Title level={1} className="hf-text-gradient">
          HF Design System Test
        </Title>
        <Paragraph className="text-lg text-gray-700">
          Testing text visibility and component functionality
        </Paragraph>
      </div>

      {/* Text Visibility Test */}
      <HFCard variant="outlined">
        <Title level={2} className="hf-text-primary">
          Text Visibility Test
        </Title>
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Text strong className="text-gray-900">
              Normal Text (should be dark and visible):
            </Text>
            <Paragraph className="text-gray-700">
              This is a paragraph with normal gray text. It should be clearly
              visible and easy to read.
            </Paragraph>
          </div>

          <div>
            <Text strong className="hf-text-gradient">
              Gradient Text:
            </Text>
            <Title level={3} className="hf-text-gradient">
              This title uses HF gradient styling
            </Title>
          </div>

          <div>
            <Text strong>Typography Variants:</Text>
            <div className="space-y-2">
              <div className="hf-text-primary">
                Primary text color (#111827)
              </div>
              <div className="hf-text-secondary">
                Secondary text color (#374151)
              </div>
              <div className="hf-text-muted">Muted text color (#6b7280)</div>
            </div>
          </div>
        </Space>
      </HFCard>

      {/* Component Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buttons */}
        <HFCard variant="default">
          <Title level={3} className="hf-text-primary">
            HF Buttons
          </Title>
          <Space wrap>
            <HFButton variant="primary">Primary Button</HFButton>
            <HFButton variant="secondary">Secondary</HFButton>
            <HFButton variant="outline">Outline</HFButton>
            <HFButton variant="ghost">Ghost</HFButton>
          </Space>
        </HFCard>

        {/* Badges */}
        <HFCard variant="default">
          <Title level={3} className="hf-text-primary">
            HF Badges
          </Title>
          <Space wrap>
            <HFBadge variant="default">Default</HFBadge>
            <HFBadge variant="success">Success</HFBadge>
            <HFBadge variant="warning">Warning</HFBadge>
            <HFBadge variant="danger">Danger</HFBadge>
            <HFBadge variant="gradient" glow>
              Gradient
            </HFBadge>
          </Space>
        </HFCard>

        {/* Inputs */}
        <HFCard variant="default">
          <Title level={3} className="hf-text-primary">
            HF Inputs
          </Title>
          <Space direction="vertical" className="w-full">
            <HFInput
              placeholder="Default input..."
              variant="default"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HFInput placeholder="Outlined input..." variant="outlined" />
            <HFInput placeholder="Filled input..." variant="filled" />
            <Text className="text-gray-600">
              Input value: {inputValue || "None"}
            </Text>
          </Space>
        </HFCard>

        {/* Card Variants */}
        <HFCard variant="glow">
          <Title level={3} className="hf-text-primary">
            Glow Card
          </Title>
          <Paragraph className="text-gray-700">
            This card has a glow effect and gradient background.
          </Paragraph>
          <HFBadge variant="gradient">Featured</HFBadge>
        </HFCard>
      </div>

      {/* Comparison with Ant Design */}
      <HFCard variant="elevated">
        <Title level={2} className="hf-text-primary">
          Ant Design vs HF Components
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Title level={4} className="text-gray-800">
              Standard Ant Design
            </Title>
            <Space direction="vertical" className="w-full">
              <Button type="primary">Ant Button</Button>
              <Input placeholder="Ant Input" />
              <div className="text-gray-600">Standard Ant Design styling</div>
            </Space>
          </div>

          <div>
            <Title level={4} className="hf-text-primary">
              HF Enhanced
            </Title>
            <Space direction="vertical" className="w-full">
              <HFButton variant="primary">HF Button</HFButton>
              <HFInput placeholder="HF Input" variant="default" />
              <div className="hf-text-secondary">
                Enhanced with HF design system
              </div>
            </Space>
          </div>
        </div>
      </HFCard>

      {/* Color Palette Display */}
      <HFCard variant="outlined">
        <Title level={2} className="hf-text-primary">
          HF Color Palette
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto rounded-lg mb-2"
              style={{ backgroundColor: "#ffd21e" }}
            ></div>
            <Text strong>HF Yellow</Text>
            <br />
            <Text code>#ffd21e</Text>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto rounded-lg mb-2"
              style={{ backgroundColor: "#ff9d00" }}
            ></div>
            <Text strong>HF Orange</Text>
            <br />
            <Text code>#ff9d00</Text>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto rounded-lg mb-2"
              style={{ backgroundColor: "#6b7280" }}
            ></div>
            <Text strong>HF Gray</Text>
            <br />
            <Text code>#6b7280</Text>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg mb-2 hf-bg-gradient"></div>
            <Text strong>HF Gradient</Text>
            <br />
            <Text>Yellow → Orange</Text>
          </div>
        </div>
      </HFCard>

      {/* Status Summary */}
      <HFCard variant="glow" className="text-center">
        <Title level={2} className="hf-text-gradient">
          Implementation Status
        </Title>
        <div className="space-y-3">
          <div className="flex justify-center space-x-4">
            <HFBadge variant="success">✅ Text Visibility Fixed</HFBadge>
            <HFBadge variant="success">✅ Components Working</HFBadge>
            <HFBadge variant="success">✅ HF Design Applied</HFBadge>
          </div>
          <Paragraph className="text-gray-700 text-lg">
            Hugging Face design system successfully integrated!
          </Paragraph>
        </div>
      </HFCard>
    </div>
  );
}
