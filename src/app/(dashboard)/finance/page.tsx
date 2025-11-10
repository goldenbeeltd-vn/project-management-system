"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Building2,
  FolderKanban,
  CalendarIcon,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Users,
  Server,
  Wrench,
  CreditCard,
  Home,
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
import { Label } from "@/components/ui/label";

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
import { Textarea } from "@/components/ui/textarea";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCostType, setSelectedCostType] = useState("company");

  // Mock data
  const summaryStats = [
    {
      title: "Chi phí tháng này",
      value: "485M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Chi phí công ty",
      value: "185M",
      change: "+5.2%",
      trend: "up",
      icon: Building2,
    },
    {
      title: "Chi phí dự án",
      value: "299M",
      change: "+18.3%",
      trend: "up",
      icon: FolderKanban,
    },
    {
      title: "Dự toán còn lại",
      value: "314M",
      change: "-8.7%",
      trend: "down",
      icon: TrendingDown,
    },
  ];

  const companyCosts = [
    {
      id: 1,
      category: "Văn phòng",
      icon: Home,
      items: [
        {
          name: "Tiền thuê văn phòng",
          amount: 4000000,
          date: "2025-10-01",
          status: "paid",
        },
        {
          name: "Tiền điện",
          amount: 850000,
          date: "2025-10-05",
          status: "paid",
        },
        {
          name: "Tiền nước",
          amount: 341000,
          date: "2025-10-05",
          status: "paid",
        },
        {
          name: "Internet Wifi",
          amount: 240000,
          date: "2025-10-01",
          status: "paid",
        },
      ],
    },
    {
      id: 2,
      category: "Nhân sự",
      icon: Users,
      items: [
        {
          name: "HR Manager",
          amount: 5000000,
          date: "2025-10-01",
          status: "paid",
        },
        {
          name: "Kế toán",
          amount: 1800000,
          date: "2025-10-01",
          status: "paid",
        },
        { name: "BE", amount: 10000000, date: "2025-10-01", status: "paid" },
        { name: "FE", amount: 10000000, date: "2025-10-01", status: "paid" },
        {
          name: "Designer",
          amount: 2000000,
          date: "2025-10-01",
          status: "paid",
        },
      ],
    },
    {
      id: 3,
      category: "Thiết bị & Tools",
      icon: Server,
      items: [
        {
          name: "Canva Pro",
          amount: 200000,
          date: "2025-10-10",
          status: "pending",
        },
        {
          name: "GitHub Enterprise",
          amount: 50000,
          date: "2025-10-01",
          status: "paid",
        },
        {
          name: "Máy in nhiệt ",
          amount: 500000,
          date: "2025-10-03",
          status: "paid",
        },
      ],
    },
    {
      id: 4,
      category: "Dịch vụ",
      icon: Wrench,
      items: [
        {
          name: "Dịch vụ kế toán",
          amount: 12000000,
          date: "2025-10-15",
          status: "pending",
        },
        {
          name: "Bảo hiểm",
          amount: 15500000,
          date: "2025-10-01",
          status: "paid",
        },
        { name: "Thuế", amount: 1500000, date: "2025-10-01", status: "paid" },
      ],
    },
  ];

  const projectCosts = [
    {
      id: 1,
      name: "E-commerce Platform",
      code: "PROJ-2025-001",
      budget: 450000000,
      spent: 285000000,
      team: 8,
      status: "active",
      categories: [
        { name: "Nhân sự", amount: 180000000, icon: Users },
        { name: "Cloud Hosting (AWS)", amount: 45000000, icon: Server },
        { name: "Third-party APIs", amount: 35000000, icon: CreditCard },
        { name: "Tools & Licenses", amount: 25000000, icon: Wrench },
      ],
    },
    {
      id: 2,
      name: "Mobile Banking App",
      code: "PROJ-2025-002",
      budget: 380000000,
      spent: 195000000,
      team: 6,
      status: "active",
      categories: [
        { name: "Nhân sự", amount: 120000000, icon: Users },
        { name: "Cloud Hosting (Azure)", amount: 38000000, icon: Server },
        { name: "Security Services", amount: 22000000, icon: CreditCard },
        { name: "Testing Tools", amount: 15000000, icon: Wrench },
      ],
    },
    {
      id: 3,
      name: "CRM System",
      code: "PROJ-2025-003",
      budget: 280000000,
      spent: 95000000,
      team: 5,
      status: "active",
      categories: [
        { name: "Nhân sự", amount: 65000000, icon: Users },
        { name: "Infrastructure", amount: 18000000, icon: Server },
        { name: "Analytics Tools", amount: 12000000, icon: CreditCard },
      ],
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      paid: "default",
      pending: "secondary",
      active: "default",
      completed: "outline",
    };
    const labels = {
      paid: "Đã thanh toán",
      pending: "Chờ thanh toán",
      active: "Đang thực hiện",
      completed: "Hoàn thành",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const calculatePercentage = (spent, budget) => {
    return ((spent / budget) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-white rounded-md p-6 shadow">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất báo cáo
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Thêm chi phí
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {summaryStats.map((stat, index) => (
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
                <div
                  className={`line-clamp-1 flex items-center gap-2 font-medium ${
                    stat.trend === "up"
                  }`}
                >
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

        {/* Main Content Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Chi tiết chi phí</CardTitle>
                <CardDescription>
                  Xem và quản lý chi phí theo từng danh mục
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Tìm kiếm..." className="pl-9 w-64" />
                </div>
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="w-40">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">Tháng này</SelectItem>
                    <SelectItem value="lastMonth">Tháng trước</SelectItem>
                    <SelectItem value="thisQuarter">Quý này</SelectItem>
                    <SelectItem value="thisYear">Năm nay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="company">Chi phí công ty</TabsTrigger>
                <TabsTrigger value="projects">Chi phí dự án</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Company Costs Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Chi phí công ty
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {companyCosts.map((category) => {
                        const total = category.items.reduce(
                          (sum, item) => sum + item.amount,
                          0,
                        );
                        return (
                          <div
                            key={category.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded-lg">
                                <category.icon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {category.category}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {category.items.length} khoản
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(total)}
                            </p>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  {/* Project Costs Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FolderKanban className="w-5 h-5" />
                        Chi phí dự án
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {projectCosts.map((project) => {
                        const percentage = calculatePercentage(
                          project.spent,
                          project.budget,
                        );
                        return (
                          <div key={project.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {project.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {project.code}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  {formatCurrency(project.spent)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  / {formatCurrency(project.budget)}
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  percentage > 80
                                    ? "bg-red-500"
                                    : percentage > 60
                                      ? "bg-orange-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              {percentage}% đã sử dụng
                            </p>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="company" className="mt-6">
                <div className="space-y-6">
                  {companyCosts.map((category) => (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <category.icon className="w-5 h-5" />
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {category.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <p className="font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  {getStatusBadge(item.status)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(item.date).toLocaleDateString(
                                    "vi-VN",
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <p className="font-semibold text-gray-900">
                                  {formatCurrency(item.amount)}
                                </p>
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
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <div className="space-y-6">
                  {projectCosts.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {project.name}
                              {getStatusBadge(project.status)}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              Mã: {project.code} • Đội ngũ: {project.team} người
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {formatCurrency(project.spent)}
                            </p>
                            <p className="text-sm text-gray-500">
                              / {formatCurrency(project.budget)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                          <div
                            className={`h-3 rounded-full ${
                              calculatePercentage(
                                project.spent,
                                project.budget,
                              ) > 80
                                ? "bg-red-500"
                                : calculatePercentage(
                                      project.spent,
                                      project.budget,
                                    ) > 60
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${calculatePercentage(project.spent, project.budget)}%`,
                            }}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.categories.map((category, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg">
                                  <category.icon className="w-5 h-5 text-gray-600" />
                                </div>
                                <p className="font-medium text-gray-900">
                                  {category.name}
                                </p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(category.amount)}
                              </p>
                            </div>
                          ))}
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

      {/* Add Cost Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm chi phí mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi phí cần thêm vào hệ thống
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2 w-full">
              <Label>Loại chi phí</Label>
              <Select
                value={selectedCostType}
                onValueChange={setSelectedCostType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Chi phí công ty</SelectItem>
                  <SelectItem value="project">Chi phí dự án</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCostType === "company" && (
              <>
                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Văn phòng</SelectItem>
                      <SelectItem value="hr">Nhân sự</SelectItem>
                      <SelectItem value="equipment">
                        Thiết bị & Tools
                      </SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {selectedCostType === "project" && (
              <>
                <div className="space-y-2">
                  <Label>Dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectCosts.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id.toString()}
                        >
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Danh mục chi phí</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personnel">Nhân sự</SelectItem>
                      <SelectItem value="infrastructure">
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="tools">Tools & Licenses</SelectItem>
                      <SelectItem value="services">Services & APIs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Tên chi phí</Label>
              <Input placeholder="VD: Tiền thuê văn phòng tháng 10" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số tiền (VNĐ)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2 w-full">
                <Label>Ngày phát sinh</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select defaultValue="pending">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Chờ thanh toán</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Nhập ghi chú (nếu có)..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Thêm chi phí
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
