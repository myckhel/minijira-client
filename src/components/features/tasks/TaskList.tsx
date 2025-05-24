import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Avatar,
  Button,
  Input,
  Select,
  Space,
  Typography,
  Tooltip,
  Dropdown,
  message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
  FlagOutlined,
  ClockCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useTaskStore } from "../../../stores/taskStore";
import { useProjectStore } from "../../../stores/projectStore";
import type { Task, TaskStatus, TaskPriority } from "../../../types";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface TaskListProps {
  projectId?: string;
  onEditTask?: (task: Task) => void;
  onCreateTask?: () => void;
}

function TaskList({ projectId, onEditTask }: TaskListProps) {
  const { tasks, isLoading, deleteTask, setFilters, filters } = useTaskStore();
  const { projects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by project if specified
    if (projectId) {
      result = result.filter((task) => task.projectId === projectId);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.project?.name.toLowerCase().includes(query) ||
          task.assignee?.name.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    return result;
  }, [tasks, projectId, searchQuery, filters]);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      message.success("Task deleted successfully");
    } catch {
      message.error("Failed to delete task");
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "blue";
      case "IN_PROGRESS":
        return "orange";
      case "DONE":
        return "green";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
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

  const columns: ColumnsType<Task> = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      width: "25%",
      render: (title: string, record: Task) => (
        <div>
          <div className="font-medium text-gray-900 mb-1">{title}</div>
          {record.description && (
            <Text type="secondary" className="text-sm">
              {record.description.slice(0, 100)}...
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: TaskStatus) => (
        <Tag color={getStatusColor(status)}>{status.replace("_", " ")}</Tag>
      ),
      filters: [
        { text: "To Do", value: "TODO" },
        { text: "In Progress", value: "IN_PROGRESS" },
        { text: "Done", value: "DONE" },
      ],
      onFilter: (value: boolean | React.Key, record: Task) =>
        record.status === value,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "8%",
      render: (priority: TaskPriority) => (
        <Tooltip title={`Priority: ${priority}`}>
          <FlagOutlined
            style={{
              color: getPriorityColor(priority),
              fontSize: "16px",
            }}
          />
        </Tooltip>
      ),
      filters: [
        { text: "High", value: "HIGH" },
        { text: "Medium", value: "MEDIUM" },
        { text: "Low", value: "LOW" },
      ],
      onFilter: (value: boolean | React.Key, record: Task) =>
        record.priority === value,
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      width: "15%",
      render: (project: Task["project"]) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full border border-gray-300"
            style={{ backgroundColor: project?.color || "#6366f1" }}
          />
          <Text>{project?.name || "Unknown"}</Text>
        </div>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: "12%",
      render: (assignee: Task["assignee"]) =>
        assignee ? (
          <div className="flex items-center space-x-2">
            <Avatar
              size="small"
              src={assignee.avatarUrl}
              icon={<UserOutlined />}
            >
              {assignee.name.charAt(0).toUpperCase()}
            </Avatar>
            <Text className="text-sm">{assignee.name}</Text>
          </div>
        ) : (
          <Text type="secondary" className="text-sm">
            Unassigned
          </Text>
        ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "12%",
      render: (dueDate: string) =>
        dueDate ? (
          <div className="flex items-center space-x-1">
            <ClockCircleOutlined className="text-gray-400" />
            <Text className="text-sm">
              {new Date(dueDate).toLocaleDateString()}
            </Text>
          </div>
        ) : (
          <Text type="secondary" className="text-sm">
            No due date
          </Text>
        ),
      sorter: (a: Task, b: Task) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return dateA - dateB;
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      render: (createdAt: string) => (
        <Text className="text-sm" type="secondary">
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      ),
      sorter: (a: Task, b: Task) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      width: "8%",
      render: (_: unknown, record: Task) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit Task",
                icon: <EditOutlined />,
                onClick: () => onEditTask?.(record),
              },
              {
                key: "delete",
                label: "Delete Task",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => {
                  // Simple confirm dialog
                  if (
                    window.confirm("Are you sure you want to delete this task?")
                  ) {
                    handleDeleteTask(record.id);
                  }
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            size="small"
            className="text-gray-500"
          />
        </Dropdown>
      ),
    },
  ];

  const handleTableChange: TableProps<Task>["onChange"] = (
    _pagination,
    tableFilters
  ) => {
    const newFilters: Record<string, string | undefined> = {};

    if (tableFilters?.status && tableFilters.status.length > 0) {
      newFilters.status = String(tableFilters.status[0]);
    }
    if (tableFilters?.priority && tableFilters.priority.length > 0) {
      newFilters.priority = String(tableFilters.priority[0]);
    }

    setFilters(newFilters);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div className="p-4 border-b bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="Search tasks..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-md"
          />

          <Space wrap>
            <Select
              placeholder="Filter by Status"
              allowClear
              style={{ width: 150 }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="TODO">To Do</Option>
              <Option value="IN_PROGRESS">In Progress</Option>
              <Option value="DONE">Done</Option>
            </Select>

            <Select
              placeholder="Filter by Priority"
              allowClear
              style={{ width: 150 }}
              value={filters.priority}
              onChange={(value) => setFilters({ ...filters, priority: value })}
            >
              <Option value="HIGH">High</Option>
              <Option value="MEDIUM">Medium</Option>
              <Option value="LOW">Low</Option>
            </Select>

            {!projectId && (
              <Select
                placeholder="Filter by Project"
                allowClear
                style={{ width: 200 }}
                value={filters.projectId}
                onChange={(value) =>
                  setFilters({ ...filters, projectId: value })
                }
              >
                {projects.map((project) => (
                  <Option key={project.id} value={project.id}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color || "#6366f1" }}
                      />
                      <span>{project.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            )}
          </Space>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table<Task>
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 50,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number, range: [number, number]) =>
              `${range[0]}-${range[1]} of ${total} tasks`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </div>
    </div>
  );
}

export default TaskList;
