/**
 * Financial Statistics Cards Component
 * Hiển thị các thống kê tài chính quan trọng
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  CreditCard,
  Wallet,
} from "lucide-react";
import { FinanceDashboardStats } from "@/types/finance";
import { formatCurrency } from "@/lib/formatter";

interface FinanceStatsCardsProps {
  stats: FinanceDashboardStats;
  isLoading?: boolean;
}

export function FinanceStatsCards({
  stats,
  isLoading,
}: FinanceStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const profitMarginColor =
    stats.profitMargin >= 0 ? "text-green-600" : "text-red-600";
  const profitIcon = stats.profitMargin >= 0 ? TrendingUp : TrendingDown;
  const ProfitIcon = profitIcon;

  const budgetUsagePercentage = (stats.budgetUsed / stats.totalBudget) * 100;
  const budgetColor =
    budgetUsagePercentage <= 80
      ? "text-green-600"
      : budgetUsagePercentage <= 95
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalRevenue, stats.currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            Từ {stats.period.start.toLocaleDateString()} đến{" "}
            {stats.period.end.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng chi phí</CardTitle>
          <CreditCard className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(stats.totalExpenses, stats.currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            Từ {stats.period.start.toLocaleDateString()} đến{" "}
            {stats.period.end.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Net Profit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lợi nhuận ròng</CardTitle>
          <ProfitIcon className={`h-4 w-4 ${profitMarginColor}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${profitMarginColor}`}>
            {formatCurrency(stats.netProfit, stats.currency)}
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={stats.profitMargin >= 0 ? "default" : "destructive"}
              className={`text-xs ${stats.profitMargin >= 0 ? "bg-green-100 text-green-800" : ""}`}
            >
              {stats.profitMargin.toFixed(1)}%
            </Badge>
            <p className="text-xs text-muted-foreground">Tỉ lệ lợi nhuận</p>
          </div>
        </CardContent>
      </Card>

      {/* Budget Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ngân sách</CardTitle>
          <PiggyBank className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats.budgetRemaining, stats.currency)}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className={`text-xs font-medium ${budgetColor}`}>
              {budgetUsagePercentage.toFixed(0)}% đã sử dụng
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${
                budgetUsagePercentage <= 80
                  ? "bg-green-500"
                  : budgetUsagePercentage <= 95
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${Math.min(budgetUsagePercentage, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Costs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Chi phí lương bổng
          </CardTitle>
          <Wallet className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {formatCurrency(stats.payrollCosts, stats.currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            {((stats.payrollCosts / stats.totalExpenses) * 100).toFixed(1)}%
            tổng chi phí
          </p>
        </CardContent>
      </Card>

      {/* Outstanding Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Hóa đơn chưa thu
          </CardTitle>
          <DollarSign className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(stats.outstandingInvoices, stats.currency)}
          </div>
          <p className="text-xs text-muted-foreground">Cần theo dõi thu hồi</p>
        </CardContent>
      </Card>
    </div>
  );
}
