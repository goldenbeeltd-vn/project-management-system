import { Cost, Category } from "@/types/projects/cost";
import { calculateCostTax } from "@/utils/projects/tax-calculator";

// Initial categories with tax information
const initialCategories: Category[] = [
  {
    name: "Hosting",
    color: "bg-green-500",
    taxRate: 10,
    description: "Thuế VAT 10%",
  },
  {
    name: "Tên miền",
    color: "bg-blue-500",
    taxRate: 10,
    description: "Thuế VAT 10%",
  },
  {
    name: "Nâng cấp tính năng",
    color: "bg-purple-500",
    taxRate: 10,
    description: "Thuế VAT 10%",
  },
  {
    name: "Thu nhập doanh nghiệp",
    color: "bg-red-500",
    taxRate: 25,
    description: "Thuế TNDN 20-30%",
  },
  { name: "Nhân sự", color: "bg-pink-500" },
  { name: "Công cụ", color: "bg-blue-500" },
  { name: "Thiết bị", color: "bg-yellow-500" },
  { name: "Marketing", color: "bg-purple-500" },
  { name: "Pháp lý", color: "bg-red-500" },
  { name: "Bảo hiểm", color: "bg-indigo-500" },
  { name: "Lưu trữ", color: "bg-teal-500" },
  { name: "Bảo trì", color: "bg-orange-500" },
  { name: "Đào tạo", color: "bg-cyan-500" },
];

// Helper function để tính thuế cho từng cost item
const calculateCostWithTax = (
  cost: Omit<Cost, "taxRate" | "taxAmount" | "totalWithTax">,
): Cost => {
  return calculateCostTax(cost as Cost, initialCategories);
};

export const initialCosts: Cost[] = [
  calculateCostWithTax({
    id: 1,
    name: "Chi phí hosting AWS",
    category: "Hosting",
    budgetLimit: 5000000,
    spentAmount: 3750000,
    currency: "VND",
    priority: 1,
    status: "active",
    isPinned: false,
    color: "bg-green-500",
    assignee: { name: "Nguyễn Văn A", avatar: "/api/placeholder/32/32" },
    dueDate: "16 Th8 2024",
  }),
  calculateCostWithTax({
    id: 2,
    name: "Lương UI/UX Designer",
    category: "Nhân sự",
    budgetLimit: 62500000,
    spentAmount: 62500000,
    currency: "VND",
    priority: 2,
    status: "completed",
    isPinned: false,
    color: "bg-pink-500",
    assignee: { name: "Trần Thị B", avatar: "/api/placeholder/32/32" },
    dueDate: "20 Th7 2024",
  }),
  calculateCostWithTax({
    id: 3,
    name: "Đăng ký tên miền",
    category: "Tên miền",
    budgetLimit: 1500000,
    spentAmount: 1125000,
    currency: "VND",
    priority: 5,
    status: "active",
    isPinned: false,
    color: "bg-blue-500",
    assignee: { name: "Lê Văn C", avatar: "/api/placeholder/32/32" },
    dueDate: "25 Th8 2024",
  }),
  calculateCostWithTax({
    id: 4,
    name: "Bản quyền phần mềm",
    category: "Công cụ",
    budgetLimit: 12500000,
    spentAmount: 7475000,
    currency: "VND",
    priority: 3,
    status: "active",
    isPinned: false,
    color: "bg-green-500",
    assignee: { name: "Phạm Thị D", avatar: "/api/placeholder/32/32" },
    dueDate: "30 Th8 2024",
  }),
  calculateCostWithTax({
    id: 5,
    name: "Thiết bị văn phòng",
    category: "Thiết bị",
    budgetLimit: 37500000,
    spentAmount: 30000000,
    currency: "VND",
    priority: 4,
    status: "active",
    isPinned: false,
    color: "bg-yellow-500",
    assignee: { name: "Hoàng Văn E", avatar: "/api/placeholder/32/32" },
    dueDate: "15 Th9 2024",
  }),
];

// Category manager để quản lý danh sách categories
class CategoryManager {
  private _categories: Category[] = [...initialCategories];

  get categories(): Category[] {
    return [...this._categories]; // Return copy để tránh mutation trực tiếp
  }

  /**
   * Thêm danh mục mới vào danh sách
   */
  addCategory(newCategory: Category): boolean {
    // Kiểm tra trùng tên
    const exists = this._categories.some(
      (cat) => cat.name.toLowerCase() === newCategory.name.toLowerCase(),
    );
    if (!exists) {
      this._categories.push({
        name: newCategory.name,
        color: newCategory.color,
        taxRate: newCategory.taxRate,
        description: newCategory.description,
      });
      return true;
    }
    return false;
  }

  /**
   * Cập nhật thuế suất cho danh mục
   */
  updateCategoryTax(
    categoryName: string,
    taxRate?: number,
    description?: string,
  ): boolean {
    const categoryIndex = this._categories.findIndex(
      (cat) => cat.name === categoryName,
    );
    if (categoryIndex !== -1) {
      this._categories[categoryIndex] = {
        ...this._categories[categoryIndex],
        taxRate,
        description,
      };
      return true;
    }
    return false;
  }

  /**
   * Lấy danh mục theo tên
   */
  getCategoryByName(name: string): Category | undefined {
    return this._categories.find((cat) => cat.name === name);
  }

  /**
   * Reset categories về trạng thái ban đầu
   */
  resetCategories(): void {
    this._categories = [...initialCategories];
  }
}

// Tạo instance global
export const categoryManager = new CategoryManager();

// Export categories để backward compatibility
export const categories = categoryManager.categories;

// Export helper functions
export const addCategory = (category: Category) =>
  categoryManager.addCategory(category);
export const updateCategoryTax = (
  name: string,
  taxRate?: number,
  description?: string,
) => categoryManager.updateCategoryTax(name, taxRate, description);
export const getCategoryByName = (name: string) =>
  categoryManager.getCategoryByName(name);
export const resetCategories = () => categoryManager.resetCategories();
