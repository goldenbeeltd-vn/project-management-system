import React from "react";
import { Calendar, Pin, AlertCircle, Upload, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Cost } from "@/types/projects/cost";
import {
  getCategoryColor,
  formatCurrency,
  calculateBudgetPercentage,
  getBudgetStatusColor,
  getBudgetStatusText,
  formatCurrencyWithTax,
  shouldDisplayTax,
} from "@/utils/projects/cost-utils";

interface CostDetailProps {
  cost: Cost | null;
}

export function CostDetail({ cost }: CostDetailProps) {
  if (!cost) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Chọn một chi phí để xem chi tiết</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      {/* Cost Header */}
      <div>
        <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{cost.name}</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Ưu tiên #{cost.priority}
            </span>
            {cost.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
            {cost.spentAmount / cost.budgetLimit > 0.9 && (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>

        {/* Budget Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Ngân sách</span>
            <span className="text-sm text-gray-500">
              {calculateBudgetPercentage(cost.spentAmount, cost.budgetLimit)}%
              đã sử dụng
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              {shouldDisplayTax(cost.category) ? (
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">
                    Gốc: {formatCurrencyWithTax(cost).original} + Thuế{" "}
                    {formatCurrencyWithTax(cost).taxRate}:{" "}
                    {formatCurrencyWithTax(cost).tax}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrencyWithTax(cost).total}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-gray-900">
                  {formatCurrency(cost.spentAmount)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              / {formatCurrency(cost.budgetLimit)}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getBudgetStatusColor(
                cost.spentAmount,
                cost.budgetLimit,
              )}`}
              style={{
                width: `${Math.min(
                  (cost.spentAmount / cost.budgetLimit) * 100,
                  100,
                )}%`,
              }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>
              Còn lại: {formatCurrency(cost.budgetLimit - cost.spentAmount)}
            </span>
            <span>
              {getBudgetStatusText(cost.spentAmount, cost.budgetLimit)}
            </span>
          </div>
        </div>
      </div>

      {/* Cost Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Được phân công cho</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
            <span className="font-medium">{cost.assignee.name}</span>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Hạn chót</div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{cost.dueDate}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-3">Mô tả</h3>
        <p className="text-gray-600 mb-4">
          Không thể phủ nhận rằng thành công của quản lý chi phí phần lớn phụ
          thuộc vào việc lập kế hoạch ngân sách. Ngân sách phải thu hút các bên
          liên quan và đảm bảo thành công của dự án.
        </p>
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            className={`${getCategoryColor(cost.category)} text-white`}
          >
            {cost.category}
          </Badge>
          <Badge variant="outline">{formatCurrency(cost.spentAmount)}</Badge>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <h3 className="text-lg font-medium mb-3">Tệp đính kèm</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <span className="text-gray-500 text-sm">Tải lên tệp đính kèm</span>
        </div>
      </div>
    </div>
  );
}
