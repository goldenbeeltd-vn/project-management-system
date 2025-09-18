/**
 * Application Configuration
 * Cấu hình ứng dụng theo environment
 */

export const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_TEST: process.env.NODE_ENV === "test",
} as const;

export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || "Quản Lý Dự Án",
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "Hệ thống quản lý dự án chuyên nghiệp",
  URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
  VERSION: process.env.NEXT_PUBLIC_API_VERSION || "v1",
} as const;

export const DATABASE_CONFIG = {
  URL: process.env.DATABASE_URL || "",
  HOST: process.env.DB_HOST || "localhost",
  PORT: parseInt(process.env.DB_PORT || "5432"),
  NAME: process.env.DB_NAME || "quan_ly_du_an",
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "",
  SSL: process.env.DB_SSL === "true",
} as const;

export const REDIS_CONFIG = {
  URL: process.env.REDIS_URL || "redis://localhost:6379",
  HOST: process.env.REDIS_HOST || "localhost",
  PORT: parseInt(process.env.REDIS_PORT || "6379"),
  PASSWORD: process.env.REDIS_PASSWORD || "",
} as const;

export const AUTH_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || "12"),
} as const;

export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "10485760"), // 10MB
  ALLOWED_FILE_TYPES: (
    process.env.ALLOWED_FILE_TYPES ||
    "image/jpeg,image/png,image/gif,application/pdf"
  ).split(","),
  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
} as const;

export const EMAIL_CONFIG = {
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
  FROM_EMAIL: process.env.FROM_EMAIL || "noreply@example.com",
  FROM_NAME: process.env.FROM_NAME || "Quản Lý Dự Án",
} as const;

export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_NOTIFICATIONS: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === "true",
  ENABLE_FILE_UPLOAD: process.env.NEXT_PUBLIC_ENABLE_FILE_UPLOAD === "true",
  ENABLE_DARK_MODE: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === "true",
  ENABLE_MULTI_LANGUAGE:
    process.env.NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE === "true",
  ENABLE_TEAM_FEATURES: process.env.NEXT_PUBLIC_ENABLE_TEAM_FEATURES === "true",
} as const;

// Environment validation
function validateEnv() {
  const required = ["JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

// Only validate in production
if (ENV_CONFIG.IS_PRODUCTION) {
  validateEnv();
}
