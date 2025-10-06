"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";
import { vi } from "date-fns/locale";
import { AddEventModal } from "@/components/modals/projects/add-event-modal-simple";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarEvent,
  CalendarView,
  EventType,
} from "@/types/projects/project";
import { useCalendarEvents } from "@/hooks/projects/use-calendar-events";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

// Mock data - sẽ được thay thế bằng data thật từ API
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Kick-off Meeting",
    description: "Họp khởi động dự án website mới",
    type: "meeting",
    priority: "high",
    startDate: new Date(2025, 8, 23, 9, 0), // September 23, 2025 9:00 AM
    endDate: new Date(2025, 8, 23, 10, 30),
    allDay: false,
    projectId: "project-1",
    assignedTo: ["user-1", "user-2"],
    color: "#3b82f6",
    location: "Phòng họp A",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Design Review",
    description: "Review thiết kế UI/UX",
    type: "review",
    priority: "medium",
    startDate: new Date(2025, 8, 25, 14, 0),
    endDate: new Date(2025, 8, 25, 16, 0),
    allDay: false,
    projectId: "project-1",
    assignedTo: ["user-3"],
    color: "#10b981",
    location: "Online",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Milestone: MVP Complete",
    description: "Hoàn thành phiên bản MVP",
    type: "milestone",
    priority: "urgent",
    startDate: new Date(2025, 8, 30),
    allDay: true,
    projectId: "project-1",
    color: "#f59e0b",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Client Presentation",
    description: "Trình bày tiến độ với khách hàng",
    type: "meeting",
    priority: "high",
    startDate: new Date(2025, 9, 2, 10, 0), // October 2, 2025
    endDate: new Date(2025, 9, 2, 11, 30),
    allDay: false,
    projectId: "project-1",
    assignedTo: ["user-1", "user-4"],
    color: "#3b82f6",
    location: "Văn phòng khách hàng",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const eventTypeColors: Record<EventType, string> = {
  milestone: "#f59e0b",
  deadline: "#ef4444",
  meeting: "#3b82f6",
  task: "#10b981",
  review: "#8b5cf6",
  launch: "#f97316",
};

const eventTypeLabels: Record<EventType, string> = {
  milestone: "Cột mốc",
  deadline: "Hạn chót",
  meeting: "Họp",
  task: "Công việc",
  review: "Đánh giá",
  launch: "Ra mắt",
};

interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

function CalendarDay({
  date,
  events,
  isCurrentMonth,
  isToday,
  onEventClick,
  onDateClick,
}: CalendarDayProps) {
  const dayEvents = events.filter(
    (event) =>
      isSameDay(event.startDate, date) ||
      (event.endDate &&
        isWithinInterval(date, { start: event.startDate, end: event.endDate })),
  );

  return (
    <div
      className={`min-h-[120px] border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
        !isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
      } ${isToday ? "bg-blue-50 border-blue-300" : ""}`}
      onClick={() => onDateClick(date)}
    >
      <div
        className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}
      >
        {format(date, "d")}
      </div>
      <div className="space-y-1">
        {dayEvents.slice(0, 3).map((event) => (
          <TooltipProvider key={event.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: event.color + "20",
                    color: event.color,
                    borderLeft: `3px solid ${event.color}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  {event.allDay
                    ? event.title
                    : `${format(event.startDate, "HH:mm")} ${event.title}`}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-sm">
                <div className="space-y-1">
                  <div className="font-medium">{event.title}</div>
                  {event.description && (
                    <div className="text-xs text-gray-600">
                      {event.description}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {event.allDay
                      ? "Cả ngày"
                      : `${format(event.startDate, "HH:mm")}${event.endDate ? ` - ${format(event.endDate, "HH:mm")}` : ""}`}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {eventTypeLabels[event.type]}
                  </Badge>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-gray-500 text-center">
            +{dayEvents.length - 3} sự kiện khác
          </div>
        )}
      </div>
    </div>
  );
}

import { Project } from "@/types/projects/project";

interface ProjectCalendarTabProps {
  projects?: Project[];
}

export function ProjectCalendarTab({ projects = [] }: ProjectCalendarTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("agenda");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent | undefined
  >();

  // Use calendar events hook
  const { events, addEvent, updateEvent } = useCalendarEvents({
    projects,
    initialEvents: mockEvents,
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStart = event.startDate;
      const eventEnd = event.endDate || event.startDate;

      return (
        (eventStart >= calendarStart && eventStart <= calendarEnd) ||
        (eventEnd >= calendarStart && eventEnd <= calendarEnd) ||
        (eventStart <= calendarStart && eventEnd >= calendarEnd)
      );
    });
  }, [events, calendarStart, calendarEnd]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowAddEventModal(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setShowAddEventModal(true);
  };

  const handleAddEvent = () => {
    setSelectedDate(new Date());
    setSelectedEvent(undefined);
    setShowAddEventModal(true);
  };

  const handleSaveEvent = async (
    eventData: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      if (selectedEvent) {
        // Update existing event
        await updateEvent(selectedEvent.id, eventData);
      } else {
        // Create new event
        await addEvent(eventData);
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Lịch Dự Án</h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Navigation */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevMonth}
              className="h-8 px-2 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-3 py-1 text-sm font-medium text-gray-700 min-w-[140px] text-center">
              {format(currentDate, "MMM yyyy", { locale: vi })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 px-2 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Segmented Toggle */}
          <SegmentedControl
            type="single"
            value={view}
            onValueChange={(value) => value && setView(value as CalendarView)}
          >
            <SegmentedControlItem value="month">Tháng</SegmentedControlItem>
            <SegmentedControlItem value="week">Tuần</SegmentedControlItem>
            <SegmentedControlItem value="day">Ngày</SegmentedControlItem>
            <SegmentedControlItem value="agenda">Hôm nay</SegmentedControlItem>
          </SegmentedControl>

          <Button variant="default" onClick={handleAddEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm sự kiện
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        {/* Week header */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-500 border-b"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200">
          {calendarDays.map((date) => (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              events={filteredEvents}
              isCurrentMonth={isSameMonth(date, currentDate)}
              isToday={isToday(date)}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
            />
          ))}
        </div>

        {/* Event Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="text-sm font-medium text-gray-700 mr-2">
            Loại sự kiện:
          </div>
          {Object.entries(eventTypeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: eventTypeColors[type as EventType] }}
              />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        open={showAddEventModal}
        onOpenChange={setShowAddEventModal}
        initialDate={selectedDate}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
