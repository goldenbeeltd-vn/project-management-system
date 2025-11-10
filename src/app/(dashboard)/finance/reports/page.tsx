"use client";

import { useState } from "react";
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  PieChart,
  BarChart3,
  LineChart as LineChartIcon,
  Printer,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function FinancialReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [activeTab, setActiveTab] = useState("profit-loss");

  // Mock data
  const profitLossData = {
    period: "Tháng 10/2025",
    revenue: {
      projectPayments: 81000000,
      consulting: 8500000,
      maintenance: 2500000,
      total: 92000000,
    },
    expenses: {
      personnel: 280000000,
      cloudHosting: 85000000,
      office: 65000000,
      equipment: 55000000,
      marketing: 25000000,
      other: 15000000,
      total: 52500000,
    },
    grossProfit: 395000000,
    operatingExpenses: 45000000,
    netProfit: 350000000,
    profitMargin: 38.04,
  };

  const balanceSheetData = {
    date: "31/10/2025",
    assets: {
      current: {
        cash: 1245500000,
        accountsReceivable: 850000000,
        inventory: 0,
        prepaidExpenses: 35000000,
        total: 2130500000,
      },
      fixed: {
        equipment: 450000000,
        furniture: 85000000,
        software: 120000000,
        accumulatedDepreciation: -125000000,
        total: 530000000,
      },
      totalAssets: 2660500000,
    },
    liabilities: {
      current: {
        accountsPayable: 485000000,
        shortTermLoans: 0,
        taxesPayable: 65000000,
        total: 550000000,
      },
      longTerm: {
        longTermLoans: 0,
        total: 0,
      },
      totalLiabilities: 550000000,
    },
    equity: {
      capital: 1500000000,
      retainedEarnings: 610500000,
      totalEquity: 2110500000,
    },
  };

  const cashFlowData = {
    period: "Tháng 10/2025",
    operating: {
      netIncome: 350000000,
      depreciation: 12000000,
      accountsReceivableChange: -85000000,
      accountsPayableChange: 45000000,
      total: 322000000,
    },
    investing: {
      equipmentPurchase: -35000000,
      softwarePurchase: -15000000,
      total: -50000000,
    },
    financing: {
      capitalContribution: 0,
      loanRepayment: 0,
      dividends: 0,
      total: 0,
    },
    netChange: 272000000,
    beginningBalance: 973500000,
    endingBalance: 124550000,
  };

  const monthlyComparison = [
    { month: "T5", revenue: 650000000, expense: 420000000, profit: 230000000 },
    { month: "T6", revenue: 720000000, expense: 445000000, profit: 275000000 },
    { month: "T7", revenue: 680000000, expense: 430000000, profit: 250000000 },
    { month: "T8", revenue: 780000000, expense: 465000000, profit: 315000000 },
    { month: "T9", revenue: 740000000, expense: 432000000, profit: 308000000 },
    { month: "T10", revenue: 920000000, expense: 525000000, profit: 395000000 },
  ];

  const revenueBreakdown = [
    {
      category: "Thanh toán dự án",
      amount: 810000000,
      percentage: 88,
      color: "bg-blue-500",
    },
    {
      category: "Tư vấn",
      amount: 85000000,
      percentage: 9,
      color: "bg-green-500",
    },
    {
      category: "Bảo trì",
      amount: 25000000,
      percentage: 3,
      color: "bg-purple-500",
    },
  ];

  const expenseBreakdown = [
    {
      category: "Nhân sự",
      amount: 28000000,
      percentage: 30,
      color: "bg-red-500",
    },
    {
      category: "Cloud & Hosting",
      amount: 8500000,
      percentage: 16,
      color: "bg-orange-500",
    },
    {
      category: "Văn phòng",
      amount: 6500000,
      percentage: 12,
      color: "bg-yellow-500",
    },
    {
      category: "Thiết bị",
      amount: 500000,
      percentage: 11,
      color: "bg-pink-500",
    },
    {
      category: "Marketing",
      amount: 25000000,
      percentage: 5,
      color: "bg-indigo-500",
    },
    { category: "Khác", amount: 15000000, percentage: 3, color: "bg-gray-500" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatCurrency2 = (amount: number | null | undefined): string => {
    if (amount === null || amount === undefined) return "";
    const sign = amount < 0 ? "-" : "";
    const abs = Math.abs(amount);

    const formatVal = (value: number, digits: number): string =>
      new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(value);

    // Billions
    if (abs >= 1000000000) {
      const val = abs / 1000000000;
      const digits = val < 10 ? 1 : 0; // show one decimal for values < 10 (e.g. 1.2B), otherwise no decimal (e.g. 12B)
      return `${sign}${formatVal(val, digits)}B`;
    }

    // Millions
    if (abs >= 1000000) {
      const val = abs / 1000000;
      const digits = val < 10 ? 1 : 0; // 1.5M, 10M
      return `${sign}${formatVal(val, digits)}M`;
    }

    // Thousands
    if (abs >= 1000) {
      const val = abs / 1000;
      const digits = val < 10 ? 1 : 0; // 1.5K, 12K
      return `${sign}${formatVal(val, digits)}K`;
    }

    // Less than 1,000 -> show normal number with thousands separator
    return `${sign}${new Intl.NumberFormat("vi-VN").format(abs)}`;
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md shadow">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Báo Cáo Tài Chính
            </h1>
            <p className="text-gray-500 mt-1">
              Phân tích và báo cáo tài chính chi tiết
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="thisWeek">Tuần này</SelectItem>
                <SelectItem value="thisMonth">Tháng này</SelectItem>
                <SelectItem value="lastMonth">Tháng trước</SelectItem>
                <SelectItem value="thisQuarter">Quý này</SelectItem>
                <SelectItem value="lastQuarter">Quý trước</SelectItem>
                <SelectItem value="thisYear">Năm nay</SelectItem>
                <SelectItem value="lastYear">Năm ngoái</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              In báo cáo
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Xuất Excel
            </Button>
          </div>
        </div>

        {/* Quick Stats – 100% giống cấu trúc gốc (có CardAction dù không trend) */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {/* Doanh thu */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Tổng doanh thu</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatCurrency2(profitLossData.revenue.total)}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="opacity-0 pointer-events-none"
                >
                  <TrendingUp className="size-4" />
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <span>Tổng thu nhập trong kỳ</span>
                <TrendingUp className="size-4 text-blue-500" />
              </div>
            </CardFooter>
          </Card>

          {/* Chi phí */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Tổng chi phí</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatCurrency2(profitLossData.expenses.total)}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="opacity-0 pointer-events-none"
                >
                  <TrendingDown className="size-4" />
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <span>Tổng chi tiêu trong kỳ</span>
                <TrendingDown className="size-4 text-red-500" />
              </div>
            </CardFooter>
          </Card>

          {/* Lợi nhuận ròng */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Lợi nhuận ròng</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-green-600 @[250px]/card:text-3xl">
                {formatCurrency2(profitLossData.netProfit)}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="opacity-0 pointer-events-none"
                >
                  <DollarSign className="size-4" />—
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <span>Kết quả sau cùng</span>
                <DollarSign className="size-4 text-green-500" />
              </div>
            </CardFooter>
          </Card>

          {/* Tỷ suất lợi nhuận */}
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Tỷ suất lợi nhuận</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-purple-600 @[250px]/card:text-3xl">
                {profitLossData.profitMargin.toFixed(2)}%
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="opacity-0 pointer-events-none"
                >
                  <PieChart className="size-4" />—
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <span>Hiệu quả kinh doanh</span>
                <PieChart className="size-4 text-purple-500" />
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Main Reports */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profit-loss">
              <FileText className="w-4 h-4 mr-2" />
              Báo cáo Lãi/Lỗ
            </TabsTrigger>
            <TabsTrigger value="balance-sheet">
              <BarChart3 className="w-4 h-4 mr-2" />
              Bảng Cân Đối
            </TabsTrigger>
            <TabsTrigger value="cash-flow">
              <LineChartIcon className="w-4 h-4 mr-2" />
              Lưu Chuyển Tiền
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <PieChart className="w-4 h-4 mr-2" />
              Phân Tích
            </TabsTrigger>
          </TabsList>

          {/* Profit & Loss Statement */}
          <TabsContent value="profit-loss" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Báo Cáo Kết Quả Kinh Doanh (P&L)</CardTitle>
                    <CardDescription>
                      Kỳ báo cáo: {profitLossData.period}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Lợi nhuận: {formatCurrency(profitLossData.netProfit)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Revenue Section */}
                  <div>
                    <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
                      <h3 className="text-lg font-bold text-gray-900">
                        DOANH THU
                      </h3>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(profitLossData.revenue.total)}
                      </span>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Thanh toán dự án</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(
                            profitLossData.revenue.projectPayments,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Dịch vụ tư vấn</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.revenue.consulting)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Bảo trì & Hỗ trợ</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.revenue.maintenance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expenses Section */}
                  <div>
                    <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
                      <h3 className="text-lg font-bold text-gray-900">
                        CHI PHÍ HOẠT ĐỘNG
                      </h3>
                      <span className="text-lg font-bold text-red-600">
                        {formatCurrency(profitLossData.expenses.total)}
                      </span>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Chi phí nhân sự</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.expenses.personnel)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Cloud & Hosting</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.expenses.cloudHosting)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Văn phòng</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.expenses.office)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Thiết bị & Tools</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.expenses.equipment)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Marketing</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.expenses.marketing)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Chi phí khác</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(profitLossData.expenses.other)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profit Calculation */}
                  <div className="space-y-3 pt-4 border-t-2 border-gray-300">
                    <div className="flex items-center justify-between py-2 bg-green-50 px-4 rounded-lg">
                      <span className="font-semibold text-gray-900">
                        Lợi nhuận gộp
                      </span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(profitLossData.grossProfit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 pl-6">
                      <span className="text-gray-700">
                        Chi phí vận hành khác
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(profitLossData.operatingExpenses)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 bg-green-100 px-4 rounded-lg border-2 border-green-300">
                      <span className="text-lg font-bold text-gray-900">
                        LỢI NHUẬN RÒNG
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(profitLossData.netProfit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 bg-purple-50 px-4 rounded-lg">
                      <span className="font-semibold text-gray-900">
                        Tỷ suất lợi nhuận
                      </span>
                      <span className="font-bold text-purple-600">
                        {profitLossData.profitMargin.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Balance Sheet */}
          <TabsContent value="balance-sheet" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bảng Cân Đối Kế Toán</CardTitle>
                    <CardDescription>
                      Tính đến: {balanceSheetData.date}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Tổng tài sản:{" "}
                    {formatCurrency(balanceSheetData.assets.totalAssets)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Assets */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b-2 border-blue-300 bg-blue-50 px-4 rounded-t-lg">
                      <h3 className="text-lg font-bold text-blue-900">
                        TÀI SẢN
                      </h3>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(balanceSheetData.assets.totalAssets)}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Tài sản ngắn hạn
                      </h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">
                            Tiền mặt & Tương đương
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.current.cash,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">
                            Các khoản phải thu
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.current
                                .accountsReceivable,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">
                            Chi phí trả trước
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.current.prepaidExpenses,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 bg-gray-100 px-3 rounded">
                          <span className="font-semibold text-gray-900">
                            Tổng tài sản ngắn hạn
                          </span>
                          <span className="font-bold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.current.total,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Tài sản dài hạn
                      </h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">Thiết bị</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.fixed.equipment,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">Nội thất</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.fixed.furniture,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">Phần mềm</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.fixed.software,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">Khấu hao lũy kế</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(
                              balanceSheetData.assets.fixed
                                .accumulatedDepreciation,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 bg-gray-100 px-3 rounded">
                          <span className="font-semibold text-gray-900">
                            Tổng tài sản dài hạn
                          </span>
                          <span className="font-bold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.assets.fixed.total,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Liabilities & Equity */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b-2 border-orange-300 bg-orange-50 px-4 rounded-t-lg">
                      <h3 className="text-lg font-bold text-orange-900">
                        NGUỒN VỐN
                      </h3>
                      <span className="text-lg font-bold text-orange-600">
                        {formatCurrency(balanceSheetData.assets.totalAssets)}
                      </span>
                    </div>

                    {/* Liabilities */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Nợ phải trả
                      </h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">
                            Phải trả người bán
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.liabilities.current
                                .accountsPayable,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">Thuế phải nộp</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.liabilities.current.taxesPayable,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 bg-gray-100 px-3 rounded">
                          <span className="font-semibold text-gray-900">
                            Tổng nợ phải trả
                          </span>
                          <span className="font-bold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.liabilities.totalLiabilities,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Equity */}
                    <div className="mt-18">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Vốn chủ sở hữu
                      </h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">Vốn góp</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(balanceSheetData.equity.capital)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-700">
                            Lợi nhuận giữ lại
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(
                              balanceSheetData.equity.retainedEarnings,
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 bg-green-100 px-3 rounded">
                          <span className="font-semibold text-gray-900">
                            Tổng vốn chủ sở hữu
                          </span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(
                              balanceSheetData.equity.totalEquity,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Verification */}
                    <div className="pt-4 border-t-2 border-gray-300">
                      <div className="flex items-center justify-between py-3 bg-blue-100 px-4 rounded-lg border-2 border-blue-300">
                        <span className="font-bold text-gray-900">
                          TỔNG NGUỒN VỐN
                        </span>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(
                            balanceSheetData.liabilities.totalLiabilities +
                              balanceSheetData.equity.totalEquity,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash Flow Statement */}
          <TabsContent value="cash-flow" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Báo Cáo Lưu Chuyển Tiền Tệ</CardTitle>
                    <CardDescription>
                      Kỳ báo cáo: {cashFlowData.period}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Thay đổi ròng: {formatCurrency(cashFlowData.netChange)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Operating Activities */}
                  <div>
                    <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
                      <h3 className="text-lg font-bold text-gray-900">
                        LƯU CHUYỂN TIỀN TỪ HOẠT ĐỘNG KINH DOANH
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(cashFlowData.operating.total)}
                      </span>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Lợi nhuận ròng</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(cashFlowData.operating.netIncome)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Khấu hao</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(cashFlowData.operating.depreciation)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">
                          Thay đổi các khoản phải thu
                        </span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(
                            cashFlowData.operating.accountsReceivableChange,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="font-semibold text-green-600">
                          {formatCurrency(
                            cashFlowData.operating.accountsPayableChange,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Investing Activities */}
                  <div>
                    <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
                      <h3 className="text-lg font-bold text-gray-900">
                        LƯU CHUYỂN TIỀN TỪ HOẠT ĐỘNG ĐẦU TƯ
                      </h3>
                      <span className="text-lg font-bold text-red-600">
                        {formatCurrency(cashFlowData.investing.total)}
                      </span>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Mua sắm thiết bị</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(
                            cashFlowData.investing.equipmentPurchase,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 pl-6">
                        <span className="text-gray-700">Mua phần mềm</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(
                            cashFlowData.investing.softwarePurchase,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financing Activities */}
                  <div>
                    <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
                      <h3 className="text-lg font-bold text-gray-900">
                        LƯU CHUYỂN TIỀN TỪ HOẠT ĐỘNG TÀI CHÍNH
                      </h3>
                      <span className="text-lg font-bold text-gray-600">
                        {formatCurrency(cashFlowData.financing.total)}
                      </span>
                    </div>
                    <div className="space-y-2 mt-3 pl-6">
                      <p className="text-gray-500 italic">
                        Không có hoạt động tài chính trong kỳ
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 pt-4 border-t-2 border-gray-300">
                    <div className="flex items-center justify-between py-2 bg-blue-50 px-4 rounded-lg">
                      <span className="font-semibold text-gray-900">
                        Thay đổi ròng trong tiền
                      </span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(cashFlowData.netChange)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 pl-6">
                      <span className="text-gray-700">Tiền đầu kỳ</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(cashFlowData.beginningBalance)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 bg-green-100 px-4 rounded-lg border-2 border-green-300">
                      <span className="text-lg font-bold text-gray-900">
                        TIỀN CUỐI KỲ
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(cashFlowData.endingBalance)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng 6 tháng</CardTitle>
                  <CardDescription>
                    So sánh doanh thu, chi phí và lợi nhuận
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyComparison.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">
                            {month.month}
                          </span>
                          <div className="flex gap-4 text-xs">
                            <span className="text-green-600">
                              Thu: {formatNumber(month.revenue / 1000000)}M
                            </span>
                            <span className="text-red-600">
                              Chi: {formatNumber(month.expense / 1000000)}M
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-6">
                          <div
                            className="bg-green-500 rounded-l relative group"
                            style={{
                              width: `${(month.revenue / 1000000000) * 100}%`,
                            }}
                          >
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                              {formatNumber(month.revenue / 1000000)}M
                            </span>
                          </div>
                          <div
                            className="bg-red-500 rounded-r relative group"
                            style={{
                              width: `${(month.expense / 1000000000) * 100}%`,
                            }}
                          >
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                              {formatNumber(month.expense / 1000000)}M
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">
                          Lợi nhuận:{" "}
                          <span className="font-semibold text-green-600">
                            {formatCurrency(month.profit)}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Cơ cấu Doanh Thu</CardTitle>
                  <CardDescription>Phân tích theo nguồn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueBreakdown.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">
                            {item.category}
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expense Breakdown */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Cơ cấu Chi Phí</CardTitle>
                  <CardDescription>Phân tích theo danh mục</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {expenseBreakdown.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">
                            {item.category}
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Ratios */}
            <Card>
              <CardHeader>
                <CardTitle>Các Chỉ Số Tài Chính</CardTitle>
                <CardDescription>
                  Phân tích các tỷ lệ tài chính quan trọng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Tỷ suất lợi nhuận gộp
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {(
                        (profitLossData.grossProfit /
                          profitLossData.revenue.total) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Lợi nhuận gộp / Doanh thu
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Tỷ suất lợi nhuận ròng
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {profitLossData.profitMargin.toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Lợi nhuận ròng / Doanh thu
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Tỷ lệ thanh toán hiện hành
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {(
                        balanceSheetData.assets.current.total /
                        balanceSheetData.liabilities.current.total
                      ).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Tài sản ngắn hạn / Nợ ngắn hạn
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Tỷ lệ nợ trên vốn
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {(
                        (balanceSheetData.liabilities.totalLiabilities /
                          balanceSheetData.equity.totalEquity) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Nợ phải trả / Vốn chủ sở hữu
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Đánh giá Tài Chính
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold">
                          Tỷ suất lợi nhuận tốt:
                        </span>{" "}
                        Tỷ suất lợi nhuận ròng{" "}
                        {profitLossData.profitMargin.toFixed(2)}% cao hơn mức
                        trung bình ngành (20-30%).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold">Thanh khoản mạnh:</span>{" "}
                        Tỷ lệ thanh toán hiện hành{" "}
                        {(
                          balanceSheetData.assets.current.total /
                          balanceSheetData.liabilities.current.total
                        ).toFixed(2)}{" "}
                        cho thấy khả năng thanh toán tốt.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold">
                          Cấu trúc vốn lành mạnh:
                        </span>{" "}
                        Tỷ lệ nợ/vốn{" "}
                        {(
                          (balanceSheetData.liabilities.totalLiabilities /
                            balanceSheetData.equity.totalEquity) *
                          100
                        ).toFixed(2)}
                        % thấp, công ty ít phụ thuộc vào nợ.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold">Cần theo dõi:</span> Các
                        khoản phải thu chiếm tỷ trọng lớn trong tài sản ngắn
                        hạn, cần tăng cường thu hồi công nợ.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
