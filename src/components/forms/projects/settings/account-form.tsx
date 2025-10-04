"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/ui/multi-select";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  ACCOUNT_CATEGORIES,
  ACCOUNT_TYPE_CONFIGS,
  getAccountTypeConfig,
  getAccountTypesByCategory,
} from "@/constants/projects/account-categories";
import {
  Account,
  AccountFormData,
  AccountFormErrors,
  AccountType,
} from "@/types/projects/accounts";

interface AccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AccountFormData) => void;
  account?: Account | null;
  mode: "add" | "edit";
}

const initialFormData: AccountFormData = {
  type: "hosting",
  category: "infrastructure",
  name: "",
  description: "",
  username: "",
  email: "",
  password: "",
  apiKey: "",
  accessToken: "",
  secretKey: "",
  url: "",
  port: undefined,
  database: "",
  isActive: true,
  expirationDate: undefined,
  notes: "",
  tags: [],
};

export function AccountForm({
  isOpen,
  onClose,
  onSave,
  account,
  mode,
}: AccountFormProps) {
  const [formData, setFormData] = useState<AccountFormData>(initialFormData);
  const [errors, setErrors] = useState<AccountFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const isEditMode = mode === "edit";

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && account) {
        setFormData({
          type: account.type,
          category: account.category,
          name: account.name,
          description: account.description || "",
          username: account.username || "",
          email: account.email || "",
          password: account.password || "",
          apiKey: account.apiKey || "",
          accessToken: account.accessToken || "",
          secretKey: account.secretKey || "",
          url: account.url || "",
          port: account.port,
          database: account.database || "",
          isActive: account.isActive,
          expirationDate: account.expirationDate,
          notes: account.notes || "",
          tags: account.tags || [],
        });
      } else {
        setFormData(initialFormData);
      }
      setErrors({});
    }
  }, [isOpen, account, isEditMode]);

  const availableTypes = useMemo(() => {
    return getAccountTypesByCategory(formData.category);
  }, [formData.category]);

  const typeConfig = useMemo(() => {
    return getAccountTypeConfig(formData.type);
  }, [formData.type]);

  useEffect(() => {
    if (availableTypes.length > 0 && !availableTypes.includes(formData.type)) {
      setFormData((prev) => ({ ...prev, type: availableTypes[0] }));
    }
  }, [formData.category, availableTypes, formData.type]);

  const handleInputChange = (
    field: keyof AccountFormData,
    value: string | number | boolean | Date | string[] | undefined,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof AccountFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: AccountFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên tài khoản là bắt buộc";
    }

    if (typeConfig) {
      typeConfig.requiredFields.forEach((field) => {
        const value = formData[field as keyof AccountFormData] as string;
        if (!value || !value.toString().trim()) {
          newErrors[field as keyof AccountFormErrors] =
            `${typeConfig.fieldLabels[field]} là bắt buộc`;
        }
      });
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ";
    }

    if (formData.url && formData.url.trim()) {
      try {
        new URL(formData.url);
      } catch {
        if (
          !formData.url.includes(".") &&
          !formData.url.match(/^\d+\.\d+\.\d+\.\d+$/)
        ) {
          newErrors.url = "Định dạng URL không hợp lệ";
        }
      }
    }

    if (formData.port && (formData.port < 1 || formData.port > 65535)) {
      newErrors.port = "Port phải trong khoảng 1-65535";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldName: string) => {
    const isRequired = typeConfig?.requiredFields.includes(fieldName);
    const label = typeConfig?.fieldLabels[fieldName] || fieldName;
    const placeholder = typeConfig?.placeholders[fieldName] || "";
    const hasError = errors[fieldName as keyof AccountFormErrors];

    switch (fieldName) {
      case "email":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={fieldName}
              type="email"
              placeholder={placeholder}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={cn(
                "h-9 w-full",
                hasError &&
                  "border-red-300 focus:border-red-500 focus:ring-red-500",
              )}
            />
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      case "username":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={fieldName}
              placeholder={placeholder}
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className={cn(
                "h-9 w-full",
                hasError &&
                  "border-red-300 focus:border-red-500 focus:ring-red-500",
              )}
            />
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      case "password":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <Input
                id={fieldName}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "h-9 w-full pr-10",
                  hasError &&
                    "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      case "apiKey":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <Input
                id={fieldName}
                type={showApiKey ? "text" : "password"}
                placeholder={placeholder}
                value={formData.apiKey}
                onChange={(e) => handleInputChange("apiKey", e.target.value)}
                className={cn(
                  "h-9 w-full pr-10",
                  hasError &&
                    "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      case "secretKey":
      case "accessToken":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <Input
                id={fieldName}
                type={showSecretKey ? "text" : "password"}
                placeholder={placeholder}
                value={formData[fieldName as keyof AccountFormData] as string}
                onChange={(e) =>
                  handleInputChange(
                    fieldName as keyof AccountFormData,
                    e.target.value,
                  )
                }
                className="h-9 w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowSecretKey(!showSecretKey)}
              >
                {showSecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        );

      case "url":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={fieldName}
              type="url"
              placeholder={placeholder}
              value={formData.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
              className={cn(
                "h-9 w-full",
                hasError &&
                  "border-red-300 focus:border-red-500 focus:ring-red-500",
              )}
            />
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      case "port":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={fieldName}
              type="number"
              placeholder={placeholder}
              value={formData.port || ""}
              onChange={(e) =>
                handleInputChange(
                  "port",
                  e.target.value ? parseInt(e.target.value) : undefined,
                )
              }
              className={cn(
                "h-9 w-full",
                hasError &&
                  "border-red-300 focus:border-red-500 focus:ring-red-500",
              )}
            />
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      case "database":
        return (
          <div className="space-y-1.5">
            <Label
              htmlFor={fieldName}
              className="text-sm font-medium text-gray-700"
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={fieldName}
              placeholder={placeholder}
              value={formData.database}
              onChange={(e) => handleInputChange("database", e.target.value)}
              className={cn(
                "h-9 w-full",
                hasError &&
                  "border-red-300 focus:border-red-500 focus:ring-red-500",
              )}
            />
            {hasError && <p className="text-xs text-red-600">{hasError}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        size="2xl"
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold">
            {isEditMode ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {isEditMode
              ? "Cập nhật thông tin tài khoản dịch vụ."
              : "Thêm tài khoản dịch vụ mới cho dự án."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
              Thông tin cơ bản
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Danh mục <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Loại tài khoản <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    handleInputChange("type", value as AccountType)
                  }
                >
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTypes.map((type) => {
                      const config = ACCOUNT_TYPE_CONFIGS[type];
                      return (
                        <SelectItem key={type} value={type}>
                          {config.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Tên tài khoản <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nhập tên tài khoản..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(
                  "h-9 w-full",
                  errors.name &&
                    "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Mô tả
              </Label>
              <Textarea
                id="description"
                placeholder="Mô tả ngắn gọn về tài khoản..."
                rows={2}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="resize-none w-full"
              />
            </div>
          </div>

          {/* Thông tin xác thực */}
          {typeConfig && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                Thông tin xác thực
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[...typeConfig.requiredFields, ...typeConfig.optionalFields]
                  .filter((field) => field !== "name")
                  .map((field) => (
                    <div
                      key={field}
                      className={
                        field === "url" || field === "notes" ? "col-span-2" : ""
                      }
                    >
                      {renderField(field)}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Cài đặt bổ sung */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
              Cài đặt bổ sung
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Ngày hết hạn
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-9 w-full justify-start text-left font-normal",
                        !formData.expirationDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.expirationDate
                        ? format(formData.expirationDate, "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chọn ngày hết hạn"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.expirationDate}
                      onSelect={(date) =>
                        handleInputChange("expirationDate", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
                <Label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Tài khoản đang hoạt động
                </Label>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Tags</Label>
              <MultiSelect
                options={[
                  { label: "Production", value: "production" },
                  { label: "Staging", value: "staging" },
                  { label: "Development", value: "development" },
                  { label: "API", value: "api" },
                  { label: "Database", value: "database" },
                  { label: "Third-party", value: "third-party" },
                ]}
                selected={formData.tags || []}
                onChange={(values) => handleInputChange("tags", values)}
                placeholder="Chọn tags..."
                className="w-full"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-gray-700"
              >
                Ghi chú
              </Label>
              <Textarea
                id="notes"
                placeholder="Ghi chú thêm về tài khoản..."
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="resize-none w-full"
              />
            </div>
          </div>

          <DialogFooter className="pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-9"
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting} className="h-9">
              {isSubmitting
                ? isEditMode
                  ? "Đang cập nhật..."
                  : "Đang thêm..."
                : isEditMode
                  ? "Cập nhật"
                  : "Thêm tài khoản"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
