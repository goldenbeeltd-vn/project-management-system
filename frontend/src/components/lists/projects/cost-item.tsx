import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  CheckSquare,
  Pin,
  PinOff,
  Edit3,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CostItemProps } from "@/types/projects/cost";
import {
  getCategoryColor,
  formatCurrency,
  getBudgetStatusColor,
  formatCurrencyWithTax,
  shouldDisplayTax,
} from "@/utils/projects/cost-utils";

export function CostItem({
  cost,
  isSelected,
  onClick,
  onPin,
  onDelete,
  onEdit,
}: CostItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cost.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isDragging ? "opacity-50 shadow-lg scale-105" : ""
      } ${
        isSelected
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        {cost.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
        <CheckSquare
          className={`w-4 h-4 ${
            cost.status === "completed" ? "text-blue-600" : "text-gray-300"
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate text-sm">
            {cost.name}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin(cost.id);
            }}
            className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-blue-600"
            title={cost.isPinned ? "Bỏ ghim" : "Ghim"}
          >
            {cost.isPinned ? (
              <PinOff className="w-3 h-3" />
            ) : (
              <Pin className="w-3 h-3" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(cost.id);
            }}
            className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-blue-600"
            title="Chỉnh sửa"
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(cost.id);
            }}
            className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-red-600"
            title="Xóa"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>#{cost.priority}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Badge
          variant="secondary"
          className={`${getCategoryColor(cost.category)} text-white text-xs`}
        >
          {cost.category}
        </Badge>
        <div className="flex flex-col items-end">
          {shouldDisplayTax(cost.category) ? (
            <div className="text-right">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {formatCurrencyWithTax(cost).original}
                </div>
                <div className="text-xs text-blue-600">
                  + {formatCurrencyWithTax(cost).tax} (
                  {formatCurrencyWithTax(cost).taxRate})
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrencyWithTax(cost).total} /{" "}
                {formatCurrency(cost.budgetLimit)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(cost.spentAmount)} /{" "}
              {formatCurrency(cost.budgetLimit)}
            </span>
          )}
          <div className="w-16 bg-gray-200 h-1 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getBudgetStatusColor(cost.spentAmount, cost.budgetLimit)}`}
              style={{
                width: `${Math.min((cost.spentAmount / cost.budgetLimit) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
