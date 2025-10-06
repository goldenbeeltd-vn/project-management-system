"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Category } from "@/types/projects/cost";
import { cn } from "@/lib/utils";
import {
  getDefaultTaxRate,
  isTaxableCategory,
} from "@/utils/projects/tax-calculator";

interface AddCostForm {
  name: string;
  category: string;
  budgetLimit: number;
  spentAmount: number;
  description: string;
  assignee: string;
  dueDate: Date | undefined;
  priority: "low" | "medium" | "high" | "urgent";
  taxRate?: number;
}

interface AddCostModalProps {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onAdd: (cost: AddCostForm) => void;
  onAddCategory: () => void;
}

const PRIORITY_OPTIONS = [
  { value: "low", label: "Thấp", color: "bg-gray-500" },
  { value: "medium", label: "Trung bình", color: "bg-blue-500" },
  { value: "high", label: "Cao", color: "bg-orange-500" },
  { value: "urgent", label: "Khẩn cấp", color: "bg-red-500" },
];

const ASSIGNEE_OPTIONS = [
  "Nguyễn Văn A",
  "Trần Thị B",
  "Lê Văn C",
  "Phạm Thị D",
  "Hoàng Văn E",
  "Vũ Thị F",
  "Đặng Văn G",
  "Bùi Thị H",
];

export function AddCostModal({
  open,
  categories,
  onClose,
  onAdd,
  onAddCategory,
}: AddCostModalProps) {
  const [form, setForm] = useState<AddCostForm>({
    name: "",
    category: "",
    budgetLimit: 0,
    spentAmount: 0,
    description: "",
    assignee: "",
    dueDate: undefined,
    priority: "medium",
    taxRate: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Tên chi phí là bắt buộc";
    }

    if (!form.category) {
      newErrors.category = "Danh mục là bắt buộc";
    }

    if (form.budgetLimit <= 0) {
      newErrors.budgetLimit = "Ngân sách phải lớn hơn 0";
    }

    if (form.spentAmount < 0) {
      newErrors.spentAmount = "Số tiền đã chi không được âm";
    }

    if (form.spentAmount > form.budgetLimit) {
      newErrors.spentAmount = "Số tiền đã chi không được vượt ngân sách";
    }

    if (!form.assignee) {
      newErrors.assignee = "Người phụ trách là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAdd(form);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      category: "",
      budgetLimit: 0,
      spentAmount: 0,
      description: "",
      assignee: "",
      dueDate: undefined,
      priority: "medium",
      taxRate: undefined,
    });
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm chi phí mới</DialogTitle>
          <DialogDescription>
            Tạo chi phí mới cho dự án. Các trường có dấu (*) là bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tên chi phí */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="name">
                Tên chi phí <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nhập tên chi phí..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Danh mục */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>
                  Danh mục <span className="text-red-500">*</span>
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onAddCategory}
                  className="h-auto p-1 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Thêm danh mục
                </Button>
              </div>
              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Chọn danh mục..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn("w-3 h-3 rounded-full", cat.color)}
                        />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Độ ưu tiên */}
            <div className="space-y-2">
              <Label>Độ ưu tiên</Label>
              <Select
                value={form.priority}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    priority: value as "low" | "medium" | "high" | "urgent",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn("w-3 h-3 rounded-full", priority.color)}
                        />
                        {priority.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ngân sách */}
            <div className="space-y-2">
              <Label htmlFor="budgetLimit">
                Ngân sách tối đa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="budgetLimit"
                type="number"
                placeholder="0"
                value={form.budgetLimit || ""}
                onChange={(e) =>
                  setForm({ ...form, budgetLimit: Number(e.target.value) })
                }
                min="0"
                className={errors.budgetLimit ? "border-red-500" : ""}
              />
              {errors.budgetLimit && (
                <p className="text-sm text-red-500">{errors.budgetLimit}</p>
              )}
            </div>

            {/* Đã sử dụng */}
            <div className="space-y-2">
              <Label htmlFor="spentAmount">Đã sử dụng</Label>
              <Input
                id="spentAmount"
                type="number"
                placeholder="0"
                value={form.spentAmount || ""}
                onChange={(e) =>
                  setForm({ ...form, spentAmount: Number(e.target.value) })
                }
                min="0"
                className={errors.spentAmount ? "border-red-500" : ""}
              />
              {errors.spentAmount && (
                <p className="text-sm text-red-500">{errors.spentAmount}</p>
              )}
            </div>

            {/* Thuế suất */}
            {form.category && isTaxableCategory(form.category, categories) && (
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="taxRate">
                  Thuế suất (%)
                  <span className="text-sm text-gray-500 ml-2">
                    Mặc định: {getDefaultTaxRate(form.category, categories)}%
                  </span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="taxRate"
                    type="number"
                    placeholder={getDefaultTaxRate(
                      form.category,
                      categories,
                    ).toString()}
                    value={form.taxRate !== undefined ? form.taxRate : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm({
                        ...form,
                        taxRate: value === "" ? undefined : Number(value),
                      });
                    }}
                    min="0"
                    max="100"
                    step="0.1"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setForm({
                        ...form,
                        taxRate: getDefaultTaxRate(form.category, categories),
                      })
                    }
                  >
                    Mặc định
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Để trống để sử dụng thuế suất mặc định cho danh mục này
                </p>
              </div>
            )}

            {/* Người phụ trách */}
            <div className="space-y-2">
              <Label>
                Người phụ trách <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.assignee}
                onValueChange={(value) => setForm({ ...form, assignee: value })}
              >
                <SelectTrigger
                  className={errors.assignee ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Chọn người phụ trách..." />
                </SelectTrigger>
                <SelectContent>
                  {ASSIGNEE_OPTIONS.map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignee && (
                <p className="text-sm text-red-500">{errors.assignee}</p>
              )}
            </div>

            {/* Ngày hết hạn */}
            <div className="space-y-2">
              <Label>Ngày hết hạn</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.dueDate
                      ? format(form.dueDate, "dd 'Th'M y", { locale: vi })
                      : "Chọn ngày hết hạn"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.dueDate}
                    onSelect={(date) => setForm({ ...form, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Mô tả */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết về chi phí này..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit">Thêm chi phí</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
