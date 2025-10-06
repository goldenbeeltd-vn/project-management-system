/**
 * Tax Summary Component
 * Hiển thị tổng quan về thuế trong dự án
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react";
import { Cost } from "@/types/projects/cost";
import {
  calculateTotalTax,
  formatTaxRate,
} from "@/utils/projects/tax-calculator";
import { formatCurrency } from "@/utils/projects/cost-utils";

interface TaxSummaryProps {
  costs: Cost[];
  className?: string;
}

export function TaxSummary({ costs, className = "" }: TaxSummaryProps) {
  // Import categories to pass to tax calculations
  const categories = costs.length > 0 ? [] : []; // Will be populated by category manager if needed
  const taxSummary = calculateTotalTax(costs, categories);
  const taxableCosts = costs.filter((cost) => (cost.taxRate || 0) > 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Tổng quan thuế
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tổng quan số liệu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Tổng gốc</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(taxSummary.totalOriginal)}
            </div>
          </div>

          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Tổng thuế</div>
            <div className="text-lg font-semibold text-blue-900">
              {formatCurrency(taxSummary.totalTax)}
            </div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Tổng cộng</div>
            <div className="text-lg font-semibold text-green-900">
              {formatCurrency(taxSummary.totalWithTax)}
            </div>
          </div>
        </div>

        {/* Chi tiết các danh mục có thuế */}
        {taxableCosts.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Chi phí có thuế ({taxableCosts.length} mục)
            </h4>

            <div className="space-y-2">
              {taxableCosts.map((cost) => (
                <div
                  key={cost.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {cost.category}
                    </Badge>
                    <span className="text-sm truncate">{cost.name}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatCurrency(cost.totalWithTax || cost.spentAmount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Thuế {formatTaxRate(cost.taxRate || 0)}:{" "}
                      {formatCurrency(cost.taxAmount || 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thông báo nếu không có thuế */}
        {taxableCosts.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Không có chi phí nào cần tính thuế</p>
          </div>
        )}

        {/* Lưu ý thuế */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <h5 className="text-xs font-medium text-yellow-800 mb-1">
            Lưu ý về thuế:
          </h5>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Hosting, Tên miền, Nâng cấp tính năng: 10% VAT</li>
            <li>• Thu nhập doanh nghiệp: 20-30% (mặc định 25%)</li>
            <li>• Thuế suất có thể được tùy chỉnh cho từng chi phí</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
