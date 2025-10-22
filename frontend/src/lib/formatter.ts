/**
 * Data Formatting Functions
 * Formatting functions cho dates, currency, numbers
 */

// Date formatting
export const formatDate = (
  date: Date | string | number,
  format: "short" | "medium" | "long" | "full" = "medium"
): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    short: { day: "2-digit", month: "2-digit", year: "numeric" },
    medium: { day: "2-digit", month: "short", year: "numeric" },
    long: { weekday: "short", day: "2-digit", month: "long", year: "numeric" },
    full: { weekday: "long", day: "2-digit", month: "long", year: "numeric" },
  }[format];

  return new Intl.DateTimeFormat("vi-VN", options).format(dateObj);
};

export const formatTime = (
  date: Date | string | number,
  include24Hour = true
): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Time";
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !include24Hour,
  };

  return new Intl.DateTimeFormat("vi-VN", options).format(dateObj);
};

export const formatDateTime = (date: Date | string | number): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatRelativeTime = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Vừa xong";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ngày trước`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} năm trước`;
};

// Currency formatting
export const formatCurrency = (
  amount: number,
  currency = "VND",
  locale = "vi-VN"
): string => {
  if (isNaN(amount)) {
    return "0 ₫";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(amount);
};

export const formatNumber = (
  number: number,
  options: {
    decimals?: number;
    locale?: string;
    style?: "decimal" | "percent";
  } = {}
): string => {
  const { decimals = 0, locale = "vi-VN", style = "decimal" } = options;

  if (isNaN(number)) {
    return "0";
  }

  return new Intl.NumberFormat(locale, {
    style,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// String formatting
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format Vietnamese phone numbers
  if (cleaned.length === 10 && cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  if (cleaned.length === 11 && cleaned.startsWith("84")) {
    return `+${cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}`;
  }

  return phone;
};

export const formatCardNumber = (cardNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = cardNumber.replace(/\D/g, "");

  // Add spaces every 4 digits
  return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const maskEmail = (email: string): string => {
  const [username, domain] = email.split("@");
  if (!username || !domain) return email;

  const maskedUsername =
    username.length > 3
      ? `${username.slice(0, 2)}${"*".repeat(
          username.length - 3
        )}${username.slice(-1)}`
      : `${username[0]}${"*".repeat(username.length - 1)}`;

  return `${maskedUsername}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return phone;

  return `${cleaned.slice(0, 3)}${"*".repeat(
    cleaned.length - 6
  )}${cleaned.slice(-3)}`;
};

// Text formatting
export const truncateText = (
  text: string,
  maxLength: number,
  suffix = "..."
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => capitalizeFirst(word))
    .join(" ");
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Status formatting
export const formatStatus = (
  status: string
): { text: string; color: string; bgColor: string } => {
  const statusMap: Record<
    string,
    { text: string; color: string; bgColor: string }
  > = {
    active: { text: "Hoạt động", color: "#52c41a", bgColor: "#f6ffed" },
    inactive: { text: "Không hoạt động", color: "#8c8c8c", bgColor: "#f5f5f5" },
    pending: { text: "Chờ xử lý", color: "#faad14", bgColor: "#fffbe6" },
    completed: { text: "Hoàn thành", color: "#52c41a", bgColor: "#f6ffed" },
    cancelled: { text: "Đã hủy", color: "#ff4d4f", bgColor: "#fff2f0" },
    draft: { text: "Nháp", color: "#8c8c8c", bgColor: "#f5f5f5" },
    published: { text: "Đã xuất bản", color: "#1890ff", bgColor: "#e6f4ff" },
  };

  return (
    statusMap[status.toLowerCase()] || {
      text: status,
      color: "#8c8c8c",
      bgColor: "#f5f5f5",
    }
  );
};

// Progress formatting
export const formatProgress = (
  current: number,
  total: number
): { percentage: number; text: string } => {
  if (total === 0) return { percentage: 0, text: "0%" };

  const percentage = Math.round((current / total) * 100);
  return {
    percentage,
    text: `${percentage}% (${current}/${total})`,
  };
};
