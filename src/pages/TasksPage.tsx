import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Typography, Button, Space, Segmented } from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProjectStore } from "../stores/projectStore";
import KanbanBoard from "../components/features/tasks/KanbanBoard";

const { Title } = Typography;

type ViewMode = "list" | "board";

export default function TasksPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchProjects } = useProjectStore();
  const [viewMode, setViewMode] = useState<ViewMode>("board");

  const selectedProjectId = searchParams.get("projectId") || undefined;

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateTask = () => {
    // TODO: Implement task creation modal
    console.log("Create task for project:", selectedProjectId);
  };

  const handleViewBoard = () => {
    navigate(
      `/board${selectedProjectId ? `?projectId=${selectedProjectId}` : ""}`
    );
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
            <p>Task list view - coming soon!</p>
            <Button onClick={handleViewBoard}>View Board Instead</Button>
          </div>
        )}
      </div>
    </div>
  );
}
