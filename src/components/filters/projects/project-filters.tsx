"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid3X3, List, ArrowUpDown, Plus } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/constants/projects/project-categories";
import { ProjectCategory } from "@/types/projects/common";
import { IconCategory } from "@tabler/icons-react";
import { useHorizontalScroll } from "@/hooks/projects/use-horizontal-scroll";
import { AddProjectModal } from "@/components/modals/projects/add-project-modal";

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: ProjectCategory | "all";
  setCategoryFilter: (category: ProjectCategory | "all") => void;
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
  categoryFilter,
  setCategoryFilter,
  sortOrder,
  toggleSortOrder,
  viewMode,
  setViewMode,
}: ProjectFiltersProps) {
  const { scrollRef, handleMouseDown, handleWheel } =
    useHorizontalScroll<HTMLDivElement>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProject = async (projectData: {
    name: string;
    description: string;
    category: ProjectCategory | "";
    status: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    budget: string;
    priority: string;
    clientId: string;
    teamMemberIds: string[];
    currency: string;
  }) => {
    try {
      // TODO: Implement API call to create project
      console.log("Creating project:", projectData);

      alert("Dự án đã được tạo thành công!");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Có lỗi xảy ra khi tạo dự án!");
    }
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Filters Row */}
      <div className="flex items-center justify-between">
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
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="in_progress">Đang tiến hành</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="planning">Lên kế hoạch</SelectItem>
              <SelectItem value="on_hold">Tạm dừng</SelectItem>
              <SelectItem value="maintenance">Bảo trì</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Badge (if selected) */}
          {categoryFilter !== "all" && (
            <Badge variant="outline" className="h-8">
              <span>
                {
                  PROJECT_CATEGORIES.find((cat) => cat.value === categoryFilter)
                    ?.label
                }
              </span>
            </Badge>
          )}
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

          <Button
            className="flex items-center space-x-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Thêm dự án</span>
          </Button>
        </div>
      </div>
      {/* Category Tabs - Full width */}
      <div className="w-full">
        <Tabs
          value={categoryFilter}
          onValueChange={(value) =>
            setCategoryFilter(value as ProjectCategory | "all")
          }
        >
          <TabsList
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            className="inline-flex h-12 items-center justify-start rounded-md bg-muted p-2 text-muted-foreground w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
          >
            <TabsTrigger
              value="all"
              className="whitespace-nowrap pointer-events-auto"
            >
              <IconCategory className="w-4 h-4 mr-2" />
              Tất cả danh mục
            </TabsTrigger>
            {PROJECT_CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="whitespace-nowrap pointer-events-auto"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {/* Add Project Modal */}
      <AddProjectModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
}
