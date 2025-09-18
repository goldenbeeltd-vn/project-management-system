/**
 * Application Configuration
 * Cấu hình ứng dụng theo environment
 */

export const APP_CONFIG = {
  NAME: "Quản Lý Dự Án",
  DESCRIPTION: "Hệ thống quản lý dự án chuyên nghiệp",
  VERSION: "1.0.0",

  // Environment
  ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",

  // URLs
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

  // Features
  FEATURES: {
    ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    NOTIFICATIONS: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === "true",
    FILE_UPLOAD: process.env.NEXT_PUBLIC_ENABLE_FILE_UPLOAD === "true",
    DARK_MODE: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === "true",
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZES: [10, 20, 50, 100],
    MAX_PAGE_SIZE: 100,
  },

  // Upload
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
    MAX_FILES: 5,
  },

  // Cache
  CACHE: {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    USER_TTL: 30 * 60 * 1000, // 30 minutes
    STATIC_TTL: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;
