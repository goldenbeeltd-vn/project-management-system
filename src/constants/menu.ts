/**
 * Menu Structure Configuration
 * Cấu hình cấu trúc menu cho navigation
 */

import { ROUTES } from "./routes";

export interface MenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  permission?: string;
  badge?: number | string;
  disabled?: boolean;
}

export const MAIN_MENU: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: "dashboard",
  },
  {
    key: "projects",
    label: "Dự án",
    path: ROUTES.PROJECTS,
    icon: "folder",
  },
  {
    key: "team",
    label: "Nhóm",
    path: ROUTES.TEAM,
    icon: "team",
  },
  {
    key: "hosting",
    label: "Hosting",
    path: ROUTES.HOSTING,
    icon: "cloud",
  },
  {
    key: "reports",
    label: "Báo cáo",
    icon: "chart",
    children: [
      {
        key: "project-reports",
        label: "Báo cáo dự án",
        path: "/reports/projects",
        icon: "file-text",
      },
      {
        key: "team-reports",
        label: "Báo cáo nhóm",
        path: "/reports/team",
        icon: "team",
      },
      {
        key: "financial-reports",
        label: "Báo cáo tài chính",
        path: "/reports/financial",
        icon: "dollar",
      },
    ],
  },
  {
    key: "settings",
    label: "Cài đặt",
    icon: "setting",
    children: [
      {
        key: "profile",
        label: "Thông tin cá nhân",
        path: ROUTES.PROFILE,
        icon: "user",
      },
      {
        key: "account",
        label: "Tài khoản",
        path: ROUTES.ACCOUNT,
        icon: "safety",
      },
      {
        key: "security",
        label: "Bảo mật",
        path: ROUTES.SECURITY,
        icon: "lock",
      },
    ],
  },
];

export const ADMIN_MENU: MenuItem[] = [
  {
    key: "admin-dashboard",
    label: "Admin Dashboard",
    path: ROUTES.ADMIN,
    icon: "dashboard",
    permission: "admin.view",
  },
  {
    key: "admin-users",
    label: "Quản lý người dùng",
    path: ROUTES.ADMIN_USERS,
    icon: "team",
    permission: "admin.users.view",
  },
  {
    key: "admin-settings",
    label: "Cài đặt hệ thống",
    path: ROUTES.ADMIN_SETTINGS,
    icon: "setting",
    permission: "admin.settings.view",
  },
];

export const USER_MENU: MenuItem[] = [
  {
    key: "profile",
    label: "Thông tin cá nhân",
    path: ROUTES.PROFILE,
    icon: "user",
  },
  {
    key: "settings",
    label: "Cài đặt",
    path: ROUTES.SETTINGS,
    icon: "setting",
  },
  {
    key: "logout",
    label: "Đăng xuất",
    path: "/auth/logout",
    icon: "logout",
  },
];
