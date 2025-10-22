/**
 * Finance Charts Component
 * Các biểu đồ tài chính cho dashboard
 */

"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseBreakdown, MonthlyFinanceData } from "@/types/finance";
import { CHART_COLORS } from "@/constants/finance";
import { formatCurrency, formatNumber } from "@/lib/formatter";

interface FinanceChartsProps {
  monthlyData?: MonthlyFinanceData[];
  expenseBreakdown?: ExpenseBreakdown[];
  isLoading?: boolean;
}

export function FinanceCharts({
  monthlyData = [],
  expenseBreakdown = [],
  isLoading = false,
}: FinanceChartsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue vs Expenses */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Doanh thu & Chi phí theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatNumber(value, { decimals: 0 })}
              />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value, "VND"),
                  "",
                ]}
                labelFormatter={(label) => `Tháng ${label}`}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                fill={CHART_COLORS.revenue}
                name="Doanh thu"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                fill={CHART_COLORS.expense}
                name="Chi phí"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Profit Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng lợi nhuận</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatNumber(value, { decimals: 0 })}
              />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value, "VND"),
                  "Lợi nhuận",
                ]}
                labelFormatter={(label) => `Tháng ${label}`}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={CHART_COLORS.profit}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Phân bổ chi phí</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseBreakdown.map((item) => ({
                  ...item,
                  name: item.category,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value, "VND"),
                  "Số tiền",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh tháng hiện tại</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyData.length > 0 && (
            <div className="space-y-4">
              {(() => {
                const currentMonth = monthlyData[monthlyData.length - 1];
                const previousMonth = monthlyData[monthlyData.length - 2];

                if (!currentMonth || !previousMonth) {
                  return (
                    <p className="text-gray-500">Chưa đủ dữ liệu để so sánh</p>
                  );
                }

                const revenueGrowth =
                  ((currentMonth.revenue - previousMonth.revenue) /
                    previousMonth.revenue) *
                  100;
                const expenseGrowth =
                  ((currentMonth.expenses - previousMonth.expenses) /
                    previousMonth.expenses) *
                  100;
                const profitGrowth =
                  ((currentMonth.profit - previousMonth.profit) /
                    (previousMonth.profit || 1)) *
                  100;

                return (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Doanh thu:</span>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(currentMonth.revenue, "VND")}
                        </div>
                        <div
                          className={`text-xs ${revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {revenueGrowth >= 0 ? "+" : ""}
                          {revenueGrowth.toFixed(1)}% so với tháng trước
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Chi phí:</span>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(currentMonth.expenses, "VND")}
                        </div>
                        <div
                          className={`text-xs ${expenseGrowth <= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {expenseGrowth >= 0 ? "+" : ""}
                          {expenseGrowth.toFixed(1)}% so với tháng trước
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-gray-600">Lợi nhuận:</span>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(currentMonth.profit, "VND")}
                        </div>
                        <div
                          className={`text-xs ${profitGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {profitGrowth >= 0 ? "+" : ""}
                          {profitGrowth.toFixed(1)}% so với tháng trước
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết phân bổ chi phí</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenseBreakdown.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium">
                    {category.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatCurrency(category.amount, "VND")}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
