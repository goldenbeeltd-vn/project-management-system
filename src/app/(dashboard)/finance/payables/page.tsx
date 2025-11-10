"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Send,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Phone,
  Mail,
  FileText,
  Bell,
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
import { Progress } from "@/components/ui/progress";

export default function AccountsReceivablePayablePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [debtType, setDebtType] = useState("receivable");

  // Mock data
  const summaryStats = [
    {
      title: "Tổng phải thu",
      value: "250M",
      change: "-8.5%",
      trend: "down",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tổng phải trả",
      value: "48M",
      change: "+5.2%",
      trend: "up",
      icon: TrendingDown,
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Quá hạn phải thu",
      value: "12M",
      change: "+12.3%",
      trend: "up",
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-50",
      alert: true,
    },
    {
      title: "Quá hạn phải trả",
      value: "35M",
      change: "-15.8%",
      trend: "down",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const accountsReceivable = [
    {
      id: 1,
      customer: "Công ty TNHH ABC",
      contact: "Nguyễn Văn A",
      email: "nguyenvana@abc.com",
      phone: "0901234567",
      project: "E-commerce Platform",
      invoiceNumber: "INV-2025-156",
      invoiceDate: "2025-09-15",
      dueDate: "2025-10-15",
      amount: 250000000,
      paid: 0,
      remaining: 250000000,
      status: "overdue",
      daysOverdue: 9,
      notes: "Đã nhắc nhở 3 lần",
    },
    {
      id: 2,
      customer: "Ngân hàng XYZ",
      contact: "Trần Thị B",
      email: "tranthib@xyz.bank",
      phone: "0912345678",
      project: "Mobile Banking App",
      invoiceNumber: "INV-2025-155",
      invoiceDate: "2025-09-20",
      dueDate: "2025-10-20",
      amount: 380000000,
      paid: 190000000,
      remaining: 190000000,
      status: "partial",
      daysOverdue: 4,
      notes: "Đã thanh toán 50%",
    },
    {
      id: 3,
      customer: "Tập đoàn DEF",
      contact: "Lê Văn C",
      email: "levanc@def.com",
      phone: "0923456789",
      project: "CRM System",
      invoiceNumber: "INV-2025-154",
      invoiceDate: "2025-10-01",
      dueDate: "2025-11-01",
      amount: 180000000,
      paid: 0,
      remaining: 180000000,
      status: "pending",
      daysOverdue: 0,
      notes: "Chờ thanh toán",
    },
    {
      id: 4,
      customer: "Startup GHI",
      contact: "Phạm Thị D",
      email: "phamthid@ghi.vn",
      phone: "0934567890",
      project: "Website Landing Page",
      invoiceNumber: "INV-2025-153",
      invoiceDate: "2025-10-10",
      dueDate: "2025-11-10",
      amount: 40000000,
      paid: 0,
      remaining: 40000000,
      status: "pending",
      daysOverdue: 0,
      notes: "",
    },
  ];

  const accountsPayable = [
    {
      id: 1,
      vendor: "Amazon Web Services",
      contact: "AWS Support",
      email: "billing@aws.amazon.com",
      phone: "+1-206-266-4064",
      category: "Cloud Hosting",
      invoiceNumber: "AWS-2025-10-001",
      invoiceDate: "2025-10-01",
      dueDate: "2025-10-15",
      amount: 45000000,
      paid: 0,
      remaining: 45000000,
      status: "overdue",
      daysOverdue: 9,
      notes: "Cần thanh toán gấp",
    },
    {
      id: 2,
      vendor: "Microsoft Azure",
      contact: "Azure Billing",
      email: "billing@azure.com",
      phone: "+1-800-642-7676",
      category: "Cloud Hosting",
      invoiceNumber: "AZ-2025-10-002",
      invoiceDate: "2025-10-05",
      dueDate: "2025-10-20",
      amount: 38000000,
      paid: 0,
      remaining: 38000000,
      status: "pending",
      daysOverdue: 0,
      notes: "",
    },
    {
      id: 3,
      vendor: "Dell Vietnam",
      contact: "Sales Department",
      email: "sales@dell.vn",
      phone: "1800-1060",
      category: "Thiết bị",
      invoiceNumber: "DELL-2025-001",
      invoiceDate: "2025-10-10",
      dueDate: "2025-10-25",
      amount: 35000000,
      paid: 0,
      remaining: 35000000,
      status: "pending",
      daysOverdue: 0,
      notes: "Đã đặt hàng 2 laptop",
    },
    {
      id: 4,
      vendor: "Văn phòng cho thuê",
      contact: "Phòng Kinh Doanh",
      email: "info@officerent.vn",
      phone: "0283456789",
      category: "Văn phòng",
      invoiceNumber: "RENT-2025-10",
      invoiceDate: "2025-10-01",
      dueDate: "2025-10-05",
      amount: 45000000,
      paid: 45000000,
      remaining: 0,
      status: "paid",
      daysOverdue: 0,
      notes: "Đã thanh toán đầy đủ",
    },
  ];

  const agingReport = {
    receivable: [
      {
        period: "Chưa đến hạn",
        amount: 220000000,
        count: 2,
        color: "bg-green-500",
      },
      {
        period: "1-30 ngày",
        amount: 380000000,
        count: 1,
        color: "bg-yellow-500",
      },
      {
        period: "31-60 ngày",
        amount: 250000000,
        count: 1,
        color: "bg-orange-500",
      },
      { period: "61-90 ngày", amount: 0, count: 0, color: "bg-red-500" },
      { period: ">90 ngày", amount: 0, count: 0, color: "bg-red-700" },
    ],
    payable: [
      {
        period: "Chưa đến hạn",
        amount: 73000000,
        count: 2,
        color: "bg-green-500",
      },
      {
        period: "1-30 ngày",
        amount: 45000000,
        count: 1,
        color: "bg-yellow-500",
      },
      { period: "31-60 ngày", amount: 0, count: 0, color: "bg-orange-500" },
      { period: "61-90 ngày", amount: 0, count: 0, color: "bg-red-500" },
      { period: ">90 ngày", amount: 0, count: 0, color: "bg-red-700" },
    ],
  };

  const getStatusBadge = (status) => {
    const config = {
      paid: {
        label: "Đã thanh toán",
        variant: "default",
        icon: CheckCircle2,
        color: "bg-green-100 text-green-800",
      },
      partial: {
        label: "Thanh toán 1 phần",
        variant: "secondary",
        icon: Clock,
        color: "bg-blue-100 text-blue-800",
      },
      pending: {
        label: "Chờ thanh toán",
        variant: "secondary",
        icon: Clock,
        color: "bg-yellow-100 text-yellow-800",
      },
      overdue: {
        label: "Quá hạn",
        variant: "destructive",
        icon: AlertCircle,
        color: "bg-red-100 text-red-800",
      },
      cancelled: {
        label: "Đã hủy",
        variant: "outline",
        icon: XCircle,
        color: "bg-gray-100 text-gray-800",
      },
    };
    const { label, icon: Icon, color } = config[status];
    return (
      <Badge className={`gap-1 ${color}`}>
        <Icon className="w-3 h-3" />
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

  const calculateProgress = (paid, total) => {
    return ((paid / total) * 100).toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý Công Nợ
            </h1>
            <p className="text-gray-500 mt-1">
              Theo dõi công nợ phải thu và phải trả
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất báo cáo
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsReminderDialogOpen(true)}
              className="gap-2"
            >
              <Bell className="w-4 h-4" />
              Gửi nhắc nợ
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Thêm công nợ
            </Button>
          </div>
        </div>

        {/* Summary Stats – Payables Page (Style chuẩn + hỗ trợ alert) */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {summaryStats.map((stat, index) => {
            // Xác định màu trend dựa trên trend + alert
            const isPositive = stat.alert
              ? stat.trend === "down"
              : stat.trend === "up";
            const trendColor = isPositive ? "text-green-500" : "text-red-500";

            return (
              <Card className="@container/card" key={index}>
                <CardHeader>
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {stat.value}
                  </CardTitle>
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

                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex items-center gap-2 font-medium">
                    {isPositive ? (
                      <>
                        <span>Xu hướng tăng trong tháng</span>
                        <TrendingUp className={`size-4 ${trendColor}`} />
                      </>
                    ) : (
                      <>
                        <span>Xu hướng giảm trong tháng</span>
                        <TrendingDown className={`size-4 ${trendColor}`} />
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Aging Report */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Receivable Aging */}
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Tuổi nợ phải thu</CardTitle>
              <CardDescription>
                Phân tích công nợ theo thời gian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agingReport.receivable.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {item.period}
                      </span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.count} hóa đơn
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{
                          width: `${(item.amount / 1250000000) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payable Aging */}
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Tuổi nợ phải trả</CardTitle>
              <CardDescription>
                Phân tích công nợ theo thời gian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agingReport.payable.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {item.period}
                      </span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.count} hóa đơn
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.amount / 485000000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách Công Nợ</CardTitle>
                <CardDescription>
                  Quản lý chi tiết công nợ phải thu và phải trả
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Tìm kiếm..." className="pl-9 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="overdue">Quá hạn</SelectItem>
                    <SelectItem value="pending">Chờ thanh toán</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="receivable">Phải Thu</TabsTrigger>
                <TabsTrigger value="payable">Phải Trả</TabsTrigger>
              </TabsList>

              <TabsContent value="receivable" className="mt-6">
                <div className="space-y-4">
                  {accountsReceivable.map((account) => (
                    <Card
                      key={account.id}
                      className={
                        account.status === "overdue"
                          ? "border-red-200 bg-red-50"
                          : ""
                      }
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Building2 className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {account.customer}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {account.project}
                                </p>
                              </div>
                              {getStatusBadge(account.status)}
                              {account.status === "overdue" && (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Quá hạn {account.daysOverdue} ngày
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500">
                                  Người liên hệ
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {account.contact}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Mail className="w-3 h-3 text-gray-400" />
                                  <p className="text-xs text-gray-600">
                                    {account.email}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3 text-gray-400" />
                                  <p className="text-xs text-gray-600">
                                    {account.phone}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Số hóa đơn
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {account.invoiceNumber}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Ngày: {formatDate(account.invoiceDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Hạn thanh toán
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {formatDate(account.dueDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Tổng tiền
                                </p>
                                <p className="text-lg font-bold text-blue-600 mt-1">
                                  {formatCurrency(account.amount)}
                                </p>
                              </div>
                            </div>

                            {account.paid > 0 && (
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">
                                    Đã thanh toán:{" "}
                                    {formatCurrency(account.paid)}
                                  </span>
                                  <span className="text-gray-600">
                                    Còn lại: {formatCurrency(account.remaining)}
                                  </span>
                                </div>
                                <Progress
                                  value={calculateProgress(
                                    account.paid,
                                    account.amount,
                                  )}
                                  className="h-2"
                                />
                              </div>
                            )}

                            {account.notes && (
                              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-gray-700">
                                  <FileText className="w-4 h-4 inline mr-2 text-yellow-600" />
                                  {account.notes}
                                </p>
                              </div>
                            )}
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
                                <Send className="w-4 h-4 mr-2" />
                                Gửi nhắc nhở
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Đánh dấu đã thu
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payable" className="mt-6">
                <div className="space-y-4">
                  {accountsPayable.map((account) => (
                    <Card
                      key={account.id}
                      className={
                        account.status === "overdue"
                          ? "border-red-200 bg-red-50"
                          : account.status === "paid"
                            ? "border-green-200 bg-green-50"
                            : ""
                      }
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`p-2 rounded-lg ${account.status === "paid" ? "bg-green-100" : "bg-orange-100"}`}
                              >
                                <Users
                                  className={`w-5 h-5 ${account.status === "paid" ? "text-green-600" : "text-orange-600"}`}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {account.vendor}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {account.category}
                                </p>
                              </div>
                              {getStatusBadge(account.status)}
                              {account.status === "overdue" && (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Quá hạn {account.daysOverdue} ngày
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500">
                                  Người liên hệ
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {account.contact}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Mail className="w-3 h-3 text-gray-400" />
                                  <p className="text-xs text-gray-600">
                                    {account.email}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3 text-gray-400" />
                                  <p className="text-xs text-gray-600">
                                    {account.phone}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Số hóa đơn
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {account.invoiceNumber}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Ngày: {formatDate(account.invoiceDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Hạn thanh toán
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  {formatDate(account.dueDate)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Tổng tiền
                                </p>
                                <p
                                  className={`text-lg font-bold mt-1 ${account.status === "paid" ? "text-green-600" : "text-orange-600"}`}
                                >
                                  {formatCurrency(account.amount)}
                                </p>
                              </div>
                            </div>

                            {account.paid > 0 && account.remaining > 0 && (
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">
                                    Đã thanh toán:{" "}
                                    {formatCurrency(account.paid)}
                                  </span>
                                  <span className="text-gray-600">
                                    Còn lại: {formatCurrency(account.remaining)}
                                  </span>
                                </div>
                                <Progress
                                  value={calculateProgress(
                                    account.paid,
                                    account.amount,
                                  )}
                                  className="h-2"
                                />
                              </div>
                            )}

                            {account.notes && (
                              <div
                                className={`p-3 rounded-lg border ${account.status === "overdue" ? "bg-red-100 border-red-200" : "bg-blue-50 border-blue-200"}`}
                              >
                                <p className="text-sm text-gray-700">
                                  <FileText
                                    className={`w-4 h-4 inline mr-2 ${account.status === "overdue" ? "text-red-600" : "text-blue-600"}`}
                                  />
                                  {account.notes}
                                </p>
                              </div>
                            )}
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
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Đánh dấu đã trả
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Add Debt Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thêm công nợ mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin công nợ cần theo dõi
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 w-full">
            <div className="space-y-2 w-full">
              <Label>Loại công nợ</Label>
              <Select value={debtType} onValueChange={setDebtType}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receivable">
                    Phải Thu (Khách hàng nợ)
                  </SelectItem>
                  <SelectItem value="payable">
                    Phải Trả (Nợ nhà cung cấp)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {debtType === "receivable" ? (
              <>
                <div className="space-y-2">
                  <Label>Khách hàng</Label>
                  <Select>
                    <SelectTrigger className="w-full">
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
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">E-commerce Platform</SelectItem>
                      <SelectItem value="2">Mobile Banking App</SelectItem>
                      <SelectItem value="3">CRM System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Nhà cung cấp</Label>
                  <Input placeholder="VD: Amazon Web Services" />
                </div>

                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud & Hosting</SelectItem>
                      <SelectItem value="equipment">Thiết bị</SelectItem>
                      <SelectItem value="office">Văn phòng</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Người liên hệ</Label>
                <Input placeholder="VD: Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input placeholder="VD: 0901234567" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="VD: contact@company.com" />
            </div>

            <div className="space-y-2">
              <Label>Số hóa đơn</Label>
              <Input placeholder="VD: INV-2025-001" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Tổng tiền (VNĐ)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Ngày hóa đơn</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Hạn thanh toán</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Nhập ghi chú..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm công nợ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Reminder Dialog */}
      <Dialog
        open={isReminderDialogOpen}
        onOpenChange={setIsReminderDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gửi nhắc nở thanh toán</DialogTitle>
            <DialogDescription>
              Chọn công nợ cần nhắc nhở và tùy chỉnh nội dung email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Chọn công nợ</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn hóa đơn cần nhắc nhở" />
                </SelectTrigger>
                <SelectContent>
                  {accountsReceivable
                    .filter(
                      (a) => a.status === "overdue" || a.status === "pending",
                    )
                    .map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.customer} - {account.invoiceNumber} -{" "}
                        {formatCurrency(account.remaining)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tiêu đề email</Label>
              <Input placeholder="Nhắc nhở thanh toán hóa đơn..." />
            </div>

            <div className="space-y-2">
              <Label>Nội dung email</Label>
              <Textarea
                placeholder="Kính gửi Quý khách,&#10;&#10;Chúng tôi xin nhắc nhở về khoản thanh toán hóa đơn..."
                rows={8}
              />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <Bell className="w-4 h-4 inline mr-2" />
                Email sẽ được gửi đến địa chỉ email của khách hàng đã đăng ký.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReminderDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={() => setIsReminderDialogOpen(false)}>
              <Send className="w-4 h-4 mr-2" />
              Gửi nhắc nhở
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
