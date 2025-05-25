import { useState } from "react";
import {
  Button,
  Input,
  Select,
  Form,
  Card,
  Table,
  Menu,
  Modal,
  Drawer,
  Tooltip,
  Tag,
  Badge,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  Upload,
  Progress,
  Spin,
  Alert,
  notification,
  message,
  Tabs,
  Collapse,
  Breadcrumb,
  Pagination,
  Steps,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Skeleton,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableColumnsType, UploadProps } from "antd";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: string;
}

function HFAntdTestPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [selectedKeys] = useState(["1"]);

  // Table data
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "success" : "warning"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">
            Edit
          </Button>
          <Button type="link" size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: "Active",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      status: "Active",
    },
  ];

  // Menu items
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Projects",
      children: [
        { key: "2-1", label: "Project 1" },
        { key: "2-2", label: "Project 2" },
      ],
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <MailOutlined />,
    },
  ];

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const showNotification = () => {
    notification.success({
      message: "Success",
      description: "This is a HF-styled notification!",
      placement: "topRight",
    });
  };

  const showMessage = () => {
    message.success("This is a HF-styled message!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hf-yellow/10 to-hf-orange/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={1} className="text-gray-900 mb-2">
            🤗 Hugging Face Design System - Ant Design Integration Test
          </Title>
          <Paragraph className="text-lg text-gray-600">
            Testing all Ant Design components with the Hugging Face design
            system styling.
          </Paragraph>
        </div>

        {/* Alert Section */}
        <Card title="Alerts & Messages" className="mb-6">
          <Space direction="vertical" className="w-full" size="middle">
            <Alert message="Success Alert" type="success" showIcon />
            <Alert message="Info Alert" type="info" showIcon />
            <Alert message="Warning Alert" type="warning" showIcon />
            <Alert message="Error Alert" type="error" showIcon />
            <Space>
              <Button onClick={showNotification}>Show Notification</Button>
              <Button onClick={showMessage}>Show Message</Button>
            </Space>
          </Space>
        </Card>

        {/* Buttons Section */}
        <Card title="Buttons" className="mb-6">
          <Space wrap size="middle">
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
            <Button type="primary" danger>
              Danger Primary
            </Button>
            <Button danger>Danger Default</Button>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              With Icon
            </Button>
            <Button type="primary" size="large">
              Large
            </Button>
            <Button type="primary" size="small">
              Small
            </Button>
          </Space>
        </Card>

        {/* Form Elements */}
        <Card title="Form Elements" className="mb-6">
          <Form layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Form.Item label="Input">
                <Input placeholder="Enter text..." />
              </Form.Item>
              <Form.Item label="Input with Icon">
                <Input prefix={<SearchOutlined />} placeholder="Search..." />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password placeholder="Enter password..." />
              </Form.Item>
              <Form.Item label="Select">
                <Select placeholder="Select an option">
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date Picker">
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item label="Time Picker">
                <TimePicker className="w-full" />
              </Form.Item>
            </div>
            <Form.Item label="Text Area">
              <TextArea rows={4} placeholder="Enter description..." />
            </Form.Item>
          </Form>
        </Card>

        {/* Interactive Elements */}
        <Card title="Interactive Elements" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Title level={4}>Switch & Radio</Title>
              <Space direction="vertical">
                <Switch
                  checked={switchValue}
                  onChange={setSwitchValue}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
                <Radio.Group
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                >
                  <Radio value={1}>Option 1</Radio>
                  <Radio value={2}>Option 2</Radio>
                  <Radio value={3}>Option 3</Radio>
                </Radio.Group>
                <Checkbox.Group>
                  <Checkbox value="A">Checkbox A</Checkbox>
                  <Checkbox value="B">Checkbox B</Checkbox>
                  <Checkbox value="C">Checkbox C</Checkbox>
                </Checkbox.Group>
              </Space>
            </div>
            <div>
              <Title level={4}>Slider & Rate</Title>
              <Space direction="vertical" className="w-full">
                <Slider defaultValue={30} />
                <Rate defaultValue={3} />
              </Space>
            </div>
            <div>
              <Title level={4}>Upload & Progress</Title>
              <Space direction="vertical" className="w-full">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Progress percent={30} />
                <Progress percent={50} status="active" />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
              </Space>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <Card title="Navigation" className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Title level={4}>Menu</Title>
              <Menu
                mode="vertical"
                selectedKeys={selectedKeys}
                items={menuItems}
                className="border-none"
              />
            </div>
            <div>
              <Title level={4}>Breadcrumb & Steps</Title>
              <Space direction="vertical" className="w-full" size="large">
                <Breadcrumb>
                  <Breadcrumb.Item href="">
                    <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="">
                    <UserOutlined />
                    <span>Application List</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Application</Breadcrumb.Item>
                </Breadcrumb>
                <Steps current={1} size="small">
                  <Step title="Finished" description="This is a description." />
                  <Step
                    title="In Progress"
                    description="This is a description."
                  />
                  <Step title="Waiting" description="This is a description." />
                </Steps>
              </Space>
            </div>
          </div>
        </Card>

        {/* Data Display */}
        <Card title="Data Display" className="mb-6">
          <Space direction="vertical" className="w-full" size="large">
            <div>
              <Title level={4}>Tags & Badges</Title>
              <Space wrap>
                <Tag>Default</Tag>
                <Tag color="success">Success</Tag>
                <Tag color="processing">Processing</Tag>
                <Tag color="error">Error</Tag>
                <Tag color="warning">Warning</Tag>
                <Badge count={5}>
                  <Avatar shape="square" size="large" />
                </Badge>
                <Badge dot>
                  <BellOutlined style={{ fontSize: "16px" }} />
                </Badge>
              </Space>
            </div>

            <div>
              <Title level={4}>Table</Title>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                size="middle"
              />
            </div>
          </Space>
        </Card>

        {/* Tabs */}
        <Card title="Tabs" className="mb-6">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              <Paragraph>Content of Tab Pane 1</Paragraph>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <Paragraph>Content of Tab Pane 2</Paragraph>
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              <Paragraph>Content of Tab Pane 3</Paragraph>
            </TabPane>
          </Tabs>
        </Card>

        {/* Collapse */}
        <Card title="Collapse" className="mb-6">
          <Collapse>
            <Panel header="Panel 1" key="1">
              <Paragraph>
                This is panel content for Panel 1. The HF design system should
                be applied here.
              </Paragraph>
            </Panel>
            <Panel header="Panel 2" key="2">
              <Paragraph>
                This is panel content for Panel 2. Notice the styling
                consistency.
              </Paragraph>
            </Panel>
            <Panel header="Panel 3" key="3">
              <Paragraph>
                This is panel content for Panel 3. All elements follow HF design
                patterns.
              </Paragraph>
            </Panel>
          </Collapse>
        </Card>

        {/* Modal & Drawer Controls */}
        <Card title="Overlays" className="mb-6">
          <Space>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Open Modal
            </Button>
            <Button onClick={() => setIsDrawerVisible(true)}>
              Open Drawer
            </Button>
            <Tooltip title="This is a HF-styled tooltip">
              <Button>Hover for Tooltip</Button>
            </Tooltip>
            <Dropdown menu={{ items: dropdownItems }} placement="bottomLeft">
              <Button>Dropdown Menu</Button>
            </Dropdown>
          </Space>
        </Card>

        {/* Loading States */}
        <Card title="Loading States" className="mb-6">
          <Space direction="vertical" className="w-full" size="large">
            <div>
              <Title level={4}>Spin</Title>
              <Space>
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
                <Spin spinning={true}>
                  <div className="p-4 bg-gray-50 rounded">
                    <Paragraph>This content is being loaded...</Paragraph>
                  </div>
                </Spin>
              </Space>
            </div>
            <div>
              <Title level={4}>Skeleton</Title>
              <Skeleton active />
            </div>
          </Space>
        </Card>

        {/* Pagination */}
        <Card title="Pagination" className="mb-6">
          <Pagination
            defaultCurrent={1}
            total={500}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </Card>

        {/* Typography */}
        <Card title="Typography" className="mb-6">
          <Space direction="vertical" className="w-full">
            <Title>h1. Hugging Face Title</Title>
            <Title level={2}>h2. Hugging Face Title</Title>
            <Title level={3}>h3. Hugging Face Title</Title>
            <Title level={4}>h4. Hugging Face Title</Title>
            <Title level={5}>h5. Hugging Face Title</Title>
            <Text>Default Text with HF styling</Text>
            <Text type="secondary">Secondary Text</Text>
            <Text type="success">Success Text</Text>
            <Text type="warning">Warning Text</Text>
            <Text type="danger">Danger Text</Text>
            <Text disabled>Disabled Text</Text>
            <Text mark>Marked Text</Text>
            <Text code>Code Text</Text>
            <Text keyboard>Keyboard Text</Text>
            <Text underline>Underline Text</Text>
            <Text delete>Deleted Text</Text>
            <Text strong>Strong Text</Text>
            <Text italic>Italic Text</Text>
          </Space>
        </Card>

        {/* Modal */}
        <Modal
          title="HF-Styled Modal"
          open={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          <Paragraph>
            This modal follows the Hugging Face design system. Notice the
            consistent styling with rounded corners, proper spacing, and HF
            color palette.
          </Paragraph>
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea rows={3} placeholder="Enter description" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Drawer */}
        <Drawer
          title="HF-Styled Drawer"
          placement="right"
          onClose={() => setIsDrawerVisible(false)}
          open={isDrawerVisible}
          width={400}
        >
          <Space direction="vertical" className="w-full" size="large">
            <Paragraph>
              This drawer showcases the HF design system integration with proper
              spacing, typography, and component styling.
            </Paragraph>
            <Form layout="vertical">
              <Form.Item label="Project Name">
                <Input placeholder="Enter project name" />
              </Form.Item>
              <Form.Item label="Priority">
                <Select placeholder="Select priority" className="w-full">
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Description">
                <TextArea rows={4} placeholder="Project description" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary">Save</Button>
                  <Button onClick={() => setIsDrawerVisible(false)}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Space>
        </Drawer>

        {/* Footer */}
        <div className="text-center py-8">
          <Text type="secondary">
            🤗 Hugging Face Design System Integration with Ant Design - All
            components styled consistently
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HFAntdTestPage;
