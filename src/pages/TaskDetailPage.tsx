import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Spin,
  Alert,
  Descriptions,
  Tag,
  Avatar,
  Space,
  Card,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  FlagOutlined,
  ClockCircleOutlined,
  ProjectOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useTaskStore } from "../stores/taskStore";
import { useAuthStore } from "../stores/authStore";
import TaskModal from "../components/features/tasks/TaskModal";
import { ROUTES } from "../constants";

const { Title, Text, Paragraph } = Typography;

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedTask, isLoading, error, getTask, deleteTask, clearError } =
    useTaskStore();
  const { user } = useAuthStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch task on mount
  useEffect(() => {
    if (id) {
      getTask(id);
    }
  }, [id, getTask]);

  // Check if current user can manage this task
  const canManage =
    user?.role === "ADMIN" ||
    user?.id === selectedTask?.project?.owner?.id ||
    user?.id === selectedTask?.assigneeId;

  const handleEditTask = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    // Simple confirmation dialog
    if (
      window.confirm(
        "Are you sure you want to delete this task? This action cannot be undone."
      )
    ) {
      try {
        await deleteTask(selectedTask.id);
        navigate(ROUTES.TASKS);
      } catch {
        // Error is handled by the store
      }
    }
  };

  const handleBack = () => {
    // If we came from a project page, go back to that project
    if (selectedTask?.projectId) {
      navigate(`${ROUTES.PROJECTS}/${selectedTask.projectId}`);
    } else {
      navigate(ROUTES.TASKS);
    }
  };

  const handleTaskSuccess = (/* updatedTask: Task */) => {
    setIsEditModalOpen(false);
    // The task store will be updated automatically via the modal
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "blue";
      case "IN_PROGRESS":
        return "orange";
      case "DONE":
        return "green";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "TODO":
        return "To Do";
      case "IN_PROGRESS":
        return "In Progress";
      case "DONE":
        return "Done";
      default:
        return "Unknown";
    }
  };

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} days overdue`,
        color: "#ff4d4f",
        urgent: true,
      };
    } else if (diffDays === 0) {
      return {
        text: "Due today",
        color: "#faad14",
        urgent: true,
      };
    } else if (diffDays === 1) {
      return {
        text: "Due tomorrow",
        color: "#faad14",
        urgent: false,
      };
    } else if (diffDays <= 7) {
      return {
        text: `Due in ${diffDays} days`,
        color: "#1890ff",
        urgent: false,
      };
    } else {
      return {
        text: date.toLocaleDateString(),
        color: "#8c8c8c",
        urgent: false,
      };
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={clearError}
          className="mb-4"
        />
        <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
          Back to Tasks
        </Button>
      </div>
    );
  }

  if (isLoading || !selectedTask) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" tip="Loading task..." />
      </div>
    );
  }

  const dueDate = formatDueDate(selectedTask.dueDate);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back to {selectedTask.project?.name || "Tasks"}
          </Button>

          <div className="flex items-center space-x-3">
            {/* Status Indicator */}
            <div
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor:
                  getStatusColor(selectedTask.status) === "blue"
                    ? "#1890ff"
                    : getStatusColor(selectedTask.status) === "orange"
                    ? "#faad14"
                    : "#52c41a",
              }}
            />
            <FileTextOutlined className="text-gray-500 text-xl" />
            <Title level={2} className="!mb-0">
              {selectedTask.title}
            </Title>
          </div>
        </div>

        <Space>
          {canManage && (
            <>
              <Button icon={<EditOutlined />} onClick={handleEditTask}>
                Edit Task
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDeleteTask}
              >
                Delete Task
              </Button>
            </>
          )}
        </Space>
      </div>

      {/* Task Information */}
      <Card className="mb-6">
        <Descriptions title="Task Details" column={2} bordered>
          <Descriptions.Item label="Title" span={2}>
            <Text strong className="text-lg">
              {selectedTask.title}
            </Text>
          </Descriptions.Item>

          {selectedTask.description && (
            <Descriptions.Item label="Description" span={2}>
              <Paragraph className="!mb-0 whitespace-pre-wrap">
                {selectedTask.description}
              </Paragraph>
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Status">
            <Tag
              color={getStatusColor(selectedTask.status)}
              className="text-sm px-3 py-1"
            >
              {getStatusLabel(selectedTask.status)}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Priority">
            <div className="flex items-center space-x-2">
              <FlagOutlined
                style={{
                  color: getPriorityColor(selectedTask.priority),
                  fontSize: "16px",
                }}
              />
              <Tag
                style={{
                  backgroundColor:
                    getPriorityColor(selectedTask.priority) + "20",
                  borderColor: getPriorityColor(selectedTask.priority),
                  color: getPriorityColor(selectedTask.priority),
                }}
                className="text-sm px-3 py-1 font-medium"
              >
                {selectedTask.priority}
              </Tag>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Project">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor: selectedTask.project?.color || "#6366f1",
                }}
              />
              <ProjectOutlined style={{ color: "#6b7280" }} />
              <Text>{selectedTask.project?.name || "No Project"}</Text>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Assignee">
            {selectedTask.assignee ? (
              <div className="flex items-center space-x-2">
                <Avatar
                  size="small"
                  src={selectedTask.assignee.avatarUrl}
                  icon={<UserOutlined />}
                >
                  {selectedTask.assignee.name.charAt(0).toUpperCase()}
                </Avatar>
                <Text>{selectedTask.assignee.name}</Text>
                <Text type="secondary">({selectedTask.assignee.email})</Text>
              </div>
            ) : (
              <Text type="secondary" className="flex items-center space-x-2">
                <UserOutlined />
                <span>Unassigned</span>
              </Text>
            )}
          </Descriptions.Item>

          {selectedTask.dueDate && (
            <Descriptions.Item label="Due Date">
              <div className="flex items-center space-x-2">
                <ClockCircleOutlined style={{ color: dueDate?.color }} />
                <Text
                  style={{
                    color: dueDate?.color,
                    fontWeight: dueDate?.urgent ? 600 : 400,
                  }}
                >
                  {dueDate?.text}
                </Text>
                {dueDate?.urgent && (
                  <Tag color="red" className="text-xs">
                    URGENT
                  </Tag>
                )}
              </div>
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Position">
            <Text>Position {selectedTask.position}</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Created">
            <div className="flex items-center space-x-2">
              <CalendarOutlined style={{ color: "#8c8c8c" }} />
              <Text>
                {new Date(selectedTask.createdAt).toLocaleDateString()}
              </Text>
              <Text type="secondary">
                at {new Date(selectedTask.createdAt).toLocaleTimeString()}
              </Text>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Last Updated">
            <div className="flex items-center space-x-2">
              <CalendarOutlined style={{ color: "#8c8c8c" }} />
              <Text>
                {new Date(selectedTask.updatedAt).toLocaleDateString()}
              </Text>
              <Text type="secondary">
                at {new Date(selectedTask.updatedAt).toLocaleTimeString()}
              </Text>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Task ID">
            <Text code className="text-xs font-mono">
              #{selectedTask.id.slice(-8)}
            </Text>
          </Descriptions.Item>

          <Descriptions.Item label="Full Task ID">
            <Text code className="text-xs font-mono" copyable>
              {selectedTask.id}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Project Information (if available) */}
      {selectedTask.project && (
        <Card title="Project Information" className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  backgroundColor: selectedTask.project.color || "#6366f1",
                }}
              />
              <div>
                <Text strong className="text-lg">
                  {selectedTask.project.name}
                </Text>
                {selectedTask.project.owner && (
                  <div className="flex items-center space-x-2 mt-1">
                    <Text type="secondary" className="text-sm">
                      Owner:
                    </Text>
                    <Avatar
                      size="small"
                      src={selectedTask.project.owner.avatarUrl}
                    >
                      {selectedTask.project.owner.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Text className="text-sm">
                      {selectedTask.project.owner.name}
                    </Text>
                  </div>
                )}
              </div>
            </div>
            <Button
              type="link"
              onClick={() =>
                navigate(`${ROUTES.PROJECTS}/${selectedTask.project?.id}`)
              }
            >
              View Project →
            </Button>
          </div>
        </Card>
      )}

      {/* Task Actions */}
      {canManage && (
        <Card title="Actions" className="mb-6">
          <Space size="large">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditTask}
              size="large"
            >
              Edit Task
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteTask}
              size="large"
            >
              Delete Task
            </Button>
          </Space>
        </Card>
      )}

      {/* Edit Task Modal */}
      <TaskModal
        open={isEditModalOpen}
        task={selectedTask}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleTaskSuccess}
        projectId={selectedTask.projectId}
      />
    </div>
  );
}
