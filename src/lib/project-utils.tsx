import { Clock, CheckCircle2, Wrench, AlertTriangle } from "lucide-react";

/**
 * Lấy icon tương ứng với trạng thái dự án
 */
export const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    case "in_progress":
      return <Clock className="w-4 h-4 text-blue-600" />;
    case "on_hold":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    case "maintenance":
      return <Wrench className="w-4 h-4 text-emerald-600" />;
    default:
      return <Clock className="w-4 h-4 text-slate-600" />;
  }
};

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
    urgent: "Khẩn cấp",
    high: "Cao",
    medium: "Trung bình",
    low: "Thấp",
  };
  return priorityLabels[priority] || priority;
};

/**
 * Chuyển đổi role thành nhãn tiếng Việt
 */
export const getRoleLabel = (role: string) => {
  const roleLabels: Record<string, string> = {
    frontend: "Frontend Developers",
    backend: "Backend Developers",
    qc: "QC Testers",
    devops: "DevOps Engineers",
  };
  return roleLabels[role] || role;
};

/**
 * Thống kê dự án theo trạng thái
 */
export const getProjectStats = (projects: any[]) => {
  return {
    inProgress: projects.filter((p) => p.status === "in_progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    maintenance: projects.filter((p) => p.status === "maintenance").length,
    onHold: projects.filter((p) => p.status === "on_hold").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
  };
};
