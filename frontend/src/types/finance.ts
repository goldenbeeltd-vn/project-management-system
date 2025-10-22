/**
 * Finance Types and Interfaces
 * Định nghĩa các kiểu dữ liệu cho hệ thống quản lý tài chính
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
}

// Categories for financial transactions
export interface FinanceCategory extends BaseEntity {
  name: string;
  description?: string;
  type: "expense" | "revenue";
  parentId?: string;
  color?: string;
  isActive: boolean;
}

// Expense management
export interface Expense extends BaseEntity {
  title: string;
  description?: string;
  amount: number;
  currency: string;
  categoryId: string;
  category?: FinanceCategory;
  projectId?: string;
  project?: {
    id: string;
    name: string;
  };
  employeeId?: string;
  employee?: Employee;
  date: Date;
  type: ExpenseType;
  status: ExpenseStatus;
  receipts: string[]; // File URLs
  tags: string[];
  vendor?: string;
  taxAmount?: number;
  taxRate?: number;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
}

export type ExpenseType =
  | "operational" // Chi phí vận hành
  | "development" // Chi phí phát triển
  | "deployment" // Chi phí triển khai
  | "marketing" // Chi phí marketing
  | "salary" // Lương bổng
  | "equipment" // Thiết bị
  | "software" // Phần mềm
  | "training" // Đào tạo
  | "travel" // Đi lại
  | "office" // Văn phòng
  | "legal" // Pháp lý
  | "insurance" // Bảo hiểm
  | "other"; // Khác

export type ExpenseStatus =
  | "draft" // Nháp
  | "pending" // Chờ duyệt
  | "approved" // Đã duyệt
  | "rejected" // Từ chối
  | "paid"; // Đã thanh toán

export interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  interval: number; // Every X periods
  endDate?: Date;
  maxOccurrences?: number;
}

// Budget management
export interface Budget extends BaseEntity {
  name: string;
  description?: string;
  period: BudgetPeriod;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  currency: string;
  status: BudgetStatus;
  categories: BudgetCategory[];
  projects?: string[]; // Project IDs
  departments?: string[]; // Department IDs
  approvedBy?: string;
  approvedAt?: Date;
}

export interface BudgetCategory {
  categoryId: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentage: number;
}

export type BudgetPeriod = "monthly" | "quarterly" | "yearly" | "custom";
export type BudgetStatus = "draft" | "active" | "completed" | "cancelled";

// Employee and Payroll
export interface Employee extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  hireDate: Date;
  status: EmployeeStatus;
  salary: SalaryInfo;
  benefits: Benefit[];
  avatar?: string;
}

export interface SalaryInfo {
  baseSalary: number;
  currency: string;
  payFrequency: "monthly" | "bi-weekly" | "weekly";
  effectiveDate: Date;
  overtimeRate?: number;
}

export interface Benefit {
  id: string;
  type: BenefitType;
  name: string;
  amount: number;
  isPercentage: boolean;
  isActive: boolean;
}

export type BenefitType =
  | "health_insurance"
  | "dental_insurance"
  | "life_insurance"
  | "retirement_401k"
  | "vacation_pay"
  | "sick_leave"
  | "bonus"
  | "allowance"
  | "other";

export type EmployeeStatus = "active" | "inactive" | "terminated";

// Payroll
export interface Payroll extends BaseEntity {
  employeeId: string;
  employee?: Employee;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  payDate: Date;
  grossPay: number;
  netPay: number;
  deductions: PayrollDeduction[];
  earnings: PayrollEarning[];
  taxes: PayrollTax[];
  status: PayrollStatus;
  currency: string;
}

export interface PayrollDeduction {
  type: string;
  description: string;
  amount: number;
  isPreTax: boolean;
}

export interface PayrollEarning {
  type: string;
  description: string;
  hours?: number;
  rate?: number;
  amount: number;
}

export interface PayrollTax {
  type: string;
  description: string;
  rate: number;
  amount: number;
}

export type PayrollStatus = "draft" | "calculated" | "approved" | "paid";

// Revenue management
export interface Revenue extends BaseEntity {
  title: string;
  description?: string;
  amount: number;
  currency: string;
  categoryId: string;
  category?: FinanceCategory;
  projectId?: string;
  project?: {
    id: string;
    name: string;
  };
  clientId?: string;
  client?: {
    id: string;
    name: string;
  };
  date: Date;
  type: RevenueType;
  status: RevenueStatus;
  invoiceNumber?: string;
  taxAmount?: number;
  taxRate?: number;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  receivedAt?: Date;
}

export type RevenueType =
  | "project_revenue"
  | "consulting"
  | "license"
  | "subscription"
  | "maintenance"
  | "other";

export type RevenueStatus = "pending" | "invoiced" | "received" | "overdue";

// Financial Reports
export interface FinancialReport {
  id: string;
  title: string;
  type: ReportType;
  period: ReportPeriod;
  startDate: Date;
  endDate: Date;
  data: Record<string, unknown>;
  generatedAt: Date;
  generatedBy: string;
}

export type ReportType =
  | "profit_loss"
  | "cash_flow"
  | "budget_vs_actual"
  | "expense_analysis"
  | "revenue_analysis"
  | "payroll_summary"
  | "project_profitability";

export type ReportPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly"
  | "custom";

// Dashboard Statistics
export interface FinanceDashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  totalBudget: number;
  budgetUsed: number;
  budgetRemaining: number;
  payrollCosts: number;
  outstandingInvoices: number;
  currency: string;
  period: {
    start: Date;
    end: Date;
  };
}

// Chart data interfaces
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyFinanceData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

// Filters and search
export interface ExpenseFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  categoryIds?: string[];
  projectIds?: string[];
  employeeIds?: string[];
  types?: ExpenseType[];
  status?: ExpenseStatus[];
  amountRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface BudgetFilter {
  period?: BudgetPeriod[];
  status?: BudgetStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface PayrollFilter {
  employeeIds?: string[];
  departments?: string[];
  payPeriod?: {
    start: Date;
    end: Date;
  };
  status?: PayrollStatus[];
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
