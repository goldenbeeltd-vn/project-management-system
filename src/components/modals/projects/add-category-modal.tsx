"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddCategoryForm } from "@/types/projects/cost";
import { cn } from "@/lib/utils";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (category: AddCategoryForm) => void;
}

const PRESET_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
  "bg-gray-500",
];

export function AddCategoryModal({
  open,
  onClose,
  onAdd,
}: AddCategoryModalProps) {
  const [form, setForm] = useState<AddCategoryForm>({
    name: "",
    color: "bg-blue-500",
    taxRate: undefined,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim()) {
      onAdd(form);
      setForm({
        name: "",
        color: "bg-blue-500",
        taxRate: undefined,
        description: "",
      });
      onClose();
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      color: "bg-blue-500",
      taxRate: undefined,
      description: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
          <DialogDescription>
            Tạo danh mục mới để phân loại chi phí dự án.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Tên danh mục */}
            <div className="space-y-2">
              <Label htmlFor="categoryName">
                Tên danh mục <span className="text-red-500">*</span>
              </Label>
              <Input
                id="categoryName"
                placeholder="Nhập tên danh mục..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            {/* Thuế suất */}
            <div className="space-y-2">
              <Label htmlFor="categoryTaxRate">
                Thuế suất (%)
                <span className="text-xs text-gray-500 ml-2">Tùy chọn</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="categoryTaxRate"
                  type="number"
                  placeholder="0"
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
                  onClick={() => setForm({ ...form, taxRate: 10 })}
                  className="whitespace-nowrap"
                >
                  VAT 10%
                </Button>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Để trống nếu danh mục không có thuế</p>
                <p>• Ví dụ: Hosting, Tên miền (10%), Thu nhập DN (20-30%)</p>
              </div>
            </div>

            {/* Mô tả */}
            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Mô tả về thuế</Label>
              <Input
                id="categoryDescription"
                placeholder="VD: Thuế VAT cho dịch vụ hosting..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Chọn màu */}
            <div className="space-y-2">
              <Label>Màu danh mục</Label>
              <div className="grid grid-cols-9 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      color,
                      form.color === color
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-400",
                    )}
                    onClick={() => setForm({ ...form, color })}
                    title={color.replace("bg-", "").replace("-500", "")}
                  />
                ))}
              </div>

              {/* Preview */}
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-4 h-4 rounded-full", form.color)} />
                    <span className="text-sm font-medium text-gray-900">
                      {form.name || "Tên danh mục"}
                    </span>
                  </div>
                  {form.taxRate !== undefined && form.taxRate > 0 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Thuế {form.taxRate}%
                    </span>
                  )}
                </div>
                {form.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {form.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={!form.name.trim()}>
              Thêm danh mục
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
