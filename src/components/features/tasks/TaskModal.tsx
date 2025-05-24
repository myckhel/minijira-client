import { Modal } from "antd";
import TaskForm from "./TaskForm";
import type { Task } from "../../../types";

interface TaskModalProps {
  open: boolean;
  task?: Task; // If provided, this is edit mode
  projectId?: string; // Pre-selected project for create mode
  onClose: () => void;
  onSuccess?: (task: Task) => void;
}

function TaskModal({
  open,
  task,
  projectId,
  onClose,
  onSuccess,
}: TaskModalProps) {
  const handleSuccess = (savedTask: Task) => {
    onSuccess?.(savedTask);
    onClose();
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      destroyOnClose
      className="task-modal"
    >
      <TaskForm
        task={task}
        projectId={projectId}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default TaskModal;
