import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import {
  Cost,
  EditCostForm,
  ViewMode,
  AddCostForm,
} from "@/types/projects/cost";
import { initialCosts } from "@/constants/projects/cost-data";
import {
  createNewCost,
  createCostFromForm,
  filterAndSortCosts,
} from "@/utils/projects/cost-utils";

export const useCosts = () => {
  const [costs, setCosts] = useState<Cost[]>(
    initialCosts.sort((a, b) => a.priority - b.priority),
  );
  const [selectedCost, setSelectedCost] = useState<Cost | null>(
    costs[4] || null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [newCostName, setNewCostName] = useState("");
  const [projectBudget, setProjectBudget] = useState(250000000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editingCost, setEditingCost] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditCostForm>({
    name: "",
    budgetLimit: 0,
    spentAmount: 0,
    category: "",
  });
  const [isAddingCost, setIsAddingCost] = useState(false);

  // Derived state
  const filteredCosts = filterAndSortCosts(costs, searchTerm);
  const totalSpent = costs.reduce((sum, cost) => sum + cost.spentAmount, 0);

  // Drag and drop handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      setCosts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);

        // Update priorities based on new order
        const updatedItems = reorderedItems.map((item, index) => ({
          ...item,
          priority: index + 1,
        }));

        return updatedItems;
      });
    }
  };

  // Add new cost (quick add)
  const handleAddCost = () => {
    if (!newCostName.trim()) return;

    const newCost = createNewCost(newCostName, costs.length);
    setCosts([newCost, ...costs]);
    setNewCostName("");
    setSelectedCost(newCost);
  };

  // Add new cost from detailed form
  const handleAddDetailedCost = (form: AddCostForm) => {
    const newCost = createCostFromForm(form, costs.length);
    setCosts([newCost, ...costs]);
    setSelectedCost(newCost);
  };

  // Pin/Unpin cost
  const togglePin = (costId: number) => {
    setCosts((prev) =>
      prev.map((cost) =>
        cost.id === costId ? { ...cost, isPinned: !cost.isPinned } : cost,
      ),
    );
  };

  // Delete cost
  const deleteCost = (costId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa chi phí này?")) {
      setCosts((prev) => prev.filter((cost) => cost.id !== costId));
      if (selectedCost?.id === costId) {
        setSelectedCost(costs[0] || null);
      }
    }
  };

  // Edit cost handlers
  const startEdit = (costId: number) => {
    const cost = costs.find((c) => c.id === costId);
    if (cost) {
      setEditForm({
        name: cost.name,
        budgetLimit: cost.budgetLimit,
        spentAmount: cost.spentAmount,
        category: cost.category,
      });
      setEditingCost(costId);
    }
  };

  const saveEdit = () => {
    if (editingCost) {
      setCosts((prev) =>
        prev.map((cost) =>
          cost.id === editingCost
            ? {
                ...cost,
                ...editForm,
              }
            : cost,
        ),
      );
      setEditingCost(null);
    }
  };

  const cancelEdit = () => {
    setEditingCost(null);
    setEditForm({ name: "", budgetLimit: 0, spentAmount: 0, category: "" });
  };

  return {
    // State
    costs,
    selectedCost,
    searchTerm,
    viewMode,
    newCostName,
    projectBudget,
    isEditingBudget,
    editingCost,
    editForm,
    isAddingCost,
    filteredCosts,
    totalSpent,

    // Setters
    setSelectedCost,
    setSearchTerm,
    setViewMode,
    setNewCostName,
    setProjectBudget,
    setIsEditingBudget,
    setEditForm,
    setIsAddingCost,

    // Handlers
    handleDragEnd,
    handleAddCost,
    handleAddDetailedCost,
    togglePin,
    deleteCost,
    startEdit,
    saveEdit,
    cancelEdit,
  };
};
