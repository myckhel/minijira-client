import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Spin,
  Empty,
  Alert,
  Space,
  Typography,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../../types";
import { useProjectStore } from "../../../stores/projectStore";
import { useAuthStore } from "../../../stores/authStore";

const { Title } = Typography;
const { Search } = Input;

interface ProjectListProps {
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  onSelectProject: (project: Project) => void;
}

type ViewMode = "grid" | "list";
type SortBy = "name" | "createdAt" | "updatedAt" | "taskCount";

export default function ProjectList({
  onCreateProject,
  onEditProject,
  onDeleteProject,
  onSelectProject,
}: ProjectListProps) {
  const { projects, isLoading, error, fetchProjects, clearError } =
    useProjectStore();
  const { user } = useAuthStore();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("updatedAt");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects.filter(
      (project: Project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ??
          false) ||
        project.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort projects
    filtered.sort((a: Project, b: Project) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "updatedAt":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "taskCount":
          return (b._count?.tasks || 0) - (a._count?.tasks || 0);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchQuery, sortBy]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);
  };

  const sortOptions = [
    { value: "updatedAt", label: "Recently Updated" },
    { value: "createdAt", label: "Recently Created" },
    { value: "name", label: "Name (A-Z)" },
    { value: "taskCount", label: "Task Count" },
  ];

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
        <Button onClick={fetchProjects} type="primary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={2} className="!mb-2">
            Projects
          </Title>
          <p className="text-gray-600">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
            {user?.role === "ADMIN" ? " (all projects)" : " (your projects)"}
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreateProject}
          size="large"
        >
          Create Project
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
          <Search
            placeholder="Search projects..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            className="flex-1"
            allowClear
          />

          <Select
            value={sortBy}
            onChange={handleSortChange}
            options={sortOptions}
            className="w-full sm:w-48"
          />
        </div>

        {/* View Mode Toggle */}
        <Space.Compact>
          <Button
            type={viewMode === "grid" ? "primary" : "default"}
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            type={viewMode === "list" ? "primary" : "default"}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </Space.Compact>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Loading projects..." />
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="flex justify-center items-center py-12">
          {searchQuery ? (
            <Empty
              description={`No projects found matching "${searchQuery}"`}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </Empty>
          ) : (
            <Empty
              description="No projects found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onCreateProject}
              >
                Create Your First Project
              </Button>
            </Empty>
          )}
        </div>
      ) : (
        /* Projects Grid/List */
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
              onClick={onSelectProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
