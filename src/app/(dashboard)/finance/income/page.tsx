"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Receipt,
  Wallet,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IncomeExpensePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("income");

  // Mock data
  const summaryStats = [
    {
      title: "Tổng thu tháng này",
      value: "85M",
      change: "+15.2%",
      trend: "up",
      icon: ArrowUpRight,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tổng chi tháng này",
      value: "48M",
      change: "+12.5%",
      trend: "up",
      icon: ArrowDownRight,
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Lợi nhuận tháng này",
      value: "36M",
      change: "+18.7%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Số dư hiện tại",
      value: "100M",
      change: "+5.3%",
      trend: "up",
      icon: Wallet,
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const incomeTransactions = [
    {
      id: 1,
      date: "2025-10-20",
      code: "THU-2025-156",
      customer: "Công ty TNHH ABC",
      project: "E-commerce Platform",
      category: "Thanh toán dự án",
      amount: 250000000,
      paymentMethod: "Chuyển khoản",
      status: "completed",
      invoice: "INV-2025-156",
      description: "Thanh toán giai đoạn 2",
    },
    {
      id: 2,
      date: "2025-10-18",
      code: "THU-2025-155",
      customer: "Ngân hàng XYZ",
      project: "Mobile Banking App",
      category: "Thanh toán dự án",
      amount: 380000000,
      paymentMethod: "Chuyển khoản",
      status: "completed",
      invoice: "INV-2025-155",
      description: "Thanh toán milestone 3",
    },
    {
      id: 3,
      date: "2025-10-15",
      code: "THU-2025-154",
      customer: "Tập đoàn DEF",
      project: "CRM System",
      category: "Thanh toán dự án",
      amount: 180000000,
      paymentMethod: "Tiền mặt",
      status: "completed",
      invoice: "INV-2025-154",
      description: "Thanh toán giai đoạn 1",
    },
    {
      id: 4,
      date: "2025-10-10",
      code: "THU-2025-153",
      customer: "Startup GHI",
      project: "Website Landing Page",
      category: "Tư vấn",
      amount: 40000000,
      paymentMethod: "Chuyển khoản",
      status: "pending",
      invoice: "INV-2025-153",
      description: "Tư vấn thiết kế UX/UI",
    },
  ];

  const expenseTransactions = [
    {
      id: 1,
      date: "2025-10-22",
      code: "CHI-2025-301",
      vendor: "Văn phòng cho thuê",
      category: "Văn phòng",
      subcategory: "Tiền thuê",
      amount: 6500000,
      paymentMethod: "Chuyển khoản",
      status: "completed",
      project: "Chi phí chung",
      description: "Tiền thuê văn phòng tháng 10",
    },
    {
      id: 2,
      date: "2025-10-20",
      code: "CHI-2025-300",
      vendor: "Amazon Web Services",
      category: "Cloud Hosting",
      subcategory: "AWS",
      amount: 450000,
      paymentMethod: "Thẻ tín dụng",
      status: "completed",
      project: "E-commerce Platform",
      description: "Chi phí cloud tháng 10",
    },
    {
      id: 3,
      date: "2025-10-18",
      code: "CHI-2025-299",
      vendor: "Nhân viên",
      category: "Nhân sự",
      subcategory: "Lương",
      amount: 280000000,
      paymentMethod: "Chuyển khoản",
      status: "completed",
      project: "Nhiều dự án",
      description: "Lương tháng 10/2025",
    },
    {
      id: 4,
      date: "2025-10-15",
      code: "CHI-2025-298",
      vendor: "Dell Vietnam",
      category: "Thiết bị",
      subcategory: "Máy tính",
      amount: 35000000,
      paymentMethod: "Chuyển khoản",
      status: "pending",
      project: "Chi phí chung",
      description: "Mua 2 laptop Dell XPS",
    },
    {
      id: 5,
      date: "2025-10-12",
      code: "CHI-2025-297",
      vendor: "Điện lực TP.HCM",
      category: "Văn phòng",
      subcategory: "Tiền điện",
      amount: 8500000,
      paymentMethod: "Chuyển khoản",
      status: "completed",
      project: "Chi phí chung",
      description: "Tiền điện tháng 9",
    },
  ];

  const monthlyData = [
    { month: "Tháng 5", income: 650000000, expense: 420000000 },
    { month: "Tháng 6", income: 720000000, expense: 445000000 },
    { month: "Tháng 7", income: 680000000, expense: 430000000 },
    { month: "Tháng 8", income: 780000000, expense: 465000000 },
    { month: "Tháng 9", income: 740000000, expense: 432000000 },
    { month: "Tháng 10", income: 850000000, expense: 485000000 },
  ];

  const categoryBreakdown = {
    income: [
      {
        name: "Thanh toán dự án",
        amount: 740000000,
        percentage: 87,
        color: "bg-blue-500",
      },
      {
        name: "Tư vấn",
        amount: 85000000,
        percentage: 10,
        color: "bg-green-500",
      },
      {
        name: "Bảo trì & Hỗ trợ",
        amount: 25000000,
        percentage: 3,
        color: "bg-purple-500",
      },
    ],
    expense: [
      {
        name: "Nhân sự",
        amount: 28000000,
        percentage: 58,
        color: "bg-red-500",
      },
      {
        name: "Cloud & Hosting",
        amount: 8500000,
        percentage: 17,
        color: "bg-orange-500",
      },
      {
        name: "Văn phòng",
        amount: 6500000,
        percentage: 13,
        color: "bg-yellow-500",
      },
      {
        name: "Thiết bị & Tools",
        amount: 550000,
        percentage: 12,
        color: "bg-pink-500",
      },
    ],
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: {
        label: "Hoàn thành",
        variant: "default",
        icon: CheckCircle2,
        color: "text-green-600",
      },
      pending: {
        label: "Chờ xử lý",
        variant: "secondary",
        icon: Clock,
        color: "text-yellow-600",
      },
      cancelled: {
        label: "Đã hủy",
        variant: "destructive",
        icon: XCircle,
        color: "text-red-600",
      },
    };
    const { label, variant, icon: Icon, color } = config[status];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className={`w-3 h-3 ${color}`} />
        {label}
      </Badge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white rounded-md shadow-sm p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý Thu Chi
            </h1>
            <p className="text-gray-500 mt-1">
              Theo dõi doanh thu, chi phí và lợi nhuận
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất báo cáo
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Thêm giao dịch
            </Button>
          </div>
        </div>

        {/* Summary Stats – Income Page (100% theo style gốc) */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {summaryStats.map((stat, index) => (
            <Card className="@container/card" key={index}>
              <CardHeader>
                {/* Tiêu đề */}
                <CardDescription>{stat.title}</CardDescription>

                {/* Giá trị chính */}
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {stat.value}
                </CardTitle>

                {/* Badge trend (outline) */}
                <CardAction>
                  <Badge variant="outline">
                    {stat.trend === "up" ? (
                      <TrendingUp className="size-4" />
                    ) : (
                      <TrendingDown className="size-4" />
                    )}
                    {stat.change}
                  </Badge>
                </CardAction>
              </CardHeader>

              {/* Footer – mô tả xu hướng + icon màu */}
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex items-center gap-2 font-medium">
                  {stat.trend === "up" ? (
                    <>
                      <span>Xu hướng tăng trong tháng</span>
                      <TrendingUp className="size-4 text-green-500" />
                    </>
                  ) : (
                    <>
                      <span>Xu hướng giảm trong tháng</span>
                      <TrendingDown className="size-4 text-red-500" />
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expense Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Biểu đồ Thu Chi</CardTitle>
              <CardDescription>
                So sánh doanh thu và chi phí 6 tháng gần đây
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {item.month}
                      </span>
                      <div className="flex gap-4">
                        <span className="text-green-600 font-semibold">
                          {formatCurrency(item.income)}
                        </span>
                        <span className="text-red-600 font-semibold">
                          {formatCurrency(item.expense)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-8">
                      <div
                        className="bg-green-500 rounded-l"
                        style={{
                          width: `${(item.income / 1000000000) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-red-500 rounded-r"
                        style={{
                          width: `${(item.expense / 1000000000) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Lợi nhuận: {formatCurrency(item.income - item.expense)}
                      </span>
                      <span>
                        {(
                          ((item.income - item.expense) / item.income) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-sm text-gray-600">Thu nhập</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span className="text-sm text-gray-600">Chi phí</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ theo danh mục</CardTitle>
              <CardDescription>Tháng 10/2025</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="income" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="income">Thu</TabsTrigger>
                  <TabsTrigger value="expense">Chi</TabsTrigger>
                </TabsList>
                <TabsContent value="income" className="space-y-4 mt-4">
                  {categoryBreakdown.income.map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {cat.name}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {cat.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${cat.color}`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(cat.amount)}
                      </p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="expense" className="space-y-4 mt-4">
                  {categoryBreakdown.expense.map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {cat.name}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {cat.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${cat.color}`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(cat.amount)}
                      </p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Giao dịch</CardTitle>
                <CardDescription>
                  Danh sách các giao dịch thu chi
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Tìm kiếm..." className="pl-9 w-64" />
                </div>
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="w-40">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hôm nay</SelectItem>
                    <SelectItem value="thisWeek">Tuần này</SelectItem>
                    <SelectItem value="thisMonth">Tháng này</SelectItem>
                    <SelectItem value="thisQuarter">Quý này</SelectItem>
                    <SelectItem value="thisYear">Năm nay</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Tất cả</TabsTrigger>
                <TabsTrigger value="income">Thu nhập</TabsTrigger>
                <TabsTrigger value="expense">Chi phí</TabsTrigger>
              </TabsList>

              <TabsContent value="income" className="mt-6">
                <div className="space-y-3">
                  {incomeTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-green-200 rounded-lg">
                          <ArrowUpRight className="w-5 h-5 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-gray-900">
                              {transaction.customer}
                            </p>
                            {getStatusBadge(transaction.status)}
                            <Badge variant="outline">
                              {transaction.invoice}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {transaction.project} • {transaction.category}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-700">
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.paymentMethod}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              Xem hóa đơn
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="expense" className="mt-6">
                <div className="space-y-3">
                  {expenseTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-red-200 rounded-lg">
                          <ArrowDownRight className="w-5 h-5 text-red-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-gray-900">
                              {transaction.vendor}
                            </p>
                            {getStatusBadge(transaction.status)}
                            <Badge variant="outline">{transaction.code}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {transaction.category} • {transaction.subcategory} •{" "}
                            {transaction.project}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xl font-bold text-red-700">
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.paymentMethod}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Receipt className="w-4 h-4 mr-2" />
                              Xem phiếu chi
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-3">
                  {[
                    ...incomeTransactions.slice(0, 2),
                    ...expenseTransactions.slice(0, 3),
                  ]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((transaction) => {
                      const isIncome = transaction.customer !== undefined;
                      return (
                        <div
                          key={transaction.id}
                          className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all ${isIncome ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div
                              className={`p-2 rounded-lg ${isIncome ? "bg-green-200" : "bg-red-200"}`}
                            >
                              {isIncome ? (
                                <ArrowUpRight className="w-5 h-5 text-green-700" />
                              ) : (
                                <ArrowDownRight className="w-5 h-5 text-red-700" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <p className="font-semibold text-gray-900">
                                  {isIncome
                                    ? transaction.customer
                                    : transaction.vendor}
                                </p>
                                {getStatusBadge(transaction.status)}
                                <Badge variant="outline">
                                  {isIncome
                                    ? transaction.invoice
                                    : transaction.code}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {isIncome
                                  ? `${transaction.project} • ${transaction.category}`
                                  : `${transaction.category} • ${transaction.subcategory}`}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {transaction.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p
                                className={`text-xl font-bold ${isIncome ? "text-green-700" : "text-red-700"}`}
                              >
                                {isIncome ? "+" : "-"}
                                {formatCurrency(transaction.amount)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(transaction.date)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {transaction.paymentMethod}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thêm giao dịch mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin giao dịch thu hoặc chi
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Loại giao dịch</Label>
              <Select
                value={transactionType}
                onValueChange={setTransactionType}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      Thu nhập
                    </div>
                  </SelectItem>
                  <SelectItem value="expense">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                      Chi phí
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {transactionType === "income" ? (
              <>
                <div className="space-y-2">
                  <Label>Khách hàng</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Công ty TNHH ABC</SelectItem>
                      <SelectItem value="2">Ngân hàng XYZ</SelectItem>
                      <SelectItem value="3">Tập đoàn DEF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">E-commerce Platform</SelectItem>
                      <SelectItem value="2">Mobile Banking App</SelectItem>
                      <SelectItem value="3">CRM System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Danh mục thu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">Thanh toán dự án</SelectItem>
                      <SelectItem value="consulting">Tư vấn</SelectItem>
                      <SelectItem value="maintenance">
                        Bảo trì & Hỗ trợ
                      </SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Số hóa đơn</Label>
                  <Input placeholder="VD: INV-2025-156" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Nhà cung cấp / Người nhận</Label>
                  <Input placeholder="VD: Amazon Web Services" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Danh mục chi</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Văn phòng</SelectItem>
                        <SelectItem value="hr">Nhân sự</SelectItem>
                        <SelectItem value="cloud">Cloud & Hosting</SelectItem>
                        <SelectItem value="equipment">Thiết bị</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Danh mục con</Label>
                    <Input placeholder="VD: AWS, Tiền thuê..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dự án (nếu có)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn dự án hoặc Chi phí chung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Chi phí chung</SelectItem>
                      <SelectItem value="1">E-commerce Platform</SelectItem>
                      <SelectItem value="2">Mobile Banking App</SelectItem>
                      <SelectItem value="3">CRM System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số tiền (VNĐ)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Ngày giao dịch</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phương thức thanh toán</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Chuyển khoản</SelectItem>
                    <SelectItem value="cash">Tiền mặt</SelectItem>
                    <SelectItem value="card">Thẻ tín dụng</SelectItem>
                    <SelectItem value="ewallet">Ví điện tử</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select defaultValue="completed">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea placeholder="Nhập mô tả chi tiết..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm giao dịch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
