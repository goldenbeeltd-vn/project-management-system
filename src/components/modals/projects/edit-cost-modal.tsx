"use client";

import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditCostForm, Category } from "@/types/projects/cost";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditCostModalProps {
  open: boolean;
  editForm: EditCostForm;
  setEditForm: React.Dispatch<React.SetStateAction<EditCostForm>>;
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
  onAddCategory: () => void;
}

export function EditCostModal({
  open,
  editForm,
  setEditForm,
  categories,
  onSave,
  onCancel,
  onAddCategory,
}: EditCostModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa chi phí</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin chi phí. Các trường có dấu (*) là bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Tên chi phí */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên chi phí <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nhập tên chi phí..."
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                required
              />
            </div>

            {/* Ngân sách và Đã sử dụng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budgetLimit">
                  Ngân sách tối đa <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="budgetLimit"
                  type="number"
                  placeholder="0"
                  value={editForm.budgetLimit}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      budgetLimit: Number(e.target.value),
                    })
                  }
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spentAmount">Đã sử dụng</Label>
                <Input
                  id="spentAmount"
                  type="number"
                  placeholder="0"
                  value={editForm.spentAmount}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      spentAmount: Number(e.target.value),
                    })
                  }
                  min="0"
                />
              </div>
            </div>

            {/* Danh mục */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category">
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
                value={editForm.category}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, category: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: Category) => (
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
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
