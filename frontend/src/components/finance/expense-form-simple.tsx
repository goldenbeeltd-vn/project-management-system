/**
 * Expense Form Component - Simplified Version
 * Form để tạo và chỉnh sửa chi phí
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Expense, ExpenseType, ExpenseStatus } from "@/types/finance";
import {
  EXPENSE_TYPES,
  EXPENSE_STATUS_OPTIONS,
  VAT_RATES,
} from "@/constants/finance";
import { formatCurrency } from "@/lib/formatter";

interface ExpenseFormProps {
  initialData?: Partial<Expense>;
  onSubmit: (data: Partial<Expense>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  projects?: Array<{ id: string; name: string }>;
  employees?: Array<{ id: string; firstName: string; lastName: string }>;
  categories?: Array<{ id: string; name: string; type: string }>;
}

export function ExpenseForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  projects = [],
  employees = [],
  categories = [],
}: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    categoryId: initialData?.categoryId || "",
    projectId: initialData?.projectId || "",
    employeeId: initialData?.employeeId || "",
    date:
      initialData?.date?.toISOString().split("T")[0] ||
      new Date().toISOString().split("T")[0],
    type: initialData?.type || ("operational" as ExpenseType),
    status: initialData?.status || ("draft" as ExpenseStatus),
    vendor: initialData?.vendor || "",
    taxRate: initialData?.taxRate || 10,
    notes: initialData?.notes || "",
  });

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const taxAmount =
    formData.amount && formData.taxRate
      ? (formData.amount * formData.taxRate) / 100
      : 0;
  const totalAmount = formData.amount + taxAmount;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date(formData.date),
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề chi phí *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nhập tiêu đề chi phí"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Mô tả chi tiết về chi phí"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Số tiền (VND) *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    handleInputChange("amount", Number(e.target.value))
                  }
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="taxRate">Thuế VAT (%)</Label>
                <Select
                  value={formData.taxRate.toString()}
                  onValueChange={(value: string) =>
                    handleInputChange("taxRate", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thuế VAT" />
                  </SelectTrigger>
                  <SelectContent>
                    {VAT_RATES.map((rate) => (
                      <SelectItem
                        key={rate.value}
                        value={rate.value.toString()}
                      >
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.amount > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Số tiền gốc:</span>
                  <span>{formatCurrency(formData.amount, "VND")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thuế VAT ({formData.taxRate}%):</span>
                  <span>{formatCurrency(taxAmount, "VND")}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2 mt-2">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(totalAmount, "VND")}</span>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="vendor">Nhà cung cấp</Label>
              <Input
                id="vendor"
                value={formData.vendor}
                onChange={(e) => handleInputChange("vendor", e.target.value)}
                placeholder="Tên nhà cung cấp/công ty"
              />
            </div>

            <div>
              <Label htmlFor="date">Ngày chi phí</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories and Classification */}
        <Card>
          <CardHeader>
            <CardTitle>Phân loại</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="categoryId">Danh mục *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value: string) =>
                  handleInputChange("categoryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Loại chi phí</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ExpenseType) =>
                  handleInputChange("type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại chi phí" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: type.color }}
                        />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value: ExpenseStatus) =>
                  handleInputChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="projectId">Dự án (tùy chọn)</Label>
              <Select
                value={formData.projectId}
                onValueChange={(value: string) =>
                  handleInputChange("projectId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Không liên kết</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="employeeId">Nhân viên (tùy chọn)</Label>
              <Select
                value={formData.employeeId}
                onValueChange={(value: string) =>
                  handleInputChange("employeeId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Không liên kết</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Ghi chú</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Ghi chú thêm về chi phí này"
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : initialData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </div>
    </form>
  );
}
