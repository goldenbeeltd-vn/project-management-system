import React from "react";
import {
  CheckCircle,
  Clock,
  Play,
  Pause,
  Wrench,
  AlertCircle,
} from "lucide-react";

/**
 * Chuyển đổi status thành nhãn tiếng Việt
 */
export const getStatusLabel = (status: string) => {
  const statusLabels: Record<string, string> = {
    in_progress: "Đang tiến hành",
    completed: "Hoàn thành",
    planning: "Lên kế hoạch",
    on_hold: "Tạm dừng",
    maintenance: "Bảo trì",
  };
  return statusLabels[status] || status;
};

/**
 * Chuyển đổi priority thành nhãn tiếng Việt
 */
export const getPriorityLabel = (priority: string) => {
  const priorityLabels: Record<string, string> = {
    high: "Cao",
    medium: "Trung bình",
    low: "Thấp",
  };
  return priorityLabels[priority] || priority;
};

/**
 * Lấy icon cho status
 */
export const getStatusIcon = (status: string) => {
  const statusIcons: Record<string, React.ReactElement> = {
    completed: <CheckCircle className="size-4 text-green-600" />,
    in_progress: <Play className="size-4 text-blue-600" />,
    planning: <Clock className="size-4 text-yellow-600" />,
    on_hold: <Pause className="size-4 text-gray-600" />,
    maintenance: <Wrench className="size-4 text-purple-600" />,
  };
  return (
    statusIcons[status] || <AlertCircle className="size-4 text-gray-400" />
  );
};

/**
 * Chuyển đổi role thành nhãn tiếng Việt
 */
export const getRoleLabel = (role: string) => {
  const roleLabels: Record<string, string> = {
    developers: "Lập trình viên",
    designers: "Thiết kế",
    testers: "Kiểm thử",
    analysts: "Phân tích",
    leads: "Trưởng nhóm",
    manager: "Quản lý dự án",
  };
  return roleLabels[role] || role;
};
