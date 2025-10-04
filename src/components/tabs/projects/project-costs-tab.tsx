"use client";

import React from "react";
import { Plus, Search, DollarSign, HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Import custom modules
import { useCosts } from "@/hooks/projects/use-costs";
import { useCategories } from "@/hooks/projects/use-categories";
import { CostItem } from "@/components/lists/projects/cost-item";
import { CostDetail } from "@/components/display/projects/cost-detail";
import { EditCostModal } from "@/components/modals/projects/edit-cost-modal";
import { AddCategoryModal } from "@/components/modals/projects/add-category-modal";
import { AddCostModal } from "@/components/modals/projects/add-cost-modal";
import {
  formatCurrency,
  getBudgetStatusColor,
} from "@/utils/projects/cost-utils";

export function ProjectCostsTab() {
  const {
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
  } = useCosts();

  const { categories, isAddingCategory, setIsAddingCategory, addCategory } =
    useCategories();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCost();
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Chi phí dự án</h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <HandCoins className="h-3 w-3" />
            {costs.length} chi phí
          </Badge>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">Ngân sách dự án:</span>
            {isEditingBudget ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(Number(e.target.value))}
                  className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onBlur={() => setIsEditingBudget(false)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && setIsEditingBudget(false)
                  }
                  autoFocus
                />
                <span className="text-sm">VND</span>
              </div>
            ) : (
              <span
                className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => setIsEditingBudget(true)}
              >
                {formatCurrency(projectBudget)}
              </span>
            )}
            <span className="text-sm text-gray-600">
              (Đã dùng: {formatCurrency(totalSpent)})
            </span>
            <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden ml-2">
              <div
                className={`h-full rounded-full ${getBudgetStatusColor(totalSpent, projectBudget)}`}
                style={{
                  width: `${Math.min((totalSpent / projectBudget) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {((totalSpent / projectBudget) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Toggle viewMode={viewMode} onViewModeChange={setViewMode} />
          <Button onClick={() => setIsAddingCost(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm chi phí
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Cost List */}
        <div className="lg:w-1/2 space-y-4">
          {/* Search and Add Controls */}
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chi phí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              />
            </div>

            {/* Add new cost input */}
            <div className="relative flex-1">
              <Plus className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={newCostName}
                onChange={(e) => setNewCostName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập để tạo chi phí mới..."
                className="pl-10 pr-4 py-2.5 w-full border border-dashed border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm placeholder-gray-400 transition-all duration-200"
              />
            </div>
          </div>
          {/* Cost List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredCosts.map((cost) => cost.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredCosts.map((cost) => (
                  <CostItem
                    key={cost.id}
                    cost={cost}
                    isSelected={selectedCost?.id === cost.id}
                    onClick={() => setSelectedCost(cost)}
                    onPin={togglePin}
                    onDelete={deleteCost}
                    onEdit={startEdit}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {filteredCosts.length === 0 && (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Không tìm thấy chi phí nào</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Cost Detail */}
        <div className="lg:w-1/2">
          <CostDetail cost={selectedCost} />
        </div>
      </div>

      {/* Edit Modal */}
      <EditCostModal
        open={!!editingCost}
        editForm={editForm}
        setEditForm={setEditForm}
        categories={categories}
        onSave={saveEdit}
        onCancel={cancelEdit}
        onAddCategory={() => setIsAddingCategory(true)}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        open={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
        onAdd={addCategory}
      />

      {/* Add Cost Modal */}
      <AddCostModal
        open={isAddingCost}
        categories={categories}
        onClose={() => setIsAddingCost(false)}
        onAdd={handleAddDetailedCost}
        onAddCategory={() => setIsAddingCategory(true)}
      />
    </div>
  );
}
