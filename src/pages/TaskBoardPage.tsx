import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography, Select, Button, Space, Card } from "antd";
import { PlusOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useProjectStore } from "../stores/projectStore";
import KanbanBoard from "../components/features/tasks/KanbanBoard";
import TaskModal from "../components/features/tasks/TaskModal";
import type { Task } from "../types";

const { Title } = Typography;
const { Option } = Select;

export default function TaskBoardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, fetchProjects } = useProjectStore();
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(searchParams.get("projectId") || undefined);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Auto-select first project if none selected and projects exist
  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      const firstProjectId = projects[0].id;
      setSelectedProjectId(firstProjectId);
      setSearchParams({ projectId: firstProjectId });
    }
  }, [projects, selectedProjectId, setSearchParams]);

  // Update URL when project selection changes
  const handleProjectChange = (projectId: string | undefined) => {
    setSelectedProjectId(projectId);
    if (projectId) {
      setSearchParams({ projectId });
    } else {
      setSearchParams({});
    }
  };

  const handleCreateTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
  };

  const handleTaskSuccess = (task: Task) => {
    // Task creation successful, modal will close automatically
    console.log("Task created successfully:", task);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Title level={2} className="!mb-1">
              Task Board
            </Title>
            <p className="text-gray-600 !mb-0">
              Manage tasks with drag-and-drop Kanban board
            </p>
          </div>

          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateTask}
              disabled={!selectedProjectId}
            >
              Create Task
            </Button>
          </Space>
        </div>

        {/* Project Filter */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Project:
              </span>
              <Select
                style={{ width: 300 }}
                placeholder="Select a project"
                value={selectedProjectId}
                onChange={handleProjectChange}
                allowClear
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
            </div>
          </div>

          {selectedProject && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>•</span>
                <span>{selectedProject._count?.tasks || 0} tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>•</span>
                <span>Owner: {selectedProject.owner?.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Board Content */}
      <div className="flex-1 overflow-hidden">
        {selectedProjectId ? (
          <KanbanBoard projectId={selectedProjectId} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <Card className="text-center max-w-md">
              <AppstoreOutlined className="text-6xl text-gray-300 mb-4" />
              <Title level={3} className="text-gray-600">
                Select a Project
              </Title>
              <p className="text-gray-500 mb-4">
                Choose a project from the dropdown above to view and manage its
                tasks on the Kanban board.
              </p>
              {projects.length === 0 && (
                <p className="text-sm text-gray-400">
                  No projects available. Create a project first to get started.
                </p>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Task Creation Modal */}
      <TaskModal
        open={isTaskModalOpen}
        onClose={handleTaskModalClose}
        onSuccess={handleTaskSuccess}
        projectId={selectedProjectId}
      />
    </div>
  );
}
