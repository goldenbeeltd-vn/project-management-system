"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Bell } from "lucide-react";
import { vi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarEvent,
  EventType,
  EventPriority,
} from "@/types/projects/project";
import { Label } from "@/components/ui/label";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDate?: Date;
  event?: CalendarEvent;
  onSave: (
    event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">,
  ) => void;
}

const eventTypeOptions: { value: EventType; label: string; color: string }[] = [
  { value: "meeting", label: "Họp", color: "#3b82f6" },
  { value: "milestone", label: "Cột mốc", color: "#f59e0b" },
  { value: "deadline", label: "Hạn chót", color: "#ef4444" },
  { value: "task", label: "Công việc", color: "#10b981" },
  { value: "review", label: "Đánh giá", color: "#8b5cf6" },
  { value: "launch", label: "Ra mắt", color: "#f97316" },
];

const priorityOptions: { value: EventPriority; label: string }[] = [
  { value: "low", label: "Thấp" },
  { value: "medium", label: "Trung bình" },
  { value: "high", label: "Cao" },
  { value: "urgent", label: "Khẩn cấp" },
];

const reminderOptions = [
  { value: 0, label: "Không nhắc nhở" },
  { value: 15, label: "15 phút trước" },
  { value: 30, label: "30 phút trước" },
  { value: 60, label: "1 giờ trước" },
  { value: 1440, label: "1 ngày trước" },
  { value: 10080, label: "1 tuần trước" },
];

const mockProjects = [
  { id: "project-1", name: "Website Redesign" },
  { id: "project-2", name: "Mobile App" },
  { id: "project-3", name: "E-commerce Platform" },
];

export function AddEventModal({
  open,
  onOpenChange,
  initialDate,
  event,
  onSave,
}: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    type: event?.type || ("meeting" as EventType),
    priority: event?.priority || ("medium" as EventPriority),
    startDate: event?.startDate || initialDate || new Date(),
    startTime: event?.startDate ? format(event.startDate, "HH:mm") : "09:00",
    endDate: event?.endDate || null,
    endTime: event?.endDate ? format(event.endDate, "HH:mm") : "10:00",
    allDay: event?.allDay || false,
    location: event?.location || "",
    reminder: event?.reminder || 15,
    projectId: event?.projectId || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.projectId) return;

    try {
      setIsSubmitting(true);

      const startDateTime = formData.allDay
        ? formData.startDate
        : new Date(
            `${format(formData.startDate, "yyyy-MM-dd")}T${formData.startTime}`,
          );

      const endDateTime = formData.endDate
        ? formData.allDay
          ? formData.endDate
          : new Date(
              `${format(formData.endDate, "yyyy-MM-dd")}T${formData.endTime}`,
            )
        : undefined;

      const selectedType = eventTypeOptions.find(
        (opt) => opt.value === formData.type,
      );

      const eventData: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt"> = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        priority: formData.priority,
        startDate: startDateTime,
        endDate: endDateTime,
        allDay: formData.allDay,
        projectId: formData.projectId,
        assignedTo: [],
        color: selectedType?.color || "#3b82f6",
        location: formData.location,
        reminder: formData.reminder,
      };

      await onSave(eventData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
          </DialogTitle>
          <DialogDescription>
            {event ? "Cập nhật thông tin sự kiện" : "Tạo sự kiện mới cho dự án"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề sự kiện..."
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                placeholder="Nhập mô tả chi tiết..."
                className="resize-none"
                rows={3}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            {/* Type and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại sự kiện *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => updateField("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại sự kiện" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: option.color }}
                          />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Độ ưu tiên *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => updateField("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn độ ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Project */}
            <div className="space-y-2">
              <Label>Dự án *</Label>
              <Select
                value={formData.projectId}
                onValueChange={(value) => updateField("projectId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label className="text-base">Cả ngày</Label>
                <p className="text-sm text-muted-foreground">
                  Sự kiện diễn ra trong cả ngày
                </p>
              </div>
              <Switch
                checked={formData.allDay}
                onCheckedChange={(checked) => updateField("allDay", checked)}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày bắt đầu *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      {formData.startDate ? (
                        format(formData.startDate, "dd/MM/yyyy", { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) =>
                        date && updateField("startDate", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {!formData.allDay && (
                <div className="space-y-2">
                  <Label>Giờ bắt đầu</Label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => updateField("startTime", e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* End Date and Time (optional for non-milestone events) */}
            {formData.type !== "milestone" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ngày kết thúc</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !formData.endDate && "text-muted-foreground",
                        )}
                      >
                        {formData.endDate ? (
                          format(formData.endDate, "dd/MM/yyyy", { locale: vi })
                        ) : (
                          <span>Chọn ngày kết thúc</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate || undefined}
                        onSelect={(date) => updateField("endDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {!formData.allDay && (
                  <div className="space-y-2">
                    <Label>Giờ kết thúc</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => updateField("endTime", e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            <div className="space-y-2">
              <Label>Địa điểm</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nhập địa điểm..."
                  className="pl-9"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>
            </div>

            {/* Reminder */}
            <div className="space-y-2">
              <Label>Nhắc nhở</Label>
              <Select
                value={formData.reminder.toString()}
                onValueChange={(value) =>
                  updateField("reminder", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời gian nhắc nhở" />
                </SelectTrigger>
                <SelectContent>
                  {reminderOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.projectId}
            >
              {isSubmitting
                ? "Đang lưu..."
                : event
                  ? "Cập nhật"
                  : "Tạo sự kiện"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
