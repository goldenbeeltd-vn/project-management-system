import { useState } from "react";
import { Category } from "@/types/projects/cost";
import {
  categoryManager,
  addCategory as addCategoryToManager,
} from "@/constants/projects/cost-data";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(
    categoryManager.categories,
  );
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const addCategory = (newCategory: Category) => {
    // Thêm vào category manager
    const success = addCategoryToManager(newCategory);

    if (!success) {
      alert("Danh mục này đã tồn tại!");
      return false;
    }

    // Cập nhật state local
    setCategories(categoryManager.categories);
    return true;
  };

  const removeCategory = (categoryName: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      // TODO: Implement remove in category manager
      setCategories((prev) => prev.filter((cat) => cat.name !== categoryName));
    }
  };

  const updateCategory = (oldName: string, updatedCategory: Category) => {
    // TODO: Implement update in category manager
    setCategories((prev) =>
      prev.map((cat) => (cat.name === oldName ? updatedCategory : cat)),
    );
  };

  return {
    categories,
    isAddingCategory,
    setIsAddingCategory,
    addCategory,
    removeCategory,
    updateCategory,
  };
};
