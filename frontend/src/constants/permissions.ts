/**
 * Permissions Constants
 * Role và permission constants
 */

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  DEVELOPER: "developer",
  CLIENT: "client",
  GUEST: "guest",
} as const;

export const PERMISSIONS = {
  // User permissions
  USER_VIEW: "user.view",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",

  // Project permissions
  PROJECT_VIEW: "project.view",
  PROJECT_CREATE: "project.create",
  PROJECT_UPDATE: "project.update",
  PROJECT_DELETE: "project.delete",
  PROJECT_ASSIGN: "project.assign",

  // Team permissions
  TEAM_VIEW: "team.view",
  TEAM_CREATE: "team.create",
  TEAM_UPDATE: "team.update",
  TEAM_DELETE: "team.delete",
  TEAM_MANAGE: "team.manage",

  // Admin permissions
  ADMIN_VIEW: "admin.view",
  ADMIN_USERS: "admin.users",
  ADMIN_SETTINGS: "admin.settings",
  ADMIN_REPORTS: "admin.reports",

  // System permissions
  SYSTEM_LOGS: "system.logs",
  SYSTEM_BACKUP: "system.backup",
  SYSTEM_MAINTENANCE: "system.maintenance",
} as const;

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.PROJECT_CREATE,
    PERMISSIONS.PROJECT_UPDATE,
    PERMISSIONS.PROJECT_DELETE,
    PERMISSIONS.PROJECT_ASSIGN,
    PERMISSIONS.TEAM_VIEW,
    PERMISSIONS.TEAM_CREATE,
    PERMISSIONS.TEAM_UPDATE,
    PERMISSIONS.TEAM_DELETE,
    PERMISSIONS.TEAM_MANAGE,
    PERMISSIONS.ADMIN_VIEW,
    PERMISSIONS.ADMIN_USERS,
    PERMISSIONS.ADMIN_SETTINGS,
    PERMISSIONS.ADMIN_REPORTS,
    PERMISSIONS.SYSTEM_LOGS,
    PERMISSIONS.SYSTEM_BACKUP,
    PERMISSIONS.SYSTEM_MAINTENANCE,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.PROJECT_CREATE,
    PERMISSIONS.PROJECT_UPDATE,
    PERMISSIONS.PROJECT_ASSIGN,
    PERMISSIONS.TEAM_VIEW,
    PERMISSIONS.TEAM_CREATE,
    PERMISSIONS.TEAM_UPDATE,
    PERMISSIONS.TEAM_MANAGE,
  ],
  [ROLES.DEVELOPER]: [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.PROJECT_UPDATE,
    PERMISSIONS.TEAM_VIEW,
  ],
  [ROLES.CLIENT]: [PERMISSIONS.PROJECT_VIEW],
  [ROLES.GUEST]: [PERMISSIONS.PROJECT_VIEW],
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
