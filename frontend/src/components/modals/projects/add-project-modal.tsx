"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, Loader2, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORIES } from "@/constants/projects/project-categories";
import { ProjectCategory } from "@/types/projects/common";
import { MultiSelect } from "@/components/ui/multi-select";

import { getClientOptions, getTeamMemberOptions } from "@/lib/mock-data";
import {
  useProjectForm,
  ProjectFormData,
} from "@/hooks/projects/use-project-form";
import { useProjectFormValidation } from "@/hooks/projects/use-project-form-validation";
import { useProjectModalSubmission } from "@/hooks/projects/use-project-modal-submission";
import { useCurrencyFormatter } from "@/hooks/projects/use-currency-formatter";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: ProjectFormData) => Promise<void> | void;
}

export function AddProjectModal({
  open,
  onClose,
  onSubmit,
}: AddProjectModalProps) {
  // Custom hooks
  const { formData, errors, handleInputChange, resetForm, setFormErrors } =
    useProjectForm();
  const { validateForm } = useProjectFormValidation();
  const { isSubmitting, handleSubmit, handleClose } = useProjectModalSubmission(
    {
      onSubmit,
      onClose,
      resetForm,
    },
  );
  const { handleBudgetChange } = useCurrencyFormatter();

  const clientOptions = getClientOptions();
  const teamMemberOptions = getTeamMemberOptions();

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setFormErrors(validationErrors);
      return;
    }

    await handleSubmit(formData);
  };

  const onBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleBudgetChange(e, (field: string, value: unknown) => {
      handleInputChange(field as keyof ProjectFormData, value);
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm dự án mới</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết để tạo dự án mới. Các trường có dấu (*) là
            bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Tên dự án */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên dự án <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nhập tên dự án..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Khách hàng và Thành viên */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Khách hàng */}
              <div className="space-y-2">
                <Label htmlFor="client">
                  Khách hàng <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) =>
                    handleInputChange("clientId", value)
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.clientId && "border-red-500",
                    )}
                  >
                    <SelectValue placeholder="Chọn khách hàng...">
                      {formData.clientId && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>
                            {
                              clientOptions.find(
                                (c) => c.value === formData.clientId,
                              )?.label
                            }
                          </span>
                          <span className="text-sm text-muted-foreground">
                            (
                            {
                              clientOptions.find(
                                (c) => c.value === formData.clientId,
                              )?.company
                            }
                            )
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {clientOptions.map((client) => (
                      <SelectItem key={client.value} value={client.value}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{client.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {client.company}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientId && (
                  <p className="text-sm text-red-500">{errors.clientId}</p>
                )}
              </div>

              {/* Thành viên dự án */}
              <div className="space-y-2">
                <Label htmlFor="team">
                  Thành viên dự án <span className="text-red-500">*</span>
                </Label>
                <MultiSelect
                  options={teamMemberOptions.map((member) => ({
                    value: member.value,
                    label: member.label,
                    role: member.role,
                  }))}
                  selected={formData.teamMemberIds}
                  onChange={(selected) =>
                    handleInputChange("teamMemberIds", selected)
                  }
                  placeholder="Chọn thành viên..."
                  error={!!errors.teamMemberIds}
                />
                {errors.teamMemberIds && (
                  <p className="text-sm text-red-500">{errors.teamMemberIds}</p>
                )}
              </div>
            </div>

            {/* Thông tin khác */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Danh mục */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Danh mục <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value as ProjectCategory)
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.category && "border-red-500",
                    )}
                  >
                    <SelectValue placeholder="Chọn danh mục..." />
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

              {/* Trạng thái */}
              <div className="space-y-2">
                <Label htmlFor="status">
                  Trạng thái <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger
                    className={cn("w-full", errors.status && "border-red-500")}
                  >
                    <SelectValue placeholder="Chọn trạng thái..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Lên kế hoạch</SelectItem>
                    <SelectItem value="in_progress">Đang tiến hành</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="on_hold">Tạm dừng</SelectItem>
                    <SelectItem value="maintenance">Bảo trì</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status}</p>
                )}
              </div>

              {/* Độ ưu tiên */}
              <div className="space-y-2">
                <Label htmlFor="priority">Độ ưu tiên</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleInputChange("priority", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn độ ưu tiên..." />
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

            {/* Thời gian và ngân sách */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ngày bắt đầu */}
              <div className="space-y-2">
                <Label className="text-sm">Ngày bắt đầu</Label>
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate
                        ? format(formData.startDate, "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleInputChange("startDate", date)}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>

              {/* Ngày kết thúc */}
              <div className="space-y-2">
                <Label className="text-sm">Ngày kết thúc</Label>
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate
                        ? format(formData.endDate, "dd/MM/yyyy", { locale: vi })
                        : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleInputChange("endDate", date)}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && (
                  <p className="text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>

              {/* Ngân sách */}
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="budget">
                  Ngân sách
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="budget"
                    placeholder="0"
                    value={formData.budget}
                    onChange={onBudgetChange}
                    className={cn("flex-1", errors.budget && "border-red-500")}
                  />
                </div>
                {errors.budget && (
                  <p className="text-sm text-red-500">{errors.budget}</p>
                )}
              </div>
            </div>

            {/* Mô tả dự án - đặt ở cuối */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Mô tả dự án <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết về dự án..."
                rows={3}
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("description", e.target.value)
                }
                className={cn(errors.description && "border-red-500")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Đang tạo..." : "Tạo dự án"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
