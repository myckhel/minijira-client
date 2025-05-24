import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ProjectList, ProjectModal } from "../components/features/projects";
import { useProjectStore } from "../stores/projectStore";
import type { Project, CreateProjectData, UpdateProjectData } from "../types";
import { ROUTES } from "../constants";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { createProject, updateProject, deleteProject, isLoading } =
    useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  // Handle create project
  const handleCreateProject = () => {
    setEditingProject(undefined);
    setIsModalOpen(true);
  };

  // Handle edit project
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  // Handle delete project
  const handleDeleteProject = async (project: Project) => {
    try {
      await deleteProject(project.id);
      message.success(`Project "${project.name}" deleted successfully`);
    } catch (error) {
      message.error("Failed to delete project");
    }
  };

  // Handle select project (navigate to project detail)
  const handleSelectProject = (project: Project) => {
    navigate(ROUTES.PROJECT_DETAIL.replace(":id", project.id));
  };

  // Handle modal submit
  const handleModalSubmit = async (
    data: CreateProjectData | UpdateProjectData
  ) => {
    try {
      if (editingProject) {
        // Update existing project
        await updateProject(editingProject.id, data);
        message.success(`Project "${data.name}" updated successfully`);
      } else {
        // Create new project
        const newProject = await createProject(data as CreateProjectData);
        message.success(`Project "${newProject.name}" created successfully`);
      }

      setIsModalOpen(false);
      setEditingProject(undefined);
    } catch (error) {
      // Error message is handled by the store and displayed by the form
      throw error;
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(undefined);
  };

  return (
    <div className="p-6">
      <ProjectList
        onCreateProject={handleCreateProject}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        onSelectProject={handleSelectProject}
      />

      <ProjectModal
        isOpen={isModalOpen}
        project={editingProject}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
