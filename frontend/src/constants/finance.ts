/**
 * Finance Constants
 * Các hằng số và cấu hình cho module tài chính
 */

import { ExpenseType, BenefitType, RevenueType } from "@/types/finance";

export const EXPENSE_TYPES: {
  value: ExpenseType;
  label: string;
  color: string;
}[] = [
  { value: "operational", label: "Vận hành", color: "#3B82F6" },
  { value: "development", label: "Phát triển", color: "#10B981" },
  { value: "deployment", label: "Triển khai", color: "#F59E0B" },
  { value: "marketing", label: "Marketing", color: "#EF4444" },
  { value: "salary", label: "Lương bổng", color: "#8B5CF6" },
  { value: "equipment", label: "Thiết bị", color: "#06B6D4" },
  { value: "software", label: "Phần mềm", color: "#84CC16" },
  { value: "training", label: "Đào tạo", color: "#F97316" },
  { value: "travel", label: "Đi lại", color: "#EC4899" },
  { value: "office", label: "Văn phòng", color: "#6366F1" },
  { value: "legal", label: "Pháp lý", color: "#14B8A6" },
  { value: "insurance", label: "Bảo hiểm", color: "#F43F5E" },
  { value: "other", label: "Khác", color: "#6B7280" },
];

export const EXPENSE_STATUS_OPTIONS = [
  { value: "draft", label: "Nháp", color: "#6B7280" },
  { value: "pending", label: "Chờ duyệt", color: "#F59E0B" },
  { value: "approved", label: "Đã duyệt", color: "#10B981" },
  { value: "rejected", label: "Từ chối", color: "#EF4444" },
  { value: "paid", label: "Đã thanh toán", color: "#8B5CF6" },
];

export const REVENUE_TYPES: {
  value: RevenueType;
  label: string;
  color: string;
}[] = [
  { value: "project_revenue", label: "Doanh thu dự án", color: "#10B981" },
  { value: "consulting", label: "Tư vấn", color: "#3B82F6" },
  { value: "license", label: "Bản quyền", color: "#8B5CF6" },
  { value: "subscription", label: "Đăng ký", color: "#F59E0B" },
  { value: "maintenance", label: "Bảo trì", color: "#06B6D4" },
  { value: "other", label: "Khác", color: "#6B7280" },
];

export const REVENUE_STATUS_OPTIONS = [
  { value: "pending", label: "Chờ xử lý", color: "#F59E0B" },
  { value: "invoiced", label: "Đã xuất hóa đơn", color: "#3B82F6" },
  { value: "received", label: "Đã nhận", color: "#10B981" },
  { value: "overdue", label: "Quá hạn", color: "#EF4444" },
];

export const BENEFIT_TYPES: { value: BenefitType; label: string }[] = [
  { value: "health_insurance", label: "Bảo hiểm y tế" },
  { value: "dental_insurance", label: "Bảo hiểm nha khoa" },
  { value: "life_insurance", label: "Bảo hiểm nhân thọ" },
  { value: "retirement_401k", label: "Quỹ hưu trí" },
  { value: "vacation_pay", label: "Tiền phép" },
  { value: "sick_leave", label: "Nghỉ ốm có lương" },
  { value: "bonus", label: "Thưởng" },
  { value: "allowance", label: "Phụ cấp" },
  { value: "other", label: "Khác" },
];

export const BUDGET_PERIODS = [
  { value: "monthly", label: "Hàng tháng" },
  { value: "quarterly", label: "Hàng quý" },
  { value: "yearly", label: "Hàng năm" },
  { value: "custom", label: "Tùy chỉnh" },
];

export const BUDGET_STATUS_OPTIONS = [
  { value: "draft", label: "Nháp", color: "#6B7280" },
  { value: "active", label: "Đang hoạt động", color: "#10B981" },
  { value: "completed", label: "Hoàn thành", color: "#3B82F6" },
  { value: "cancelled", label: "Đã hủy", color: "#EF4444" },
];

export const PAYROLL_STATUS_OPTIONS = [
  { value: "draft", label: "Nháp", color: "#6B7280" },
  { value: "calculated", label: "Đã tính toán", color: "#F59E0B" },
  { value: "approved", label: "Đã duyệt", color: "#10B981" },
  { value: "paid", label: "Đã thanh toán", color: "#8B5CF6" },
];

export const RECURRING_FREQUENCIES = [
  { value: "daily", label: "Hàng ngày" },
  { value: "weekly", label: "Hàng tuần" },
  { value: "monthly", label: "Hàng tháng" },
  { value: "quarterly", label: "Hàng quý" },
  { value: "yearly", label: "Hàng năm" },
];

export const REPORT_TYPES = [
  { value: "profit_loss", label: "Báo cáo P&L" },
  { value: "cash_flow", label: "Báo cáo dòng tiền" },
  { value: "budget_vs_actual", label: "Ngân sách vs Thực tế" },
  { value: "expense_analysis", label: "Phân tích chi phí" },
  { value: "revenue_analysis", label: "Phân tích doanh thu" },
  { value: "payroll_summary", label: "Tóm tắt lương bổng" },
  { value: "project_profitability", label: "Lợi nhuận dự án" },
];

export const CURRENCIES = [
  { code: "VND", symbol: "₫", name: "Việt Nam Đồng" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
];

export const DEFAULT_CURRENCY = "VND";

// Chart colors
export const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#10B981",
  tertiary: "#F59E0B",
  quaternary: "#EF4444",
  quinary: "#8B5CF6",
  expense: "#EF4444",
  revenue: "#10B981",
  profit: "#3B82F6",
  budget: "#F59E0B",
};

// Default pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Tax rates (Vietnam)
export const VAT_RATES = [
  { value: 0, label: "0%" },
  { value: 5, label: "5%" },
  { value: 8, label: "8%" },
  { value: 10, label: "10%" },
];

export const DEFAULT_VAT_RATE = 10;

// Common expense categories for software companies
export const DEFAULT_EXPENSE_CATEGORIES = [
  {
    name: "Phát triển sản phẩm",
    type: "expense",
    color: "#10B981",
    children: [
      { name: "Phần mềm phát triển", type: "expense" },
      { name: "Tools & Services", type: "expense" },
      { name: "API & Third-party", type: "expense" },
    ],
  },
  {
    name: "Nhân sự",
    type: "expense",
    color: "#8B5CF6",
    children: [
      { name: "Lương cơ bản", type: "expense" },
      { name: "Thưởng", type: "expense" },
      { name: "Bảo hiểm", type: "expense" },
      { name: "Đào tạo", type: "expense" },
    ],
  },
  {
    name: "Hạ tầng IT",
    type: "expense",
    color: "#06B6D4",
    children: [
      { name: "Cloud Services", type: "expense" },
      { name: "Hosting & Domain", type: "expense" },
      { name: "Security Tools", type: "expense" },
      { name: "Monitoring Tools", type: "expense" },
    ],
  },
  {
    name: "Marketing & Sales",
    type: "expense",
    color: "#EF4444",
    children: [
      { name: "Digital Marketing", type: "expense" },
      { name: "Content Creation", type: "expense" },
      { name: "Events & Conferences", type: "expense" },
    ],
  },
  {
    name: "Vận hành",
    type: "expense",
    color: "#F59E0B",
    children: [
      { name: "Văn phòng", type: "expense" },
      { name: "Tiện ích", type: "expense" },
      { name: "Pháp lý", type: "expense" },
      { name: "Kế toán", type: "expense" },
    ],
  },
];

export const DEFAULT_REVENUE_CATEGORIES = [
  {
    name: "Dự án phần mềm",
    type: "revenue",
    color: "#10B981",
    children: [
      { name: "Web Development", type: "revenue" },
      { name: "Mobile App", type: "revenue" },
      { name: "Custom Software", type: "revenue" },
    ],
  },
  {
    name: "Dịch vụ",
    type: "revenue",
    color: "#3B82F6",
    children: [
      { name: "Consulting", type: "revenue" },
      { name: "Maintenance", type: "revenue" },
      { name: "Support", type: "revenue" },
    ],
  },
  {
    name: "Sản phẩm",
    type: "revenue",
    color: "#8B5CF6",
    children: [
      { name: "SaaS Subscription", type: "revenue" },
      { name: "License", type: "revenue" },
      { name: "Training", type: "revenue" },
    ],
  },
];
