import {
  Card,
  Tag,
  Avatar,
  Typography,
  Button,
  Dropdown,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { Project } from "../../../types";
import { useAuthStore } from "../../../stores/authStore";

const { Title, Text } = Typography;

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onClick: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onClick,
}: ProjectCardProps) {
  const { user } = useAuthStore();

  // Check if current user can manage this project
  const canManage = user?.role === "ADMIN" || user?.id === project.ownerId;

  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit Project",
      onClick: (e) => {
        e.domEvent.stopPropagation();
        onEdit(project);
      },
      disabled: !canManage,
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete Project",
      danger: true,
      disabled: !canManage,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    e.domEvent.stopPropagation();

    if (e.key === "delete") {
      // The delete action will be handled by the Popconfirm
      return;
    }
  };

  const handleDelete = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    onDelete(project);
  };

  const handleCardClick = () => {
    onClick(project);
  };

  return (
    <Card
      hoverable
      className="h-full transition-all duration-200 hover:shadow-lg"
      onClick={handleCardClick}
      actions={
        canManage
          ? [
              <Dropdown
                key="more"
                menu={{
                  items: menuItems.slice(0, 1), // Only edit action
                  onClick: handleMenuClick,
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>,
              <Popconfirm
                key="delete"
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={handleDelete}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
              >
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>,
            ]
          : undefined
      }
    >
      <div className="flex flex-col h-full">
        {/* Project Color & Icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color || "#6366f1" }}
            />
            <FolderOutlined className="text-gray-500" />
          </div>
          {!canManage && <Tag color="blue">View Only</Tag>}
        </div>

        {/* Project Name */}
        <Title
          level={4}
          className="!mb-2 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {project.name}
        </Title>

        {/* Project Description */}
        {project.description && (
          <Text
            className="text-gray-600 text-sm mb-3 flex-1 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.description}
          </Text>
        )}

        {/* Project Stats */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Text className="text-xs text-gray-500">
              {project._count?.tasks || 0} tasks
            </Text>
          </div>

          {/* Owner Info */}
          <div className="flex items-center space-x-2">
            <Text className="text-xs text-gray-500">Owner:</Text>
            <div className="flex items-center space-x-1">
              <Avatar size="small" src={project.owner.avatarUrl}>
                {project.owner.name.charAt(0).toUpperCase()}
              </Avatar>
              <Text className="text-xs text-gray-700">
                {project.owner.name}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
