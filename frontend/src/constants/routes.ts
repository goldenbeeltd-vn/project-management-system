/**
 * Application Routes Configuration
 * Định nghĩa tất cả URL routes trong ứng dụng
 */

export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",

  // Authentication routes
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // Dashboard routes
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  TEAM: "/team",
  HOSTING: "/hosting",
  FINANCE: "/finance",

  // Finance sub-routes
  FINANCE_EXPENSES: "/finance/expenses",
  FINANCE_BUDGET: "/finance/budget",
  FINANCE_PAYROLL: "/finance/payroll",
  FINANCE_REPORTS: "/finance/reports",

  // Settings routes
  SETTINGS: "/settings",
  PROFILE: "/settings/profile",
  ACCOUNT: "/settings/account",
  SECURITY: "/settings/security",

  // Admin routes
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_SETTINGS: "/admin/settings",

  // API routes
  API: {
    AUTH: "/api/auth",
    USERS: "/api/users",
    PROJECTS: "/api/projects",
    UPLOAD: "/api/upload",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
