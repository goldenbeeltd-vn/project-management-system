/**
 * Expenses Page
 * Trang quản lý chi phí chi tiết
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Calendar,

} from 'lucide-react';

import { ExpenseTable } from '@/components/finance/expense-table';
import { ExpenseForm } from '@/components/finance/expense-form-simple';
import { FinanceStatsCards } from '@/components/finance/finance-stats-cards';

import { 
  Expense, 
  FinanceDashboardStats,
  ExpenseFilter 
} from '@/types/finance';

// Mock data
const mockExpenses: Expense[] = [
  {
    id: '1',
    title: 'Office 365 License',
    description: 'Yearly subscription for team collaboration',
    amount: 15000000,
    currency: 'VND',
    categoryId: 'software',
    date: new Date('2024-12-01'),
    type: 'software',
    status: 'approved',
    vendor: 'Microsoft',
    taxAmount: 1500000,
    taxRate: 10,
    isRecurring: true,
    receipts: [],
    tags: ['software', 'annual'],
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    createdBy: 'user1',
  },
  {
    id: '2',
    title: 'AWS Cloud Services',
    description: 'Monthly hosting and infrastructure costs',
    amount: 8500000,
    currency: 'VND',
    categoryId: 'infrastructure',
    date: new Date('2024-11-30'),
    type: 'operational',
    status: 'paid',
    vendor: 'Amazon Web Services',
    taxAmount: 850000,
    taxRate: 10,
    isRecurring: true,
    receipts: [],
    tags: ['cloud', 'monthly'],
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-12-01'),
    createdBy: 'user1',
  },
  {
    id: '3',
    title: 'Team Building Event',
    description: 'Quarterly team building activities',
    amount: 25000000,
    currency: 'VND',
    categoryId: 'employee',
    date: new Date('2024-11-28'),
    type: 'other',
    status: 'pending',
    vendor: 'Event Company',
    taxAmount: 2500000,
    taxRate: 10,
    isRecurring: false,
    receipts: [],
    tags: ['team-building', 'quarterly'],
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    createdBy: 'user2',
  },
  {
    id: '4',
    title: 'Marketing Campaign',
    description: 'Q4 digital marketing campaign',
    amount: 50000000,
    currency: 'VND',
    categoryId: 'marketing',
    date: new Date('2024-11-25'),
    type: 'marketing',
    status: 'approved',
    vendor: 'Digital Agency',
    taxAmount: 5000000,
    taxRate: 10,
    isRecurring: false,
    receipts: [],
    tags: ['marketing', 'campaign'],
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-11-26'),
    createdBy: 'user3',
  },
  {
    id: '5',
    title: 'New Laptops',
    description: 'Development team laptop upgrades',
    amount: 80000000,
    currency: 'VND',
    categoryId: 'equipment',
    date: new Date('2024-11-20'),
    type: 'equipment',
    status: 'paid',
    vendor: 'Tech Store',
    taxAmount: 8000000,
    taxRate: 10,
    isRecurring: false,
    receipts: [],
    tags: ['equipment', 'laptops'],
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-22'),
    createdBy: 'user1',
  },
];

const mockStats: FinanceDashboardStats = {
  totalRevenue: 500000000,
  totalExpenses: 178500000, // Sum of mock expenses
  netProfit: 321500000,
  profitMargin: 64.3,
  totalBudget: 200000000,
  budgetUsed: 178500000,
  budgetRemaining: 21500000,
  payrollCosts: 0,
  outstandingInvoices: 25000000, // Pending expense
  currency: 'VND',
  period: {
    start: new Date(2024, 10, 1), // November 1, 2024
    end: new Date(2024, 11, 31), // December 31, 2024
  },
};

export default function ExpensesPage() {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [stats] = useState<FinanceDashboardStats>(mockStats);
  const [isLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [filters, setFilters] = useState<ExpenseFilter>({
    search: '',
  });

  const handleCreateExpense = (data: Partial<Expense>) => {
    console.log('Creating expense:', data);
    setIsDialogOpen(false);
  };

  const handleViewExpense = (expense: Expense) => {
    console.log('Viewing expense:', expense);
  };

  const handleEditExpense = (expense: Expense) => {
    console.log('Editing expense:', expense);
  };

  const handleDeleteExpense = (id: string) => {
    console.log('Deleting expense:', id);
  };

  const handleApproveExpense = (id: string) => {
    console.log('Approving expense:', id);
  };

  const handleRejectExpense = (id: string) => {
    console.log('Rejecting expense:', id);
  };

  const handleExport = () => {
    console.log('Exporting expenses...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Chi phí</h1>
          <p className="text-gray-600">
            Theo dõi và quản lý tất cả chi phí của công ty
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm chi phí
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tạo chi phí mới</DialogTitle>
              </DialogHeader>
              <ExpenseForm
                onSubmit={handleCreateExpense}
                onCancel={() => setIsDialogOpen(false)}
                categories={[
                  { id: 'software', name: 'Phần mềm', type: 'expense' },
                  { id: 'infrastructure', name: 'Hạ tầng', type: 'expense' },
                  { id: 'marketing', name: 'Marketing', type: 'expense' },
                  { id: 'equipment', name: 'Thiết bị', type: 'expense' },
                  { id: 'employee', name: 'Nhân sự', type: 'expense' },
                ]}
                projects={[
                  { id: '1', name: 'Dự án Website' },
                  { id: '2', name: 'Dự án Mobile App' },
                ]}
                employees={[
                  { id: '1', firstName: 'Nguyễn', lastName: 'Văn A' },
                  { id: '2', firstName: 'Trần', lastName: 'Thị B' },
                ]}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <FinanceStatsCards stats={stats} isLoading={isLoading} />

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Danh sách Chi phí</CardTitle>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm chi phí..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="draft">Nháp</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="operational">Vận hành</SelectItem>
                  <SelectItem value="development">Phát triển</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="equipment">Thiết bị</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Tháng này
              </Button>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <ExpenseTable 
            expenses={expenses}
            isLoading={isLoading}
            onView={handleViewExpense}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            onApprove={handleApproveExpense}
            onReject={handleRejectExpense}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng chi phí</p>
                <p className="text-xl font-semibold">
                  {expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString('vi-VN')} ₫
                </p>
              </div>
              <Badge variant="secondary">{expenses.length}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chờ duyệt</p>
                <p className="text-xl font-semibold text-yellow-600">
                  {expenses.filter(e => e.status === 'pending').length}
                </p>
              </div>
              <Badge variant="outline" className="border-yellow-200 text-yellow-600">
                Pending
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã duyệt</p>
                <p className="text-xl font-semibold text-green-600">
                  {expenses.filter(e => e.status === 'approved' || e.status === 'paid').length}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                Approved
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Định kỳ</p>
                <p className="text-xl font-semibold text-blue-600">
                  {expenses.filter(e => e.isRecurring).length}
                </p>
              </div>
              <Badge variant="outline" className="border-blue-200 text-blue-600">
                Recurring
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}