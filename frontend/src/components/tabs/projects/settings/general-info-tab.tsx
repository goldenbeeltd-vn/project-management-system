"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORIES } from "@/constants/projects/project-categories";
import { ProjectCategory } from "@/types/projects/common";
import { getClientOptions } from "@/lib/mock-data";

interface GeneralInfoTabProps {
  formData: {
    name: string;
    projectCode: string;
    category: string;
    projectType: string;
    status: string;
    priority: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    budget: string;
    currency: string;
    contractType: string;
    clientId: string;
    teamMemberIds: string[];
    description: string;
  };
  errors: Record<string, string>;
  handleInputChange: (field: string, value: unknown) => void;
}

export function GeneralInfoTab({
  formData,
  errors,
  handleInputChange,
}: GeneralInfoTabProps) {
  const clientOptions = getClientOptions();

  return (
    <div className="space-y-6">
      {/* Section Header */}

      <Separator />

      {/* Form */}
      <form className="space-y-6">
        {/* Hàng 1: Tên dự án, Mã dự án*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-2">
            <Label htmlFor="name">
              Tên dự án <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="VD: Website thương mại điện tử ABC"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(
                "w-full",
                errors.name && "border-red-500 focus:ring-red-500",
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Độ ưu tiên</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleInputChange("priority", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Thấp</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="urgent">Khẩn cấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hàng 2: Danh mục, Loại dự án, Trạng thái */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                handleInputChange("category", value as ProjectCategory)
              }
            >
              <SelectTrigger
                className={cn("w-full", errors.category && "border-red-500")}
              >
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Loại dự án <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => handleInputChange("projectType", value)}
            >
              <SelectTrigger
                className={cn("w-full", errors.projectType && "border-red-500")}
              >
                <SelectValue placeholder="Chọn loại dự án" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web_application">Ứng dụng Web</SelectItem>
                <SelectItem value="mobile_app">Ứng dụng Mobile</SelectItem>
                <SelectItem value="desktop_app">Ứng dụng Desktop</SelectItem>
                <SelectItem value="api_service">API/Service</SelectItem>
                <SelectItem value="ecommerce">Thương mại điện tử</SelectItem>
                <SelectItem value="cms">Hệ thống quản lý nội dung</SelectItem>
                <SelectItem value="crm">Hệ thống CRM</SelectItem>
                <SelectItem value="erp">Hệ thống ERP</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
            {errors.projectType && (
              <p className="text-sm text-red-500">{errors.projectType}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Trạng thái <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger
                className={cn("w-full", errors.status && "border-red-500")}
              >
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Lập kế hoạch</SelectItem>
                <SelectItem value="in_progress">Đang thực hiện</SelectItem>
                <SelectItem value="on_hold">Tạm dừng</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status}</p>
            )}
          </div>
        </div>

        {/* Hàng 3: Ngày bắt đầu, Ngày kết thúc, Khách hàng */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Ngày bắt đầu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground",
                    errors.startDate && "border-red-500",
                  )}
                >
                  {formData.startDate
                    ? format(formData.startDate, "dd/MM/yyyy", {
                        locale: vi,
                      })
                    : "Chọn ngày bắt đầu"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => handleInputChange("startDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-sm text-red-500">{errors.startDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Ngày kết thúc</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.endDate && "text-muted-foreground",
                    errors.endDate && "border-red-500",
                  )}
                >
                  {formData.endDate
                    ? format(formData.endDate, "dd/MM/yyyy", {
                        locale: vi,
                      })
                    : "Chọn ngày kết thúc"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => handleInputChange("endDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.endDate && (
              <p className="text-sm text-red-500">{errors.endDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Khách hàng</Label>
            <Select
              value={formData.clientId}
              onValueChange={(value) => handleInputChange("clientId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn khách hàng" />
              </SelectTrigger>
              <SelectContent>
                {clientOptions.map((client) => (
                  <SelectItem key={client.value} value={client.value}>
                    {client.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hàng 4: Ngân sách dự kiến, Tiền tệ, Loại hợp đồng */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Ngân sách dự kiến</Label>
            <Input
              placeholder="VD: 100,000,000"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              className={cn("w-full", errors.budget && "border-red-500")}
            />
            {errors.budget && (
              <p className="text-sm text-red-500">{errors.budget}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tiền tệ</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => handleInputChange("currency", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VND">🇻🇳 VND</SelectItem>
                <SelectItem value="USD">🇺🇸 USD</SelectItem>
                <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Loại hợp đồng</Label>
            <Select
              value={formData.contractType}
              onValueChange={(value) =>
                handleInputChange("contractType", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn loại hợp đồng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed_price">Giá cố định</SelectItem>
                <SelectItem value="hourly">Theo giờ</SelectItem>
                <SelectItem value="milestone">Theo giai đoạn</SelectItem>
                <SelectItem value="retainer">Duy trì định kỳ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hàng 5: Mô tả dự án */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="description">
              Mô tả dự án <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về mục tiêu, phạm vi và yêu cầu của dự án..."
              rows={5}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={cn(
                "w-full resize-none",
                errors.description && "border-red-500",
              )}
            />
            <p className="text-xs text-gray-500">
              {formData.description.length}/500 ký tự
            </p>
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Hành động nguy hiểm */}
        <Separator />

        <div className="space-y-4">
          <div>
            <h5 className="text-base font-semibold text-gray-900">
              Vùng nguy hiểm
            </h5>
            <p className="text-sm text-gray-600 mt-1">
              Các hành động không thể hoàn tác
            </p>
          </div>

          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-start justify-between">
              <div>
                <h6 className="text-sm font-medium text-red-900">Xóa dự án</h6>
                <p className="text-xs text-red-700 mt-1">
                  Xóa vĩnh viễn dự án và tất cả dữ liệu liên quan. Hành động này
                  không thể hoàn tác.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (
                    window.confirm(
                      "Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác.",
                    )
                  ) {
                    // Handle delete project
                    console.log("Delete project");
                  }
                }}
                className="ml-4"
              >
                Xóa dự án
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
