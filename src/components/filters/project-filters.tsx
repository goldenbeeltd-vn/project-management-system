"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3X3, List, ArrowUpDown, Plus } from "lucide-react";

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  viewMode: "grid" | "row";
  setViewMode: (mode: "grid" | "row") => void;
}

export function ProjectFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOrder,
  toggleSortOrder,
  viewMode,
  setViewMode,
}: ProjectFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left Column: Search, Sort A-Z, Status */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Tìm kiếm dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-200"
            />
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleSortOrder}
          className="flex items-center space-x-2 border-slate-200"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>{sortOrder === "asc" ? "A → Z" : "Z → A"}</span>
        </Button>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 border-slate-200">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="in_progress">Đang tiến hành</SelectItem>
            <SelectItem value="completed">Hoàn thành</SelectItem>
            <SelectItem value="planning">Lên kế hoạch</SelectItem>
            <SelectItem value="on_hold">Tạm dừng</SelectItem>
            <SelectItem value="maintenance">Bảo trì</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right Column: Grid/Row toggle, Add Project */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-slate-200 rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none border-r border-slate-200"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "row" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("row")}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Thêm dự án</span>
        </Button>
      </div>
    </div>
  );
}
