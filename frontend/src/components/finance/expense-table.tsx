/**
 * Expense Table Component
 * Bảng hiển thị danh sách chi phí
 */

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FileText,
  Search,
  Filter,
} from "lucide-react";
import { Expense } from "@/types/finance";
import { EXPENSE_TYPES, EXPENSE_STATUS_OPTIONS } from "@/constants/finance";
import { formatCurrency } from "@/lib/formatter";

interface ExpenseTableProps {
  expenses: Expense[];
  isLoading?: boolean;
  onView?: (expense: Expense) => void;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expenseId: string) => void;
  onApprove?: (expenseId: string) => void;
  onReject?: (expenseId: string) => void;
}

export function ExpenseTable({
  expenses,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: ExpenseTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || expense.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusOption = EXPENSE_STATUS_OPTIONS.find(
      (opt) => opt.value === status
    );
    if (!statusOption) return null;

    const variant =
      status === "approved" || status === "paid"
        ? "default"
        : status === "pending"
          ? "secondary"
          : status === "rejected"
            ? "destructive"
            : "outline";

    return (
      <Badge
        variant={variant}
        className="text-xs"
        style={{ backgroundColor: statusOption.color, color: "white" }}
      >
        {statusOption.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeOption = EXPENSE_TYPES.find((opt) => opt.value === type);
    if (!typeOption) return null;

    return (
      <Badge
        variant="outline"
        className="text-xs"
        style={{ borderColor: typeOption.color, color: typeOption.color }}
      >
        {typeOption.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="border rounded-lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center p-4 border-b last:border-b-0"
            >
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 ml-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 ml-4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm chi phí..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Trạng thái
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              Tất cả
            </DropdownMenuItem>
            {EXPENSE_STATUS_OPTIONS.map((status) => (
              <DropdownMenuItem
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  {status.label}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Nhà cung cấp</TableHead>
              <TableHead>Dự án</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  Không tìm thấy chi phí nào
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{expense.title}</div>
                      {expense.description && (
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">
                          {expense.description}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="font-medium">
                      {formatCurrency(expense.amount, expense.currency)}
                    </div>
                    {expense.taxAmount && expense.taxAmount > 0 && (
                      <div className="text-sm text-gray-500">
                        +{formatCurrency(expense.taxAmount, expense.currency)}{" "}
                        VAT
                      </div>
                    )}
                  </TableCell>

                  <TableCell>{getTypeBadge(expense.type)}</TableCell>

                  <TableCell>{getStatusBadge(expense.status)}</TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {expense.date.toLocaleDateString("vi-VN")}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">{expense.vendor || "-"}</div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {expense.project?.name || "-"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(expense)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                        )}

                        {onEdit && expense.status !== "paid" && (
                          <DropdownMenuItem onClick={() => onEdit(expense)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                        )}

                        {expense.receipts && expense.receipts.length > 0 && (
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Xem chứng từ
                          </DropdownMenuItem>
                        )}

                        {onApprove && expense.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => onApprove(expense.id)}
                            className="text-green-600"
                          >
                            Duyệt
                          </DropdownMenuItem>
                        )}

                        {onReject && expense.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => onReject(expense.id)}
                            className="text-red-600"
                          >
                            Từ chối
                          </DropdownMenuItem>
                        )}

                        {onDelete && expense.status === "draft" && (
                          <DropdownMenuItem
                            onClick={() => onDelete(expense.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      {filteredExpenses.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Tổng số chi phí: </span>
              <span>{filteredExpenses.length}</span>
            </div>
            <div>
              <span className="font-medium">Tổng số tiền: </span>
              <span className="font-semibold">
                {formatCurrency(
                  filteredExpenses.reduce(
                    (sum, expense) => sum + expense.amount,
                    0
                  ),
                  "VND"
                )}
              </span>
            </div>
            <div>
              <span className="font-medium">Chờ duyệt: </span>
              <span>
                {filteredExpenses.filter((e) => e.status === "pending").length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
