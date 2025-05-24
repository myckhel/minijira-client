import { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  FlagOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useTaskStore } from "../../../stores/taskStore";
import { useProjectStore } from "../../../stores/projectStore";
import { useUserStore } from "../../../stores/userStore";
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskStatus,
  TaskPriority,
  User,
} from "../../../types";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

interface TaskFormProps {
  task?: Task; // If provided, this is edit mode
  projectId?: string; // Pre-selected project
  onSuccess?: (task: Task) => void;
  onCancel?: () => void;
  loading?: boolean;
}

function TaskForm({
  task,
  projectId,
  onSuccess,
  onCancel,
  loading = false,
}: TaskFormProps) {
  const [form] = Form.useForm();
  const { createTask, updateTask, isLoading } = useTaskStore();
  const { projects, fetchProjects } = useProjectStore();
  const { users, fetchUsers } = useUserStore();

  const isEditMode = !!task;
  const isFormLoading = loading || isLoading;

  // Fetch data on mount
  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, [fetchProjects, fetchUsers]);

  // Set initial form values
  useEffect(() => {
    if (isEditMode && task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        projectId: task.projectId,
        assigneeId: task.assigneeId,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      });
    } else {
      // Set defaults for create mode
      form.setFieldsValue({
        status: "TODO",
        priority: "MEDIUM",
        projectId: projectId,
      });
    }
  }, [task, projectId, isEditMode, form]);

  const handleSubmit = async (
    values: Record<
      string,
      string | number | boolean | dayjs.Dayjs | null | undefined
    >
  ) => {
    try {
      const taskData = {
        title: values.title,
        description: values.description || undefined,
        status: values.status,
        priority: values.priority,
        projectId: values.projectId,
        assigneeId: values.assigneeId || undefined,
        dueDate:
          values.dueDate && dayjs.isDayjs(values.dueDate)
            ? values.dueDate.toISOString()
            : undefined,
      };

      let result: Task;

      if (isEditMode && task) {
        await updateTask(task.id, taskData as UpdateTaskData);
        result = { ...task, ...taskData } as Task;
        message.success("Task updated successfully");
      } else {
        result = await createTask(taskData as CreateTaskData);
        message.success("Task created successfully");
      }

      onSuccess?.(result);

      if (!isEditMode) {
        form.resetFields();
      }
    } catch {
      message.error(
        isEditMode ? "Failed to update task" : "Failed to create task"
      );
    }
  };

  const handleReset = () => {
    if (isEditMode && task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        projectId: task.projectId,
        assigneeId: task.assigneeId,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      });
    } else {
      form.resetFields();
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "#1890ff";
      case "IN_PROGRESS":
        return "#faad14";
      case "DONE":
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "HIGH":
        return "#ff4d4f";
      case "MEDIUM":
        return "#faad14";
      case "LOW":
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Title level={3} className="!mb-2">
          {isEditMode ? "Edit Task" : "Create New Task"}
        </Title>
        <Typography.Text type="secondary">
          {isEditMode
            ? "Update the task details below"
            : "Fill in the details to create a new task"}
        </Typography.Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        size="large"
        className="space-y-4"
      >
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            {/* Title */}
            <Form.Item
              name="title"
              label="Task Title"
              rules={[
                { required: true, message: "Please enter a task title" },
                { min: 3, message: "Title must be at least 3 characters" },
                { max: 200, message: "Title must be less than 200 characters" },
              ]}
            >
              <Input
                placeholder="Enter a clear, descriptive task title"
                showCount
                maxLength={200}
              />
            </Form.Item>

            {/* Description */}
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  max: 1000,
                  message: "Description must be less than 1000 characters",
                },
              ]}
            >
              <TextArea
                placeholder="Provide additional details about the task (optional)"
                rows={4}
                showCount
                maxLength={1000}
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            {/* Project */}
            <Form.Item
              name="projectId"
              label="Project"
              rules={[{ required: true, message: "Please select a project" }]}
            >
              <Select
                placeholder="Select a project"
                suffixIcon={<ProjectOutlined />}
                disabled={!!projectId} // Disable if pre-selected
              >
                {projects.map((project) => (
                  <Option key={project.id} value={project.id}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color || "#6366f1" }}
                      />
                      <span>{project.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Status */}
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Select status">
                <Option value="TODO">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor("TODO") }}
                    />
                    <span>To Do</span>
                  </div>
                </Option>
                <Option value="IN_PROGRESS">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor("IN_PROGRESS") }}
                    />
                    <span>In Progress</span>
                  </div>
                </Option>
                <Option value="DONE">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor("DONE") }}
                    />
                    <span>Done</span>
                  </div>
                </Option>
              </Select>
            </Form.Item>

            {/* Priority */}
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: "Please select a priority" }]}
            >
              <Select
                placeholder="Select priority"
                suffixIcon={<FlagOutlined />}
              >
                <Option value="HIGH">
                  <div className="flex items-center space-x-2">
                    <FlagOutlined style={{ color: getPriorityColor("HIGH") }} />
                    <span>High Priority</span>
                  </div>
                </Option>
                <Option value="MEDIUM">
                  <div className="flex items-center space-x-2">
                    <FlagOutlined
                      style={{ color: getPriorityColor("MEDIUM") }}
                    />
                    <span>Medium Priority</span>
                  </div>
                </Option>
                <Option value="LOW">
                  <div className="flex items-center space-x-2">
                    <FlagOutlined style={{ color: getPriorityColor("LOW") }} />
                    <span>Low Priority</span>
                  </div>
                </Option>
              </Select>
            </Form.Item>

            {/* Assignee */}
            <Form.Item name="assigneeId" label="Assignee">
              <Select
                placeholder="Assign to someone (optional)"
                allowClear
                suffixIcon={<UserOutlined />}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {users.map((user: User) => (
                  <Option key={user.id} value={user.id} label={user.name}>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Due Date */}
            <Form.Item name="dueDate" label="Due Date">
              <DatePicker
                className="w-full"
                placeholder="Select due date (optional)"
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Form Actions */}
        <div className="pt-6 border-t">
          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={handleReset} disabled={isFormLoading}>
                  Reset
                </Button>
                <Button onClick={onCancel} disabled={isFormLoading}>
                  <CloseOutlined />
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isFormLoading}
                  icon={<SaveOutlined />}
                >
                  {isEditMode ? "Update Task" : "Create Task"}
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
}

export default TaskForm;
