import { Cost } from "@/types/projects/cost";
import { categoryManager } from "@/constants/projects/cost-data";
import {
  calculateCostTax,
  formatTaxRate,
  isTaxableCategory,
} from "./tax-calculator";

/**
 * Get category color by category name
 */
export const getCategoryColor = (categoryName: string): string => {
  const categories = categoryManager.categories;
  const category = categories.find((cat) => cat.name === categoryName);
  return category ? category.color : "bg-gray-500";
};

/**
 * Format currency amount to Vietnamese format
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} VND`;
};

/**
 * Format currency with tax information
 */
export const formatCurrencyWithTax = (
  cost: Cost,
): {
  original: string;
  tax: string;
  total: string;
  taxRate: string;
} => {
  const categories = categoryManager.categories;
  const costWithTax = calculateCostTax(cost, categories);

  return {
    original: formatCurrency(cost.spentAmount),
    tax: costWithTax.taxAmount
      ? formatCurrency(costWithTax.taxAmount)
      : "0 VND",
    total: costWithTax.totalWithTax
      ? formatCurrency(costWithTax.totalWithTax)
      : formatCurrency(cost.spentAmount),
    taxRate: costWithTax.taxRate ? formatTaxRate(costWithTax.taxRate) : "0%",
  };
};

/**
 * Check if category should display tax information
 */
export const shouldDisplayTax = (categoryName: string): boolean => {
  const categories = categoryManager.categories;
  return isTaxableCategory(categoryName, categories);
};

/**
 * Calculate budget usage percentage
 */
export const calculateBudgetPercentage = (
  spent: number,
  limit: number,
): number => {
  return Math.round((spent / limit) * 100);
};

/**
 * Get budget status color based on usage percentage
 */
export const getBudgetStatusColor = (spent: number, limit: number): string => {
  const percentage = spent / limit;
  if (percentage > 0.9) return "bg-red-500";
  if (percentage > 0.7) return "bg-yellow-500";
  return "bg-green-500";
};

/**
 * Get budget status text
 */
export const getBudgetStatusText = (spent: number, limit: number): string => {
  return spent / limit > 0.9 ? "Vượt ngân sách!" : "Trong giới hạn";
};

/**
 * Filter and sort costs based on search term and pinned status
 */
export const filterAndSortCosts = (
  costs: Cost[],
  searchTerm: string,
): Cost[] => {
  return costs
    .filter(
      (cost) =>
        cost.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cost.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      // Pinned items first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then by priority
      return a.priority - b.priority;
    });
};

/**
 * Create new cost object from quick input
 */
export const createNewCost = (name: string, costsLength: number): Cost => {
  return {
    id: Date.now(),
    name,
    category: "General",
    budgetLimit: 25000000,
    spentAmount: 0,
    currency: "VND",
    priority: costsLength + 1,
    status: "active",
    isPinned: false,
    color: "bg-gray-500",
    assignee: { name: "Unassigned", avatar: "/api/placeholder/32/32" },
    dueDate: new Date().toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
};

/**
 * Create cost from detailed form
 */
export const createCostFromForm = (
  form: {
    name: string;
    category: string;
    budgetLimit: number;
    spentAmount: number;
    description: string;
    assignee: string;
    dueDate: Date | undefined;
    priority: "low" | "medium" | "high" | "urgent";
  },
  costsLength: number,
): Cost => {
  const priorityMap = {
    low: costsLength + 4,
    medium: costsLength + 3,
    high: costsLength + 2,
    urgent: costsLength + 1,
  };

  return {
    id: Date.now(),
    name: form.name,
    category: form.category,
    budgetLimit: form.budgetLimit,
    spentAmount: form.spentAmount,
    currency: "VND",
    priority: priorityMap[form.priority],
    status: "active",
    isPinned: false,
    color: getCategoryColor(form.category),
    assignee: {
      name: form.assignee,
      avatar: "/api/placeholder/32/32",
    },
    dueDate: form.dueDate
      ? form.dueDate.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : new Date().toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
  };
};
