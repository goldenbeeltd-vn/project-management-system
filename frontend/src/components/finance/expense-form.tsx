/**
 * Expense Form Component
 * Form để tạo và chỉnh sửa chi phí
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Upload, FileText } from "lucide-react";
import { Expense, ExpenseType, ExpenseStatus } from "@/types/finance";
import {
  EXPENSE_TYPES,
  EXPENSE_STATUS_OPTIONS,
  RECURRING_FREQUENCIES,
  VAT_RATES,
} from "@/constants/finance";
import { formatCurrency } from "@/lib/formatter";

const expenseSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().optional(),
  amount: z.number().min(0.01, "Số tiền phải lớn hơn 0"),
  categoryId: z.string().min(1, "Danh mục là bắt buộc"),
  projectId: z.string().optional(),
  employeeId: z.string().optional(),
  date: z.date(),
  type: z.enum([
    "operational",
    "development",
    "deployment",
    "marketing",
    "salary",
    "equipment",
    "software",
    "training",
    "travel",
    "office",
    "legal",
    "insurance",
    "other",
  ]),
  status: z.enum(["draft", "pending", "approved", "rejected", "paid"]),
  vendor: z.string().optional(),
  taxRate: z.number().min(0).max(100).optional(),
  isRecurring: z.boolean().default(false),
  recurringPattern: z
    .object({
      frequency: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
      interval: z.number().min(1),
      endDate: z.date().optional(),
      maxOccurrences: z.number().optional(),
    })
    .optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  initialData?: Partial<Expense>;
  onSubmit: (data: ExpenseFormData) => void;
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
  const [receipts, setReceipts] = useState<string[]>(
    initialData?.receipts || []
  );
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      amount: initialData?.amount || 0,
      categoryId: initialData?.categoryId || "",
      projectId: initialData?.projectId || "",
      employeeId: initialData?.employeeId || "",
      date: initialData?.date || new Date(),
      type: initialData?.type || "operational",
      status: initialData?.status || "draft",
      vendor: initialData?.vendor || "",
      taxRate: initialData?.taxRate || 10,
      isRecurring: initialData?.isRecurring || false,
      tags: initialData?.tags || [],
      notes: initialData?.notes || "",
    },
  });

  const watchAmount = watch("amount");
  const watchTaxRate = watch("taxRate");
  const watchIsRecurring = watch("isRecurring");
  const watchTags = watch("tags");

  const taxAmount =
    watchAmount && watchTaxRate ? (watchAmount * watchTaxRate) / 100 : 0;
  const totalAmount = watchAmount + taxAmount;

  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const handleAddTag = () => {
    if (tagInput.trim() && !watchTags.includes(tagInput.trim())) {
      setValue("tags", [...watchTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      watchTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload files and get URLs
      const newReceipts = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setReceipts([...receipts, ...newReceipts]);
    }
  };

  const removeReceipt = (index: number) => {
    setReceipts(receipts.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register("title")}
                placeholder="Nhập tiêu đề chi phí"
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                {...register("description")}
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
                  {...register("amount", { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.amount && (
                  <p className="text-sm text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="taxRate">Thuế VAT (%)</Label>
                <Select
                  value={watchTaxRate?.toString()}
                  onValueChange={(value) => setValue("taxRate", Number(value))}
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

            {watchAmount > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Số tiền gốc:</span>
                  <span>{formatCurrency(watchAmount, "VND")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thuế VAT ({watchTaxRate}%):</span>
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
                {...register("vendor")}
                placeholder="Tên nhà cung cấp/công ty"
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
                value={watch("categoryId")}
                onValueChange={(value) => setValue("categoryId", value)}
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
              {errors.categoryId && (
                <p className="text-sm text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="type">Loại chi phí</Label>
              <Select
                value={watch("type")}
                onValueChange={(value: ExpenseType) => setValue("type", value)}
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
                value={watch("status")}
                onValueChange={(value: ExpenseStatus) =>
                  setValue("status", value)
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
                value={watch("projectId")}
                onValueChange={(value) => setValue("projectId", value)}
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
                value={watch("employeeId")}
                onValueChange={(value) => setValue("employeeId", value)}
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

            <div>
              <Label htmlFor="date">Ngày chi phí</Label>
              <DatePicker
                selected={watch("date")}
                onSelect={(date) => date && setValue("date", date)}
              />
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
              {watchTags.map((tag, index) => (
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

      {/* Recurring Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Chi phí định kỳ
            <Switch
              checked={watchIsRecurring}
              onCheckedChange={(checked) => setValue("isRecurring", checked)}
            />
          </CardTitle>
        </CardHeader>
        {watchIsRecurring && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tần suất</Label>
                <Select
                  value={watch("recurringPattern.frequency")}
                  onValueChange={(value) =>
                    setValue("recurringPattern.frequency", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    {RECURRING_FREQUENCIES.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Khoảng cách</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  {...register("recurringPattern.interval", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* File Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>Tài liệu đính kèm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="receipts">Hóa đơn/Chứng từ</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="receipts"
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("receipts")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Tải lên tệp
                </Button>
              </div>
            </div>

            {receipts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {receipts.map((receipt, index) => (
                  <div key={index} className="relative group">
                    <div className="flex items-center gap-2 p-2 border rounded-lg">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm truncate">Tệp {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReceipt(index)}
                        className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            {...register("notes")}
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
