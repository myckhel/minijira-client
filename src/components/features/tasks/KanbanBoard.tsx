import { useState, useEffect, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { message, Spin, Alert } from "antd";
import { useTaskStore } from "../../../stores/taskStore";
import BoardColumn from "./BoardColumn";
import DraggableTask from "./DraggableTask";
import type { Task, TaskStatus } from "../../../types";

interface KanbanBoardProps {
  projectId?: string;
}

interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { tasks, fetchTasks, reorderTasks, isLoading, error, clearError } =
    useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks(projectId ? { projectId } : {});
  }, [projectId, fetchTasks]);

  // Organize tasks into columns
  const columns: Column[] = useMemo(() => {
    const todoTasks = tasks.filter((task) => task.status === "TODO");
    const inProgressTasks = tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    );
    const doneTasks = tasks.filter((task) => task.status === "DONE");

    // Sort tasks by position within each column
    const sortByPosition = (a: Task, b: Task) => a.position - b.position;

    return [
      {
        id: "TODO",
        title: "To Do",
        color: "#1890ff",
        tasks: todoTasks.sort(sortByPosition),
      },
      {
        id: "IN_PROGRESS",
        title: "In Progress",
        color: "#faad14",
        tasks: inProgressTasks.sort(sortByPosition),
      },
      {
        id: "DONE",
        title: "Done",
        color: "#52c41a",
        tasks: doneTasks.sort(sortByPosition),
      },
    ];
  }, [tasks]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    // Determine if we're dropping on a column or another task
    const overId = over.id as string;
    let newStatus: TaskStatus;
    let newPosition: number;

    // Check if dropping on a column
    if (["TODO", "IN_PROGRESS", "DONE"].includes(overId)) {
      newStatus = overId as TaskStatus;
      const column = columns.find((col) => col.id === newStatus);
      newPosition = column ? column.tasks.length : 0;
    } else {
      // Dropping on another task
      const overTask = tasks.find((t) => t.id === overId);
      if (!overTask) return;

      newStatus = overTask.status;
      const column = columns.find((col) => col.id === newStatus);
      if (!column) return;

      // Find the position of the task we're dropping on
      const overTaskIndex = column.tasks.findIndex((t) => t.id === overId);

      // If moving within the same column, adjust position
      if (task.status === newStatus) {
        const activeTaskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (activeTaskIndex === overTaskIndex) return; // No change

        const reorderedTasks = arrayMove(
          column.tasks,
          activeTaskIndex,
          overTaskIndex
        );
        newPosition = overTaskIndex;

        // Update positions for all tasks in this column
        const taskUpdates = reorderedTasks.map((t, index) => ({
          id: t.id,
          position: index,
          status: newStatus,
        }));

        try {
          await reorderTasks(task.projectId, taskUpdates);
          message.success("Tasks reordered successfully");
        } catch {
          message.error("Failed to reorder tasks");
        }
        return;
      } else {
        newPosition = overTaskIndex;
      }
    }

    // If status hasn't changed and we're not reordering, do nothing
    if (task.status === newStatus && task.position === newPosition) {
      return;
    }

    try {
      // Calculate new positions for affected tasks
      const sourceColumn = columns.find((col) => col.id === task.status);
      const targetColumn = columns.find((col) => col.id === newStatus);

      if (!sourceColumn || !targetColumn) return;

      const taskUpdates: Array<{
        id: string;
        position: number;
        status?: string;
      }> = [];

      if (task.status === newStatus) {
        // Moving within the same column
        const columnTasks = [...targetColumn.tasks];
        const taskIndex = columnTasks.findIndex((t) => t.id === taskId);
        const reorderedTasks = arrayMove(columnTasks, taskIndex, newPosition);

        reorderedTasks.forEach((t, index) => {
          taskUpdates.push({
            id: t.id,
            position: index,
            status: newStatus,
          });
        });
      } else {
        // Moving to a different column
        taskUpdates.push({
          id: taskId,
          position: newPosition,
          status: newStatus,
        });

        // Update positions in source column
        sourceColumn.tasks
          .filter((t) => t.id !== taskId)
          .forEach((t, index) => {
            taskUpdates.push({
              id: t.id,
              position: index,
            });
          });

        // Update positions in target column
        targetColumn.tasks.forEach((t, index) => {
          const adjustedIndex = index >= newPosition ? index + 1 : index;
          taskUpdates.push({
            id: t.id,
            position: adjustedIndex,
          });
        });
      }

      await reorderTasks(task.projectId, taskUpdates);
      message.success(
        task.status !== newStatus
          ? `Task moved to ${newStatus.replace("_", " ").toLowerCase()}`
          : "Task reordered successfully"
      );
    } catch {
      message.error("Failed to move task");
    }
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
        />
      </div>
    );
  }

  return (
    <div className="h-full p-2 sm:p-4 lg:p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Responsive Layout: Always horizontal with enhanced gaps and shadows */}
        <div className="flex gap-4 sm:gap-6 lg:gap-8 h-full overflow-hidden">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-1 min-w-0 w-full max-w-[calc(100vw/3-1rem)] sm:max-w-none"
            >
              <BoardColumn column={column} />
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="transform rotate-2 opacity-90">
              <DraggableTask task={activeTask} isDragging />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {isLoading && tasks.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Loading tasks..." />
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
