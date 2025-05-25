import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Avatar, Typography, Tooltip, Tag } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import type { Task } from "../../../types";

const { Text, Paragraph } = Typography;

interface DraggableTaskProps {
  task: Task;
  isDragging?: boolean;
}

function DraggableTask({ task, isDragging = false }: DraggableTaskProps) {
  const navigate = useNavigate();
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

  // Track mouse events to distinguish clicks from drags
  const mouseDownPos = useRef<{ x: number; y: number } | null>(null);
  const isDragStarted = useRef(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    opacity: isDragging || isSortableDragging ? 0.7 : 1,
    zIndex: isDragging || isSortableDragging ? 1000 : "auto",
    marginBottom: "10px",
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    isDragStarted.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDownPos.current) {
      const deltaX = Math.abs(e.clientX - mouseDownPos.current.x);
      const deltaY = Math.abs(e.clientY - mouseDownPos.current.y);
      // If mouse moved more than 5px, consider it a drag
      if (deltaX > 5 || deltaY > 5) {
        isDragStarted.current = true;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // Only navigate if it wasn't a drag and not currently in drag state
    if (
      !isDragStarted.current &&
      !isDragging &&
      !isSortableDragging &&
      mouseDownPos.current
    ) {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/tasks/${task.id}`);
    }
    mouseDownPos.current = null;
    isDragStarted.current = false;
  };

  const getPriorityLabel = (priority: string) => {
    const colors = {
      HIGH: { bg: "#fff2f0", border: "#ffccc7", text: "#ff4d4f" },
      MEDIUM: { bg: "#fffbe6", border: "#ffe58f", text: "#faad14" },
      LOW: { bg: "#f6ffed", border: "#d9f7be", text: "#52c41a" },
    };

    const colorScheme = colors[priority as keyof typeof colors] || colors.LOW;

    return (
      <Tag
        style={{
          backgroundColor: colorScheme.bg,
          borderColor: colorScheme.border,
          color: colorScheme.text,
          fontSize: "10px",
          lineHeight: "16px",
          padding: "0 6px",
          margin: 0,
          fontWeight: 500,
        }}
      >
        {priority}
      </Tag>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "#3b82f6"; // Blue
      case "IN_PROGRESS":
        return "#f59e0b"; // Amber
      case "DONE":
        return "#10b981"; // Emerald
      default:
        return "#6b7280"; // Gray
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

  const dueDate = formatDueDate(task.dueDate);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      size="small"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`
        group cursor-grab active:cursor-grabbing hover:cursor-pointer
        transition-all duration-300 ease-out
        border border-gray-200
        hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50
        hover:-translate-y-1 hover:scale-[1.02]
        active:scale-95 active:shadow-md
        ${
          isDragging || isSortableDragging
            ? "shadow-xl shadow-blue-200/50 scale-105 rotate-2 border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50"
            : "shadow-sm hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-indigo-50/30"
        }
        bg-white backdrop-blur-sm overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-gray-50/20 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100
        relative
      `}
      bodyStyle={{ padding: "16px", height: "100%", borderRadius: "12px" }}
    >
      <div className="space-y-2 sm:space-y-3 h-full flex flex-col">
        {/* Header: Priority and Status Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getPriorityLabel(task.priority)}
          </div>

          {/* Enhanced Status Indicator */}
          <Tooltip title={getStatusLabel(task.status)}>
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg ring-1 ring-gray-100 transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: getStatusColor(task.status) }}
            />
          </Tooltip>
        </div>

        {/* Task Title */}
        <div className="flex-1">
          <Paragraph
            className="!mb-0 font-semibold text-gray-900 leading-snug group-hover:text-blue-900 transition-colors duration-200"
            ellipsis={{ rows: 2, tooltip: task.title }}
            style={{ fontSize: "14px", lineHeight: "1.4" }}
          >
            {task.title}
          </Paragraph>

          {/* Task Description */}
          {task.description && (
            <Paragraph
              className="!mb-0 !mt-2 text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200"
              ellipsis={{ rows: 2, tooltip: task.description }}
              style={{ fontSize: "12px", lineHeight: "1.4" }}
            >
              {task.description}
            </Paragraph>
          )}
        </div>

        {/* Metadata Section */}
        <div className="space-y-2">
          {/* Project and Priority Row */}
          <div className="flex items-center justify-between">
            {/* Enhanced Project Display */}
            <Tooltip title={task.project?.name || "No Project"}>
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div
                  className="w-3 h-3 rounded-full border border-white shadow-sm ring-1 ring-gray-200 flex-shrink-0"
                  style={{ backgroundColor: task.project?.color || "#6366f1" }}
                />
                <Text
                  className="text-xs sm:text-xs text-gray-600 font-medium truncate"
                  style={{ maxWidth: "100px" }}
                >
                  {task.project?.name || "No Project"}
                </Text>
              </div>
            </Tooltip>

            {/* Assignee Avatar */}
            <div className="flex items-center">
              {task.assignee ? (
                <Tooltip title={task.assignee.name}>
                  <Avatar
                    size={24}
                    src={task.assignee.avatarUrl}
                    icon={<UserOutlined />}
                    className="border-2 border-white shadow-md transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: task.assignee.avatarUrl
                        ? undefined
                        : "#6366f1",
                      fontWeight: 600,
                    }}
                  >
                    {task.assignee.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ) : (
                <Tooltip title="Unassigned">
                  <Avatar
                    size={24}
                    icon={<UserOutlined />}
                    className="bg-gray-400 border-2 border-white shadow-md"
                  />
                </Tooltip>
              )}
            </div>
          </div>

          {/* Due Date Row */}
          <div className="flex items-center justify-between">
            {/* Due Date */}
            {dueDate ? (
              <div
                className={`
                flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200
                ${
                  dueDate.urgent
                    ? "bg-red-50 border border-red-200"
                    : "bg-gray-50 border border-gray-200"
                }
              `}
              >
                <ClockCircleOutlined
                  style={{
                    color: dueDate.color,
                    fontSize: "11px",
                  }}
                />
                <Text
                  style={{
                    color: dueDate.color,
                    fontSize: "11px",
                    fontWeight: dueDate.urgent ? 600 : 400,
                  }}
                >
                  {dueDate.text}
                </Text>
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* Task ID */}
          <div className="pt-2 border-t border-gray-100">
            <Text
              type="secondary"
              className="text-xs font-mono opacity-50 transition-opacity duration-200"
            >
              #{task.id.slice(-8)}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DraggableTask;
