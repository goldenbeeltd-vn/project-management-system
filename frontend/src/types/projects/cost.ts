export interface Cost {
  id: number;
  name: string;
  category: string;
  budgetLimit: number;
  spentAmount: number;
  currency: "VND";
  priority: number;
  status: "active" | "completed";
  isPinned: boolean;
  color: string;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  taxRate?: number;
  taxAmount?: number;
  totalWithTax?: number;
}

export interface Category {
  name: string;
  color: string;
  taxRate?: number;
  description?: string;
}

export interface EditCostForm {
  name: string;
  budgetLimit: number;
  spentAmount: number;
  category: string;
  taxRate?: number;
}

export interface AddCategoryForm {
  name: string;
  color: string;
  taxRate?: number;
  description?: string;
}

export interface AddCostForm {
  name: string;
  category: string;
  budgetLimit: number;
  spentAmount: number;
  description: string;
  assignee: string;
  dueDate: Date | undefined;
  priority: "low" | "medium" | "high" | "urgent";
  taxRate?: number;
}

export type ViewMode = "grid" | "row";

export interface CostItemProps {
  cost: Cost;
  isSelected: boolean;
  onClick: () => void;
  onPin: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export interface TaxCalculation {
  originalAmount: number;
  taxRate: number;
  taxAmount: number;
  totalWithTax: number;
}

export const DEFAULT_TAX_RATES: Record<string, number> = {
  Hosting: 10,
  "Tên miền": 10,
  "Nâng cấp tính năng": 10,
  "Thu nhập doanh nghiệp": 25,
};

export const calculateTax = (
  amount: number,
  taxRate: number,
): TaxCalculation => {
  const taxAmount = (amount * taxRate) / 100;
  return {
    originalAmount: amount,
    taxRate,
    taxAmount,
    totalWithTax: amount + taxAmount,
  };
};

export const getDefaultTaxRate = (categoryName: string): number => {
  return DEFAULT_TAX_RATES[categoryName] || 0;
};

export const isTaxableCategory = (categoryName: string): boolean => {
  return categoryName in DEFAULT_TAX_RATES;
};
