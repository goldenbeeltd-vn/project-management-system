/**
 * Date Utilities
 * Các hàm tiện ích xử lý ngày tháng
 */

export const dateUtils = {
  // Format date to Vietnamese format
  formatDate(
    date: Date | string,
    format: "short" | "medium" | "long" = "medium"
  ): string {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      short: { day: "2-digit", month: "2-digit", year: "numeric" },
      medium: { day: "2-digit", month: "short", year: "numeric" },
      long: {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
      },
    }[format];

    return new Intl.DateTimeFormat("vi-VN", options).format(dateObj);
  },

  // Get relative time (2 hours ago, 3 days ago, etc.)
  getRelativeTime(date: Date | string): string {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - dateObj.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Vừa xong";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} tuần trước`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} tháng trước`;

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} năm trước`;
  },

  // Check if date is today
  isToday(date: Date | string): boolean {
    const dateObj = new Date(date);
    const today = new Date();

    return dateObj.toDateString() === today.toDateString();
  },

  // Check if date is yesterday
  isYesterday(date: Date | string): boolean {
    const dateObj = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return dateObj.toDateString() === yesterday.toDateString();
  },

  // Add days to date
  addDays(date: Date | string, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  // Get start of day
  startOfDay(date: Date | string): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  // Get end of day
  endOfDay(date: Date | string): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  },

  // Get days between two dates
  getDaysBetween(startDate: Date | string, endDate: Date | string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // Check if date is weekend
  isWeekend(date: Date | string): boolean {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  },

  // Get age from birth date
  getAge(birthDate: Date | string): number {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  },
};
