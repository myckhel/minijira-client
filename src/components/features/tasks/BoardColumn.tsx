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
      className={`flex flex-col h-full min-h-[400px] transition-all duration-200 ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <Card
        size="small"
        className={`
          flex-1 border border-gray-200 transition-all duration-300 ease-out rounded-xl
          ${
            isOver
              ? "border-blue-400 shadow-lg shadow-blue-200/30 bg-blue-50/30"
              : "shadow-md hover:shadow-lg hover:border-gray-300"
          }
          backdrop-blur-sm bg-white/95
        `}
        bodyStyle={{ padding: 0, height: "100%" }}
        headStyle={{
          background: `linear-gradient(135deg, ${column.color}08 0%, ${column.color}15 50%, #fafafa 100%)`,
          borderBottom: `3px solid ${column.color}30`,
          padding: "12px 16px sm:16px sm:20px",
          borderRadius: "12px 12px 0 0",
          position: "relative",
          overflow: "hidden",
        }}
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full ring-2 ring-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: column.color }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80" />
              </div>
              <span className="font-bold text-sm lg:text-base text-gray-800 tracking-wide">
                {column.title}
              </span>
              <Badge
                count={column.tasks.length}
                style={{
                  backgroundColor: column.color,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
                className="text-xs font-bold"
              />
            </div>
            <Button
              type="text"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddTask}
              className="text-gray-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg hover:scale-110 active:scale-95 min-w-[32px] h-8 sm:min-w-[36px] sm:h-9"
            />
          </div>
        }
      >
        <div className="p-2 sm:p-3 lg:p-4 h-full overflow-y-auto bg-gradient-to-b from-gray-50/30 to-gray-50/80 backdrop-blur-sm">
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 sm:space-y-3 xl:space-y-4 min-h-[200px] xl:min-h-[250px]">
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <DraggableTask key={task.id} task={task} />
                ))
              ) : (
                <div
                  className={`
                    border-2 border-dashed rounded-2xl p-6 sm:p-8 xl:p-10 text-center 
                    transition-all duration-300 ease-out relative overflow-hidden
                    ${
                      isOver
                        ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-102 transform"
                        : "border-gray-300 bg-gradient-to-br from-gray-50/70 to-gray-100/50 hover:bg-gradient-to-br hover:from-gray-100/80 hover:to-gray-200/60 hover:border-gray-400"
                    }
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
                  `}
                >
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span
                        className={`font-medium text-xs sm:text-sm xl:text-base transition-colors duration-200 ${
                          isOver ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
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
