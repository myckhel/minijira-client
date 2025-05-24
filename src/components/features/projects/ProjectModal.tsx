import { Modal } from "antd";
import ProjectForm from "./ProjectForm";
import type {
  Project,
  CreateProjectData,
  UpdateProjectData,
} from "../../../types";

interface ProjectModalProps {
  isOpen: boolean;
  project?: Project;
  onClose: () => void;
  onSubmit: (data: CreateProjectData | UpdateProjectData) => Promise<void>;
  isLoading?: boolean;
}

export default function ProjectModal({
  isOpen,
  project,
  onClose,
  onSubmit,
  isLoading,
}: ProjectModalProps) {
  const title = project ? "Edit Project" : "Create New Project";

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <ProjectForm
        project={project}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
}
