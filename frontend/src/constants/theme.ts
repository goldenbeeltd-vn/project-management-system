/**
 * Theme Constants
 * Theme constants cho Ant Design và custom theme
 */

export const THEME_COLORS = {
  // Primary colors
  PRIMARY: "#1890ff",
  PRIMARY_HOVER: "#40a9ff",
  PRIMARY_ACTIVE: "#096dd9",

  // Secondary colors
  SECONDARY: "#52c41a",
  SECONDARY_HOVER: "#73d13d",
  SECONDARY_ACTIVE: "#389e0d",

  // Status colors
  SUCCESS: "#52c41a",
  WARNING: "#faad14",
  ERROR: "#ff4d4f",
  INFO: "#1890ff",

  // Neutral colors
  WHITE: "#ffffff",
  BLACK: "#000000",
  GRAY_50: "#fafafa",
  GRAY_100: "#f5f5f5",
  GRAY_200: "#f0f0f0",
  GRAY_300: "#d9d9d9",
  GRAY_400: "#bfbfbf",
  GRAY_500: "#8c8c8c",
  GRAY_600: "#595959",
  GRAY_700: "#434343",
  GRAY_800: "#262626",
  GRAY_900: "#1f1f1f",
} as const;

export const THEME_SPACING = {
  XS: "4px",
  SM: "8px",
  MD: "16px",
  LG: "24px",
  XL: "32px",
  XXL: "48px",
} as const;

export const THEME_BREAKPOINTS = {
  XS: "576px",
  SM: "768px",
  MD: "992px",
  LG: "1200px",
  XL: "1600px",
} as const;

export const THEME_FONT_SIZES = {
  XS: "12px",
  SM: "14px",
  MD: "16px",
  LG: "18px",
  XL: "20px",
  XXL: "24px",
  XXXL: "32px",
} as const;

export const THEME_SHADOWS = {
  SM: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  MD: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  LG: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  XL: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
} as const;

export const DARK_THEME_COLORS = {
  PRIMARY: "#1890ff",
  BACKGROUND: "#141414",
  SURFACE: "#1f1f1f",
  TEXT_PRIMARY: "#ffffff",
  TEXT_SECONDARY: "#a6a6a6",
  BORDER: "#434343",
} as const;

export const LIGHT_THEME_COLORS = {
  PRIMARY: "#1890ff",
  BACKGROUND: "#ffffff",
  SURFACE: "#fafafa",
  TEXT_PRIMARY: "#000000",
  TEXT_SECONDARY: "#8c8c8c",
  BORDER: "#d9d9d9",
} as const;
