/**
 * Finance Dashboard Page
 * Trang tổng quan tài chính của công ty
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
} from "lucide-react";

import { FinanceStatsCards } from "@/components/finance/finance-stats-cards";
import { FinanceCharts } from "@/components/finance/finance-charts";
import { ExpenseTable } from "@/components/finance/expense-table";

import {
  FinanceDashboardStats,
  MonthlyFinanceData,
  ExpenseBreakdown,
  Expense,
} from "@/types/finance";

// Mock data - trong thực tế sẽ fetch từ API
const mockStats: FinanceDashboardStats = {
  totalRevenue: 2500000000, // 2.5 tỷ VND
  totalExpenses: 1800000000, // 1.8 tỷ VND
  netProfit: 700000000, // 700 triệu VND
  profitMargin: 28, // 28%
  totalBudget: 2000000000, // 2 tỷ VND
  budgetUsed: 1600000000, // 1.6 tỷ VND
  budgetRemaining: 400000000, // 400 triệu VND
  payrollCosts: 900000000, // 900 triệu VND
  outstandingInvoices: 150000000, // 150 triệu VND
  currency: "VND",
  period: {
    start: new Date(2024, 0, 1), // 1/1/2024
    end: new Date(2024, 11, 31), // 31/12/2024
  },
};

const mockMonthlyData: MonthlyFinanceData[] = [
  { month: "T1", revenue: 200000000, expenses: 150000000, profit: 50000000 },
  { month: "T2", revenue: 220000000, expenses: 160000000, profit: 60000000 },
  { month: "T3", revenue: 190000000, expenses: 145000000, profit: 45000000 },
  { month: "T4", revenue: 230000000, expenses: 170000000, profit: 60000000 },
  { month: "T5", revenue: 250000000, expenses: 180000000, profit: 70000000 },
  { month: "T6", revenue: 210000000, expenses: 155000000, profit: 55000000 },
  { month: "T7", revenue: 240000000, expenses: 175000000, profit: 65000000 },
  { month: "T8", revenue: 260000000, expenses: 190000000, profit: 70000000 },
  { month: "T9", revenue: 225000000, expenses: 165000000, profit: 60000000 },
  { month: "T10", revenue: 270000000, expenses: 195000000, profit: 75000000 },
  { month: "T11", revenue: 280000000, expenses: 200000000, profit: 80000000 },
  { month: "T12", revenue: 290000000, expenses: 210000000, profit: 80000000 },
];

const mockExpenseBreakdown: ExpenseBreakdown[] = [
  {
    category: "Lương bổng",
    amount: 900000000,
    percentage: 50,
    color: "#8B5CF6",
  },
  {
    category: "Phát triển",
    amount: 300000000,
    percentage: 16.7,
    color: "#10B981",
  },
  {
    category: "Marketing",
    amount: 200000000,
    percentage: 11.1,
    color: "#EF4444",
  },
  { category: "Vận hành", amount: 180000000, percentage: 10, color: "#F59E0B" },
  {
    category: "Hạ tầng IT",
    amount: 120000000,
    percentage: 6.7,
    color: "#06B6D4",
  },
  { category: "Khác", amount: 100000000, percentage: 5.5, color: "#6B7280" },
];

const mockRecentExpenses: Expense[] = [
  {
    id: "1",
    title: "Office 365 License",
    description: "Yearly subscription for team collaboration",
    amount: 15000000,
    currency: "VND",
    categoryId: "software",
    date: new Date("2024-12-01"),
    type: "software",
    status: "approved",
    vendor: "Microsoft",
    taxAmount: 1500000,
    taxRate: 10,
    isRecurring: true,
    receipts: [],
    tags: ["software", "annual"],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
    createdBy: "user1",
  },
  {
    id: "2",
    title: "AWS Cloud Services",
    description: "Monthly hosting and infrastructure costs",
    amount: 8500000,
    currency: "VND",
    categoryId: "infrastructure",
    date: new Date("2024-11-30"),
    type: "operational",
    status: "paid",
    vendor: "Amazon Web Services",
    taxAmount: 850000,
    taxRate: 10,
    isRecurring: true,
    receipts: [],
    tags: ["cloud", "monthly"],
    createdAt: new Date("2024-11-30"),
    updatedAt: new Date("2024-12-01"),
    createdBy: "user1",
  },
  {
    id: "3",
    title: "Team Building Event",
    description: "Quarterly team building activities",
    amount: 25000000,
    currency: "VND",
    categoryId: "employee",
    date: new Date("2024-11-28"),
    type: "other",
    status: "pending",
    vendor: "Event Company",
    taxAmount: 2500000,
    taxRate: 10,
    isRecurring: false,
    receipts: [],
    tags: ["team-building", "quarterly"],
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-11-28"),
    createdBy: "user2",
  },
];

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [stats] = useState<FinanceDashboardStats>(mockStats);
  const [monthlyData] = useState<MonthlyFinanceData[]>(mockMonthlyData);
  const [expenseBreakdown] = useState<ExpenseBreakdown[]>(mockExpenseBreakdown);
  const [recentExpenses] = useState<Expense[]>(mockRecentExpenses);
  const [isLoading] = useState(false);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // Trong thực tế sẽ fetch dữ liệu mới từ API
  };

  const handleExportReport = () => {
    // Logic xuất báo cáo
    console.log("Exporting financial report...");
  };

  const handleNewExpense = () => {
    // Logic tạo chi phí mới
    console.log("Creating new expense...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tài chính</h1>
          <p className="text-gray-600">
            Quản lý tài chính và ngân sách công ty
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">Năm 2024</SelectItem>
              <SelectItem value="2023">Năm 2023</SelectItem>
              <SelectItem value="Q4-2024">Q4 2024</SelectItem>
              <SelectItem value="Q3-2024">Q3 2024</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>

          <Button onClick={handleNewExpense}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm chi phí
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <FinanceStatsCards stats={stats} isLoading={isLoading} />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="expenses">Chi phí</TabsTrigger>
          <TabsTrigger value="budget">Ngân sách</TabsTrigger>
          <TabsTrigger value="payroll">Lương bổng</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <FinanceCharts
            monthlyData={monthlyData}
            expenseBreakdown={expenseBreakdown}
            isLoading={isLoading}
          />

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Chi phí gần đây</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Lọc
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ExpenseTable
                expenses={recentExpenses}
                isLoading={isLoading}
                onView={(expense) => console.log("View expense:", expense)}
                onEdit={(expense) => console.log("Edit expense:", expense)}
                onDelete={(id) => console.log("Delete expense:", id)}
                onApprove={(id) => console.log("Approve expense:", id)}
                onReject={(id) => console.log("Reject expense:", id)}
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tạo chi phí mới</h3>
                    <p className="text-sm text-gray-600">Thêm chi phí mới</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Xem báo cáo</h3>
                    <p className="text-sm text-gray-600">Phân tích tài chính</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Lập ngân sách</h3>
                    <p className="text-sm text-gray-600">Kế hoạch chi tiêu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chi phí chờ duyệt</h3>
                    <p className="text-sm text-gray-600">
                      {
                        recentExpenses.filter((e) => e.status === "pending")
                          .length
                      }{" "}
                      mục
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Chi phí</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable
                expenses={recentExpenses}
                isLoading={isLoading}
                onView={(expense) => console.log("View expense:", expense)}
                onEdit={(expense) => console.log("Edit expense:", expense)}
                onDelete={(id) => console.log("Delete expense:", id)}
                onApprove={(id) => console.log("Approve expense:", id)}
                onReject={(id) => console.log("Reject expense:", id)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Ngân sách</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Tính năng quản lý ngân sách đang được phát triển...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Lương bổng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Tính năng quản lý lương bổng đang được phát triển...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Tài chính</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Tính năng báo cáo tài chính đang được phát triển...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
