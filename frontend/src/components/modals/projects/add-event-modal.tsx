"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const eventFormSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().optional(),
  type: z.enum([
    "milestone",
    "deadline",
    "meeting",
    "task",
    "review",
    "launch",
  ] as const),
  priority: z.enum(["low", "medium", "high", "urgent"] as const),
  startDate: z.date(),
  startTime: z.string().default("09:00"),
  endDate: z.date().optional(),
  endTime: z.string().default("10:00"),
  allDay: z.boolean().default(false),
  location: z.string().default(""),
  reminder: z.number().default(15),
  projectId: z.string().min(1, "Dự án là bắt buộc"),
  assignedTo: z.array(z.string()).default([]),
});

type EventFormData = z.infer<typeof eventFormSchema>;

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

// Mock project options - sẽ được thay thế bằng data thật
const mockProjects = [
  { id: "project-1", name: "Website Redesign" },
  { id: "project-2", name: "Mobile App" },
  { id: "project-3", name: "E-commerce Platform" },
];

// Mock team members - sẽ được thay thế bằng data thật
// const mockTeamMembers = [
//   { id: 'user-1', name: 'Nguyễn Văn A' },
//   { id: 'user-2', name: 'Trần Thị B' },
//   { id: 'user-3', name: 'Lê Văn C' },
//   { id: 'user-4', name: 'Phạm Thị D' },
// ];

export function AddEventModal({
  open,
  onOpenChange,
  initialDate,
  event,
  onSave,
}: AddEventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      type: event?.type || "meeting",
      priority: event?.priority || "medium",
      startDate: event?.startDate || initialDate || new Date(),
      startTime: event?.startDate ? format(event.startDate, "HH:mm") : "09:00",
      endDate: event?.endDate || undefined,
      endTime: event?.endDate ? format(event.endDate, "HH:mm") : "10:00",
      allDay: event?.allDay || false,
      location: event?.location || "",
      reminder: event?.reminder || 15,
      projectId: event?.projectId || "",
      assignedTo: event?.assignedTo || [],
    },
  });

  const watchAllDay = form.watch("allDay");
  const watchType = form.watch("type");

  const onSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true);

      const startDateTime = data.allDay
        ? data.startDate
        : new Date(`${format(data.startDate, "yyyy-MM-dd")}T${data.startTime}`);

      const endDateTime = data.endDate
        ? data.allDay
          ? data.endDate
          : new Date(
              `${format(data.endDate, "yyyy-MM-dd")}T${data.endTime || data.startTime}`,
            )
        : undefined;

      const selectedType = eventTypeOptions.find(
        (opt) => opt.value === data.type,
      );

      const eventData: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt"> = {
        title: data.title,
        description: data.description,
        type: data.type,
        priority: data.priority,
        startDate: startDateTime,
        endDate: endDateTime,
        allDay: data.allDay,
        projectId: data.projectId,
        assignedTo: data.assignedTo,
        color: selectedType?.color || "#3b82f6",
        location: data.location,
        reminder: data.reminder,
      };

      await onSave(eventData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSubmitting(false);
    }
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề sự kiện..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả chi tiết..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại sự kiện *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại sự kiện" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Độ ưu tiên *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn độ ưu tiên" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project */}
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dự án *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn dự án" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* All Day Toggle */}
              <FormField
                control={form.control}
                name="allDay"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Cả ngày</FormLabel>
                      <FormDescription>
                        Sự kiện diễn ra trong cả ngày
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ngày bắt đầu *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", {
                                  locale: vi,
                                })
                              ) : (
                                <span>Chọn ngày</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!watchAllDay && (
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giờ bắt đầu</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* End Date and Time (optional for non-milestone events) */}
              {watchType !== "milestone" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ngày kết thúc</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", {
                                    locale: vi,
                                  })
                                ) : (
                                  <span>Chọn ngày kết thúc</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!watchAllDay && (
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giờ kết thúc</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Nhập địa điểm..."
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reminder */}
              <FormField
                control={form.control}
                name="reminder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhắc nhở</FormLabel>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn thời gian nhắc nhở" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Đang lưu..."
                  : event
                    ? "Cập nhật"
                    : "Tạo sự kiện"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
