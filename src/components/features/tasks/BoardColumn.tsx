import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, Badge, Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableTask from "./DraggableTask";
import type { Task, TaskStatus } from "../../../types";

interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

interface BoardColumnProps {
  column: Column;
}

function BoardColumn({ column }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleAddTask = () => {
    // TODO: Implement task creation modal
    console.log(`Add task to ${column.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-full transition-all duration-200 ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <Card
        size="small"
        className={`flex-1 shadow-sm ${
          isOver ? "border-blue-400 shadow-md" : ""
        }`}
        bodyStyle={{ padding: 0, height: "100%" }}
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span className="font-medium">{column.title}</span>
              <Badge
                count={column.tasks.length}
                style={{ backgroundColor: column.color }}
              />
            </div>
            <Button
              type="text"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddTask}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        }
      >
        <div className="p-3 h-full">
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3 min-h-[200px]">
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <DraggableTask key={task.id} task={task} />
                ))
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                    isOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span className="text-gray-400 text-sm">
                        {isOver ? "Drop task here" : "No tasks"}
                      </span>
                    }
                  />
                </div>
              )}
            </div>
          </SortableContext>
        </div>
      </Card>
    </div>
  );
}

export default BoardColumn;
