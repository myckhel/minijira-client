import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Avatar, Typography, Tooltip } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import type { Task } from "../../../types";

const { Text, Paragraph } = Typography;

interface DraggableTaskProps {
  task: Task;
  isDragging?: boolean;
}

function DraggableTask({ task, isDragging = false }: DraggableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
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

  const getPriorityIcon = (priority: string) => {
    return <FlagOutlined style={{ color: getPriorityColor(priority) }} />;
  };

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: "#ff4d4f" };
    } else if (diffDays === 0) {
      return { text: "Due today", color: "#faad14" };
    } else if (diffDays === 1) {
      return { text: "Due tomorrow", color: "#faad14" };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, color: "#1890ff" };
    } else {
      return { text: date.toLocaleDateString(), color: "#8c8c8c" };
    }
  };

  const dueDate = formatDueDate(task.dueDate);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      size="small"
      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 ${
        isDragging || isSortableDragging ? "shadow-lg scale-105" : ""
      }`}
      bodyStyle={{ padding: "12px" }}
    >
      <div className="space-y-2">
        {/* Task Title */}
        <Paragraph
          className="!mb-0 font-medium text-gray-800 leading-tight"
          ellipsis={{ rows: 2, tooltip: task.title }}
        >
          {task.title}
        </Paragraph>

        {/* Task Description */}
        {task.description && (
          <Paragraph
            className="!mb-0 text-sm text-gray-600 leading-tight"
            ellipsis={{ rows: 2, tooltip: task.description }}
          >
            {task.description}
          </Paragraph>
        )}

        {/* Task Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Priority */}
            <Tooltip title={`Priority: ${task.priority}`}>
              {getPriorityIcon(task.priority)}
            </Tooltip>

            {/* Project Color */}
            <Tooltip title={task.project?.name || "Project"}>
              <div
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: task.project?.color || "#6366f1" }}
              />
            </Tooltip>
          </div>

          {/* Assignee */}
          {task.assignee && (
            <Tooltip title={task.assignee.name}>
              <Avatar
                size="small"
                src={task.assignee.avatarUrl}
                icon={<UserOutlined />}
              >
                {task.assignee.name.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          )}
        </div>

        {/* Due Date */}
        {dueDate && (
          <div className="flex items-center space-x-1">
            <ClockCircleOutlined
              style={{ color: dueDate.color, fontSize: "12px" }}
            />
            <Text style={{ color: dueDate.color, fontSize: "12px" }}>
              {dueDate.text}
            </Text>
          </div>
        )}

        {/* Task ID (for development) */}
        <Text type="secondary" className="text-xs">
          #{task.id.slice(-8)}
        </Text>
      </div>
    </Card>
  );
}

export default DraggableTask;
