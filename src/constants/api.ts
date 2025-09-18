/**
 * API Configuration
 * Cấu hình API endpoints và version
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  VERSION: "v1",
  TIMEOUT: 30000,

  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
      REFRESH: "/api/auth/refresh",
      ME: "/api/auth/me",
    },
    USERS: {
      LIST: "/api/users",
      DETAIL: (id: string) => `/api/users/${id}`,
      CREATE: "/api/users",
      UPDATE: (id: string) => `/api/users/${id}`,
      DELETE: (id: string) => `/api/users/${id}`,
    },
    PROJECTS: {
      LIST: "/api/projects",
      DETAIL: (id: string) => `/api/projects/${id}`,
      CREATE: "/api/projects",
      UPDATE: (id: string) => `/api/projects/${id}`,
      DELETE: (id: string) => `/api/projects/${id}`,
    },
    UPLOAD: {
      SINGLE: "/api/upload/single",
      MULTIPLE: "/api/upload/multiple",
    },
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
