/**
 * Tax Calculator Utilities
 * Các hàm tiện ích để tính toán thuế cho dự án
 */

import { Cost, TaxCalculation } from "@/types/projects/cost";

/**
 * Thuế suất cố định cho từng danh mục
 */
export const TAX_RATES = {
  HOSTING: 10,
  DOMAIN: 10,
  FEATURE_UPGRADE: 10,
  BUSINESS_INCOME_MIN: 20,
  BUSINESS_INCOME_MAX: 30,
  BUSINESS_INCOME_DEFAULT: 25,
} as const;

/**
 * Mapping tên danh mục với thuế suất
 */
export const CATEGORY_TAX_MAPPING: Record<string, number> = {
  Hosting: TAX_RATES.HOSTING,
  HOSTING: TAX_RATES.HOSTING,
  "Tên miền": TAX_RATES.DOMAIN,
  Domain: TAX_RATES.DOMAIN,
  "Nâng cấp tính năng": TAX_RATES.FEATURE_UPGRADE,
  "Feature Upgrade": TAX_RATES.FEATURE_UPGRADE,
  "Thu nhập doanh nghiệp": TAX_RATES.BUSINESS_INCOME_DEFAULT,
  "Business Income": TAX_RATES.BUSINESS_INCOME_DEFAULT,
};

/**
 * Tính thuế cho một số tiền với thuế suất cho trước
 */
export const calculateTax = (
  amount: number,
  taxRate: number,
): TaxCalculation => {
  const taxAmount = Math.round((amount * taxRate) / 100);
  const totalWithTax = amount + taxAmount;

  return {
    originalAmount: amount,
    taxRate,
    taxAmount,
    totalWithTax,
  };
};

/**
 * Lấy thuế suất mặc định cho một danh mục
 * Nhận thêm parameter categories để tránh circular dependency
 */
export const getDefaultTaxRate = (
  categoryName: string,
  categories?: Array<{ name: string; taxRate?: number }>,
): number => {
  // Kiểm tra trong CATEGORY_TAX_MAPPING trước
  if (CATEGORY_TAX_MAPPING[categoryName]) {
    return CATEGORY_TAX_MAPPING[categoryName];
  }

  // Nếu có categories được truyền vào, tìm thuế suất từ đó
  if (categories) {
    const category = categories.find((cat) => cat.name === categoryName);
    return category?.taxRate || 0;
  }

  return 0;
};

/**
 * Kiểm tra danh mục có thuế hay không
 */
export const isTaxableCategory = (
  categoryName: string,
  categories?: Array<{ name: string; taxRate?: number }>,
): boolean => {
  // Kiểm tra trong CATEGORY_TAX_MAPPING trước
  if (categoryName in CATEGORY_TAX_MAPPING) {
    return true;
  }

  // Nếu có categories được truyền vào, kiểm tra thuế suất
  if (categories) {
    const category = categories.find((cat) => cat.name === categoryName);
    return !!(category?.taxRate && category.taxRate > 0);
  }

  return false;
};

/**
 * Tính toán thuế cho Cost object
 */
export const calculateCostTax = (
  cost: Cost,
  categories?: Array<{ name: string; taxRate?: number }>,
): Cost => {
  const taxRate = cost.taxRate || getDefaultTaxRate(cost.category, categories);

  if (taxRate > 0) {
    const spentTax = calculateTax(cost.spentAmount, taxRate);

    return {
      ...cost,
      taxRate,
      taxAmount: spentTax.taxAmount,
      totalWithTax: spentTax.totalWithTax,
    };
  }

  return cost;
}; /**
 * Tính tổng thuế cho một danh sách costs
 */
export const calculateTotalTax = (
  costs: Cost[],
  categories?: Array<{ name: string; taxRate?: number }>,
): {
  totalOriginal: number;
  totalTax: number;
  totalWithTax: number;
} => {
  const totals = costs.reduce(
    (acc, cost) => {
      const costWithTax = calculateCostTax(cost, categories);
      return {
        totalOriginal: acc.totalOriginal + cost.spentAmount,
        totalTax: acc.totalTax + (costWithTax.taxAmount || 0),
        totalWithTax:
          acc.totalWithTax + (costWithTax.totalWithTax || cost.spentAmount),
      };
    },
    { totalOriginal: 0, totalTax: 0, totalWithTax: 0 },
  );

  return totals;
};

/**
 * Format thuế suất thành string
 */
export const formatTaxRate = (taxRate: number): string => {
  return `${taxRate}%`;
};

/**
 * Lấy mô tả thuế cho danh mục
 */
export const getTaxDescription = (categoryName: string): string => {
  const taxRate = getDefaultTaxRate(categoryName);

  if (taxRate === 0) {
    return "Không có thuế";
  }

  const descriptions: Record<string, string> = {
    Hosting: "Thuế VAT cho dịch vụ hosting",
    "Tên miền": "Thuế VAT cho đăng ký tên miền",
    "Nâng cấp tính năng": "Thuế VAT cho dịch vụ nâng cấp",
    "Thu nhập doanh nghiệp": "Thuế thu nhập doanh nghiệp (có thể từ 20-30%)",
  };

  return descriptions[categoryName] || `Thuế ${formatTaxRate(taxRate)}`;
};

/**
 * Validate thuế suất
 */
export const validateTaxRate = (taxRate: number): boolean => {
  return taxRate >= 0 && taxRate <= 100;
};

/**
 * Tính thuế cho thu nhập doanh nghiệp với các mức khác nhau
 */
export const calculateBusinessIncomeTax = (
  amount: number,
  taxLevel: "low" | "medium" | "high" = "medium",
): TaxCalculation => {
  const taxRates = {
    low: TAX_RATES.BUSINESS_INCOME_MIN,
    medium: TAX_RATES.BUSINESS_INCOME_DEFAULT,
    high: TAX_RATES.BUSINESS_INCOME_MAX,
  };

  return calculateTax(amount, taxRates[taxLevel]);
};
