"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  ACCOUNT_CATEGORIES,
  getAccountTypeConfig,
} from "@/constants/projects/account-categories";
import {
  Account,
  AccountFilter,
  AccountType,
  AccountFormData,
} from "@/types/projects/accounts";
import { AccountForm } from "@/components/forms/projects/settings/account-form";

// Mock data for demonstration
const mockAccounts: Account[] = [
  {
    id: "1",
    projectId: "proj-1",
    type: "hosting",
    category: "infrastructure",
    name: "Digital Ocean VPS Production",
    description: "Server chính cho production",
    username: "root",
    email: "admin@company.com",
    password: "encrypted_password_1",
    url: "https://cloud.digitalocean.com",
    isActive: true,
    lastUsed: new Date("2024-12-20"),
    expirationDate: new Date("2025-06-15"),
    tags: ["production", "vps"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-20"),
    createdBy: "user-1",
  },
  {
    id: "2",
    projectId: "proj-1",
    type: "github",
    category: "version-control",
    name: "GitHub Main Repository",
    description: "Repository chính của dự án",
    username: "company-dev",
    email: "dev@company.com",
    accessToken: "ghp_xxxxxxxxxxxxxxxxxx",
    url: "https://github.com/company/project",
    isActive: true,
    lastUsed: new Date("2024-12-25"),
    tags: ["git", "main-repo"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-12-25"),
    createdBy: "user-1",
  },
  {
    id: "3",
    projectId: "proj-1",
    type: "google-api",
    category: "api-services",
    name: "Google Maps API",
    description: "API cho tính năng bản đồ",
    apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx",
    isActive: true,
    lastUsed: new Date("2024-12-24"),
    tags: ["api", "maps"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-12-24"),
    createdBy: "user-2",
  },
];

export function AccountManagementTab() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [filter, setFilter] = useState<AccountFilter>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  // Filter and search accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (
          !account.name.toLowerCase().includes(searchLower) &&
          !account.description?.toLowerCase().includes(searchLower) &&
          !account.username?.toLowerCase().includes(searchLower) &&
          !account.email?.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Category filter
      if (filter.category && account.category !== filter.category) {
        return false;
      }

      // Type filter
      if (filter.type && account.type !== filter.type) {
        return false;
      }

      // Status filter
      if (
        filter.isActive !== undefined &&
        account.isActive !== filter.isActive
      ) {
        return false;
      }

      return true;
    });
  }, [accounts, filter, searchTerm]);

  const togglePasswordVisibility = (accountId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show toast notification (you can implement toast here)
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleAddAccount = () => {
    setSelectedAccount(null);
    setShowAddDialog(true);
  };

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setShowEditDialog(true);
  };

  const handleDeleteAccount = (account: Account) => {
    setSelectedAccount(account);
    setShowDeleteDialog(true);
  };

  const handleSaveAccount = async (formData: AccountFormData) => {
    if (selectedAccount) {
      // Edit existing account
      const updatedAccount: Account = {
        ...selectedAccount,
        ...formData,
        updatedAt: new Date(),
        updatedBy: "current-user", // Replace with actual user ID
      };

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === selectedAccount.id ? updatedAccount : acc,
        ),
      );
    } else {
      // Add new account
      const newAccount: Account = {
        id: `account-${Date.now()}`, // Generate proper ID in real app
        projectId: "current-project", // Replace with actual project ID
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "current-user", // Replace with actual user ID
      };

      setAccounts((prev) => [...prev, newAccount]);
    }

    // Close dialogs
    setShowAddDialog(false);
    setShowEditDialog(false);
    setSelectedAccount(null);
  };

  const confirmDeleteAccount = () => {
    if (selectedAccount) {
      setAccounts((prev) =>
        prev.filter((acc) => acc.id !== selectedAccount.id),
      );
      setShowDeleteDialog(false);
      setSelectedAccount(null);
    }
  };

  const getTypeConfig = (type: AccountType) => {
    return getAccountTypeConfig(type);
  };

  const getCategoryName = (categoryId: string) => {
    const category = ACCOUNT_CATEGORIES.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: vi });
  };

  const isExpiringSoon = (date: Date | undefined) => {
    if (!date) return false;
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return date < thirtyDaysFromNow;
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm tài khoản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase">
                  Danh mục
                </Label>
                <Select
                  value={filter.category || "all"}
                  onValueChange={(value) =>
                    setFilter((prev) => ({
                      ...prev,
                      category: value === "all" ? undefined : value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Tất cả danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {ACCOUNT_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase">
                  Trạng thái
                </Label>
                <Select
                  value={
                    filter.isActive === undefined
                      ? "all"
                      : filter.isActive
                        ? "active"
                        : "inactive"
                  }
                  onValueChange={(value) =>
                    setFilter((prev) => ({
                      ...prev,
                      isActive:
                        value === "active"
                          ? true
                          : value === "inactive"
                            ? false
                            : undefined,
                    }))
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Tất cả trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={handleAddAccount} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Thêm tài khoản
        </Button>
      </div>

      {/* Accounts table */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Tên tài khoản</TableHead>
              <TableHead className="w-[120px]">Danh mục</TableHead>
              <TableHead className="w-[100px]">Loại</TableHead>
              <TableHead className="w-[150px]">Thông tin đăng nhập</TableHead>
              <TableHead className="w-[100px]">Trạng thái</TableHead>
              <TableHead className="w-[100px]">Hết hạn</TableHead>
              <TableHead className="w-[80px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => {
              const typeConfig = getTypeConfig(account.type);
              const isPasswordVisible = showPasswords[account.id];

              return (
                <TableRow key={account.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {account.name}
                      </p>
                      {account.url && (
                        <div className="flex items-center gap-1 mt-1">
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                          <a
                            href={account.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            {account.url}
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryName(account.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {typeConfig.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {account.username && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12">
                            User:
                          </span>
                          <span className="text-xs font-mono">
                            {account.username}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(account.username!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {account.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12">
                            Email:
                          </span>
                          <span className="text-xs font-mono">
                            {account.email}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(account.email!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {account.password && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12">
                            Pass:
                          </span>
                          <span className="text-xs font-mono">
                            {isPasswordVisible ? account.password : "••••••••"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => togglePasswordVisibility(account.id)}
                          >
                            {isPasswordVisible ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(account.password!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {account.apiKey && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12">
                            API:
                          </span>
                          <span className="text-xs font-mono">
                            {account.apiKey.substring(0, 12)}...
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => copyToClipboard(account.apiKey!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={account.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {account.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {account.expirationDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span
                          className={cn(
                            "text-xs",
                            isExpiringSoon(account.expirationDate)
                              ? "text-orange-600 font-medium"
                              : "text-gray-600",
                          )}
                        >
                          {formatDate(account.expirationDate)}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteAccount(account)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredAccounts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Không tìm thấy tài khoản nào</p>
          </div>
        )}
      </div>

      {/* Add Account Dialog */}
      <AccountForm
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSave={handleSaveAccount}
        mode="add"
      />

      {/* Edit Account Dialog */}
      <AccountForm
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={handleSaveAccount}
        account={selectedAccount}
        mode="edit"
      />

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa tài khoản &quot;{selectedAccount?.name}
              &quot;? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAccount}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
