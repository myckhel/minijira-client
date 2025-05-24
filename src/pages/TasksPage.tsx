import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography, Button, Space, Segmented } from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProjectStore } from "../stores/projectStore";
import { useUserStore } from "../stores/userStore";
import KanbanBoard from "../components/features/tasks/KanbanBoard";
import TaskList from "../components/features/tasks/TaskList";
import TaskModal from "../components/features/tasks/TaskModal";
import type { Task } from "../types";

const { Title } = Typography;

type ViewMode = "list" | "board";

export default function TasksPage() {
  const [searchParams] = useSearchParams();
  const { fetchProjects } = useProjectStore();
  const { fetchUsers } = useUserStore();
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const selectedProjectId = searchParams.get("projectId") || undefined;

  // Fetch projects and users on mount
  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, [fetchProjects, fetchUsers]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Title level={2} className="!mb-1">
              Tasks
            </Title>
            <p className="text-gray-600 !mb-0">
              Manage and organize your project tasks
            </p>
          </div>

          <Space>
            <Segmented
              value={viewMode}
              onChange={setViewMode}
              options={[
                {
                  label: "List",
                  value: "list",
                  icon: <UnorderedListOutlined />,
                },
                {
                  label: "Board",
                  value: "board",
                  icon: <AppstoreOutlined />,
                },
              ]}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateTask}
            >
              Create Task
            </Button>
          </Space>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === "board" ? (
          <KanbanBoard projectId={selectedProjectId} />
        ) : (
          <div className="p-6">
            <TaskList
              projectId={selectedProjectId}
              onEditTask={handleEditTask}
            />
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        open={isTaskModalOpen}
        task={editingTask}
        onClose={handleCloseModal}
        projectId={selectedProjectId}
      />
    </div>
  );
}
