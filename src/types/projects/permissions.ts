export interface TeamPermissions {
  canViewProject: boolean;
  canEditProject: boolean;
  canDeleteProject: boolean;
  canManageTeam: boolean;
  canViewTasks: boolean;
  canCreateTasks: boolean;
  canEditTasks: boolean;
  canDeleteTasks: boolean;
  canViewReports: boolean;
  canExportData: boolean;
  canManageFiles: boolean;
  canViewBudget: boolean;
  canEditBudget: boolean;
}

export type UserRole = "admin" | "manager" | "developer" | "qc" | "devops";

export interface ExtendedTeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  position: string;
  department: string;
  salary?: {
    hourlyRate: number;
    monthlyRate: number;
    overtimeRate: number;
  };
  experience?: string;
  skills?: string[];
  permissions: TeamPermissions;
}

export interface PermissionCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  permissions: {
    key: string;
    label: string;
  }[];
}
