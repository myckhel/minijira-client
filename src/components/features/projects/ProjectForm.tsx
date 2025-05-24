import { useState, useEffect } from "react";
import { Form, Input, Button, ColorPicker, Space } from "antd";
import type { Color } from "antd/es/color-picker";
import type {
  Project,
  CreateProjectData,
  UpdateProjectData,
} from "../../../types";
import { PROJECT_COLORS } from "../../../constants";

const { TextArea } = Input;

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: CreateProjectData | UpdateProjectData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface ProjectFormData {
  name: string;
  description?: string;
  color: string;
}

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [form] = Form.useForm<ProjectFormData>();
  const [selectedColor, setSelectedColor] = useState<string>(
    project?.color || PROJECT_COLORS[0]
  );

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        name: project.name,
        description: project.description || "",
        color: project.color || PROJECT_COLORS[0],
      });
      setSelectedColor(project.color || PROJECT_COLORS[0]);
    } else {
      form.resetFields();
      setSelectedColor(PROJECT_COLORS[0]);
    }
  }, [project, form]);

  const handleSubmit = async (values: ProjectFormData) => {
    try {
      await onSubmit({
        name: values.name,
        description: values.description || undefined,
        color: selectedColor,
      });

      if (!project) {
        form.resetFields();
        setSelectedColor(PROJECT_COLORS[0]);
      }
    } catch (error) {
      // Error is handled by the parent component
      console.error("Failed to save project:", error);
    }
  };

  const handleColorChange = (_color: Color, hex: string) => {
    setSelectedColor(hex);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        name: "",
        description: "",
        color: PROJECT_COLORS[0],
      }}
    >
      {/* Project Name */}
      <Form.Item
        label="Project Name"
        name="name"
        rules={[
          { required: true, message: "Please enter a project name" },
          { min: 2, message: "Project name must be at least 2 characters" },
          { max: 100, message: "Project name cannot exceed 100 characters" },
        ]}
      >
        <Input placeholder="Enter project name" />
      </Form.Item>

      {/* Project Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { max: 500, message: "Description cannot exceed 500 characters" },
        ]}
      >
        <TextArea
          placeholder="Enter project description (optional)"
          rows={3}
          maxLength={500}
          showCount
        />
      </Form.Item>

      {/* Project Color */}
      <Form.Item label="Project Color" name="color">
        <div className="space-y-3">
          {/* Color Picker */}
          <ColorPicker
            value={selectedColor}
            onChange={handleColorChange}
            showText
            format="hex"
            presets={[
              {
                label: "Recommended Colors",
                colors: PROJECT_COLORS,
              },
            ]}
          />

          {/* Quick Color Selection */}
          <div className="flex flex-wrap gap-2">
            {PROJECT_COLORS.map((color: string) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-blue-500 scale-110"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>

          {/* Preview */}
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="text-sm text-gray-600">
              Preview: {selectedColor}
            </span>
          </div>
        </div>
      </Form.Item>

      {/* Form Actions */}
      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {project ? "Update Project" : "Create Project"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
