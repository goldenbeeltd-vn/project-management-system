"use client";

import { useState } from "react";
import { CalendarDays, Filter, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarFilters,
  EventType,
  EventPriority,
  Project,
  TeamMember,
} from "@/types/projects/project";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface CalendarFiltersProps {
  filters: CalendarFilters;
  onFiltersChange: (filters: Partial<CalendarFilters>) => void;
  onClearFilters: () => void;
  projects?: Project[];
  teamMembers?: TeamMember[];
}

const eventTypeOptions: { value: EventType; label: string; color: string }[] = [
  { value: "meeting", label: "Họp", color: "#3b82f6" },
  { value: "milestone", label: "Cột mốc", color: "#f59e0b" },
  { value: "deadline", label: "Hạn chót", color: "#ef4444" },
  { value: "task", label: "Công việc", color: "#10b981" },
  { value: "review", label: "Đánh giá", color: "#8b5cf6" },
  { value: "launch", label: "Ra mắt", color: "#f97316" },
];

const priorityOptions: {
  value: EventPriority;
  label: string;
  color: string;
}[] = [
  { value: "low", label: "Thấp", color: "#6b7280" },
  { value: "medium", label: "Trung bình", color: "#f59e0b" },
  { value: "high", label: "Cao", color: "#f97316" },
  { value: "urgent", label: "Khẩn cấp", color: "#ef4444" },
];

export function CalendarFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
  projects = [],
  teamMembers = [],
}: CalendarFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const hasActiveFilters = Boolean(
    filters.projectIds?.length ||
      filters.eventTypes?.length ||
      filters.priorities?.length ||
      filters.assignedTo?.length ||
      filters.dateRange,
  );

  const handleProjectToggle = (projectId: string) => {
    const currentProjects = filters.projectIds || [];
    const newProjects = currentProjects.includes(projectId)
      ? currentProjects.filter((id) => id !== projectId)
      : [...currentProjects, projectId];

    onFiltersChange({
      projectIds: newProjects.length > 0 ? newProjects : undefined,
    });
  };

  const handleEventTypeToggle = (eventType: EventType) => {
    const currentTypes = filters.eventTypes || [];
    const newTypes = currentTypes.includes(eventType)
      ? currentTypes.filter((type) => type !== eventType)
      : [...currentTypes, eventType];

    onFiltersChange({ eventTypes: newTypes.length > 0 ? newTypes : undefined });
  };

  const handlePriorityToggle = (priority: EventPriority) => {
    const currentPriorities = filters.priorities || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter((p) => p !== priority)
      : [...currentPriorities, priority];

    onFiltersChange({
      priorities: newPriorities.length > 0 ? newPriorities : undefined,
    });
  };

  const handleMemberToggle = (memberId: string) => {
    const currentMembers = filters.assignedTo || [];
    const newMembers = currentMembers.includes(memberId)
      ? currentMembers.filter((id) => id !== memberId)
      : [...currentMembers, memberId];

    onFiltersChange({
      assignedTo: newMembers.length > 0 ? newMembers : undefined,
    });
  };

  const handleDateRangeChange = (
    field: "start" | "end",
    date: Date | undefined,
  ) => {
    if (!date) {
      if (field === "start" && filters.dateRange?.end) {
        onFiltersChange({ dateRange: undefined });
      } else if (field === "end" && filters.dateRange?.start) {
        onFiltersChange({ dateRange: undefined });
      }
      return;
    }

    const currentRange = filters.dateRange || {
      start: undefined,
      end: undefined,
    };
    const newRange = { ...currentRange, [field]: date };

    if (newRange.start || newRange.end) {
      onFiltersChange({
        dateRange: {
          start: newRange.start || new Date(),
          end: newRange.end || new Date(),
        },
      });
    }
  };

  const filteredProjects = searchTerm
    ? projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : projects;

  const filteredMembers = searchTerm
    ? teamMembers.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : teamMembers;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm sự kiện..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-64"
        />
      </div>

      {/* Filters Toggle */}
      <Popover open={showFilters} onOpenChange={setShowFilters}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 p-0 flex items-center justify-center"
              >
                {[
                  filters.projectIds?.length || 0,
                  filters.eventTypes?.length || 0,
                  filters.priorities?.length || 0,
                  filters.assignedTo?.length || 0,
                  filters.dateRange ? 1 : 0,
                ].reduce((sum, count) => sum + count, 0)}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Bộ lọc</h4>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Xóa tất cả
                </Button>
              )}
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Khoảng thời gian</label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {filters.dateRange?.start
                        ? format(filters.dateRange.start, "dd/MM", {
                            locale: vi,
                          })
                        : "Từ ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange?.start}
                      onSelect={(date) => handleDateRangeChange("start", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {filters.dateRange?.end
                        ? format(filters.dateRange.end, "dd/MM", { locale: vi })
                        : "Đến ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange?.end}
                      onSelect={(date) => handleDateRangeChange("end", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Project Filter */}
            {filteredProjects.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Dự án</label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`project-${project.id}`}
                        checked={
                          filters.projectIds?.includes(project.id) || false
                        }
                        onCheckedChange={() => handleProjectToggle(project.id)}
                      />
                      <label
                        htmlFor={`project-${project.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {project.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Loại sự kiện</label>
              <div className="space-y-2">
                {eventTypeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`type-${option.value}`}
                      checked={
                        filters.eventTypes?.includes(option.value) || false
                      }
                      onCheckedChange={() =>
                        handleEventTypeToggle(option.value)
                      }
                    />
                    <label
                      htmlFor={`type-${option.value}`}
                      className="text-sm cursor-pointer flex items-center gap-2 flex-1"
                    >
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Độ ưu tiên</label>
              <div className="space-y-2">
                {priorityOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`priority-${option.value}`}
                      checked={
                        filters.priorities?.includes(option.value) || false
                      }
                      onCheckedChange={() => handlePriorityToggle(option.value)}
                    />
                    <label
                      htmlFor={`priority-${option.value}`}
                      className="text-sm cursor-pointer flex items-center gap-2 flex-1"
                    >
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Member Filter */}
            {filteredMembers.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Người được giao</label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`member-${member.id}`}
                        checked={
                          filters.assignedTo?.includes(member.id) || false
                        }
                        onCheckedChange={() => handleMemberToggle(member.id)}
                      />
                      <label
                        htmlFor={`member-${member.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {member.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1 flex-wrap">
          {filters.projectIds?.map((projectId) => {
            const project = projects.find((p) => p.id === projectId);
            return project ? (
              <Badge key={projectId} variant="secondary" className="text-xs">
                {project.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleProjectToggle(projectId)}
                />
              </Badge>
            ) : null;
          })}

          {filters.eventTypes?.map((type) => {
            const typeOption = eventTypeOptions.find(
              (opt) => opt.value === type,
            );
            return typeOption ? (
              <Badge key={type} variant="secondary" className="text-xs">
                {typeOption.label}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleEventTypeToggle(type)}
                />
              </Badge>
            ) : null;
          })}

          {filters.priorities?.map((priority) => {
            const priorityOption = priorityOptions.find(
              (opt) => opt.value === priority,
            );
            return priorityOption ? (
              <Badge key={priority} variant="secondary" className="text-xs">
                {priorityOption.label}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handlePriorityToggle(priority)}
                />
              </Badge>
            ) : null;
          })}

          {filters.dateRange && (
            <Badge variant="secondary" className="text-xs">
              {filters.dateRange.start &&
                format(filters.dateRange.start, "dd/MM", { locale: vi })}
              {filters.dateRange.start && filters.dateRange.end && " - "}
              {filters.dateRange.end &&
                format(filters.dateRange.end, "dd/MM", { locale: vi })}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onFiltersChange({ dateRange: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
