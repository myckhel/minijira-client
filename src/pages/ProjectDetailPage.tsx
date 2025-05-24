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
  Empty,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  FolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProjectStore } from "../stores/projectStore";
import { useAuthStore } from "../stores/authStore";
import { ProjectModal } from "../components/features/projects";
import type { UpdateProjectData } from "../types";
import { ROUTES } from "../constants";

const { Title, Text } = Typography;

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedProject,
    isLoading,
    error,
    getProject,
    updateProject,
    clearError,
  } = useProjectStore();
  const { user } = useAuthStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch project on mount
  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, [id, getProject]);

  // Check if current user can manage this project
  const canManage =
    user?.role === "ADMIN" || user?.id === selectedProject?.ownerId;

  const handleEditProject = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = async (data: UpdateProjectData) => {
    if (!selectedProject) return;

    await updateProject(selectedProject.id, data);
    setIsEditModalOpen(false);
  };

  const handleBack = () => {
    navigate(ROUTES.PROJECTS);
  };

  const handleCreateTask = () => {
    // Navigate to tasks page with this project pre-selected
    navigate(`${ROUTES.TASKS}?projectId=${selectedProject?.id}`);
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
          Back to Projects
        </Button>
      </div>
    );
  }

  if (isLoading || !selectedProject) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" tip="Loading project..." />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back to Projects
          </Button>

          <div className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: selectedProject.color || "#6366f1" }}
            />
            <FolderOutlined className="text-gray-500 text-xl" />
            <Title level={2} className="!mb-0">
              {selectedProject.name}
            </Title>
          </div>
        </div>

        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTask}
          >
            Create Task
          </Button>

          {canManage && (
            <Button icon={<EditOutlined />} onClick={handleEditProject}>
              Edit Project
            </Button>
          )}
        </Space>
      </div>

      {/* Project Information */}
      <Card className="mb-6">
        <Descriptions title="Project Details" column={2} bordered>
          <Descriptions.Item label="Name" span={2}>
            {selectedProject.name}
          </Descriptions.Item>

          {selectedProject.description && (
            <Descriptions.Item label="Description" span={2}>
              {selectedProject.description}
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Color">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: selectedProject.color || "#6366f1" }}
              />
              <Text>{selectedProject.color || "#6366f1"}</Text>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Task Count">
            <Tag color="blue">{selectedProject._count?.tasks || 0} tasks</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Owner">
            <div className="flex items-center space-x-2">
              <Avatar size="small" src={selectedProject.owner.avatarUrl}>
                {selectedProject.owner.name.charAt(0).toUpperCase()}
              </Avatar>
              <Text>{selectedProject.owner.name}</Text>
              <Text type="secondary">({selectedProject.owner.email})</Text>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            {user?.id === selectedProject.ownerId ? (
              <Tag color="green">Owner</Tag>
            ) : user?.role === "ADMIN" ? (
              <Tag color="purple">Admin</Tag>
            ) : (
              <Tag color="blue">Viewer</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Created">
            {new Date(selectedProject.createdAt).toLocaleDateString()}
          </Descriptions.Item>

          <Descriptions.Item label="Last Updated">
            {new Date(selectedProject.updatedAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Tasks Section */}
      <Card title="Project Tasks">
        {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
          <div className="space-y-3">
            {selectedProject.tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <Tag
                    color={
                      task.status === "DONE"
                        ? "green"
                        : task.status === "IN_PROGRESS"
                        ? "orange"
                        : "blue"
                    }
                  >
                    {task.status.replace("_", " ")}
                  </Tag>
                  <Text strong>{task.title}</Text>
                  {task.assignee && (
                    <div className="flex items-center space-x-1">
                      <Avatar size="small" src={task.assignee.avatarUrl}>
                        {task.assignee.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Text type="secondary" className="text-xs">
                        {task.assignee.name}
                      </Text>
                    </div>
                  )}
                </div>
                <Text type="secondary" className="text-xs">
                  {new Date(task.createdAt).toLocaleDateString()}
                </Text>
              </div>
            ))}

            {selectedProject.tasks.length > 5 && (
              <div className="text-center pt-3">
                <Button type="link" onClick={handleCreateTask}>
                  View all {selectedProject.tasks.length} tasks →
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Empty
            description="No tasks found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateTask}
            >
              Create First Task
            </Button>
          </Empty>
        )}
      </Card>

      {/* Edit Project Modal */}
      <ProjectModal
        isOpen={isEditModalOpen}
        project={selectedProject}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateProject}
        isLoading={isLoading}
      />
    </div>
  );
}
