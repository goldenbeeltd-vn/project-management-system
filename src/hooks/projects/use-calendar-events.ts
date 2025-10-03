import { useState, useCallback, useMemo } from "react";
import {
  CalendarEvent,
  CalendarFilters,
  Project,
} from "@/types/projects/project";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";

interface UseCalendarEventsProps {
  projects?: Project[];
  initialEvents?: CalendarEvent[];
}

export function useCalendarEvents({
  projects = [],
  initialEvents = [],
}: UseCalendarEventsProps = {}) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [filters, setFilters] = useState<CalendarFilters>({});
  const [loading, setLoading] = useState(false);

  // Generate events from project data
  const projectEvents = useMemo(() => {
    const generatedEvents: CalendarEvent[] = [];

    projects.forEach((project) => {
      // Add project start as milestone
      if (project.startDate) {
        generatedEvents.push({
          id: `project-start-${project.id}`,
          title: `Bắt đầu: ${project.name}`,
          description: `Khởi động dự án ${project.name}`,
          type: "milestone",
          priority: project.priority,
          startDate: new Date(project.startDate),
          allDay: true,
          projectId: project.id,
          project: project,
          color: "#10b981",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Add project deadline
      if (project.endDate) {
        generatedEvents.push({
          id: `project-end-${project.id}`,
          title: `Deadline: ${project.name}`,
          description: `Hạn chót hoàn thành dự án ${project.name}`,
          type: "deadline",
          priority: "urgent",
          startDate: new Date(project.endDate),
          allDay: true,
          projectId: project.id,
          project: project,
          color: "#ef4444",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Add weekly status review for in-progress projects
      if (
        project.status === "in_progress" &&
        project.startDate &&
        project.endDate
      ) {
        const startDate = new Date(project.startDate);
        const endDate = new Date(project.endDate);
        const today = new Date();

        // Generate weekly reviews between start and end date
        const reviewDate = new Date(startDate);
        reviewDate.setDate(reviewDate.getDate() + (5 - reviewDate.getDay())); // Next Friday

        while (reviewDate <= endDate && reviewDate >= today) {
          generatedEvents.push({
            id: `review-${project.id}-${reviewDate.getTime()}`,
            title: `Review dự án: ${project.name}`,
            description: `Đánh giá tiến độ tuần cho dự án ${project.name}`,
            type: "review",
            priority: "medium",
            startDate: new Date(
              reviewDate.getFullYear(),
              reviewDate.getMonth(),
              reviewDate.getDate(),
              14,
              0,
            ),
            endDate: new Date(
              reviewDate.getFullYear(),
              reviewDate.getMonth(),
              reviewDate.getDate(),
              15,
              0,
            ),
            allDay: false,
            projectId: project.id,
            project: project,
            assignedTo: project.teamMemberIds,
            color: "#8b5cf6",
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          reviewDate.setDate(reviewDate.getDate() + 7); // Next week
        }
      }
    });

    return generatedEvents;
  }, [projects]);

  // Combine manual events with project-generated events
  const allEvents = useMemo(() => {
    return [...events, ...projectEvents];
  }, [events, projectEvents]);

  // Apply filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Filter by project
      if (filters.projectIds && filters.projectIds.length > 0) {
        if (!filters.projectIds.includes(event.projectId)) {
          return false;
        }
      }

      // Filter by event type
      if (filters.eventTypes && filters.eventTypes.length > 0) {
        if (!filters.eventTypes.includes(event.type)) {
          return false;
        }
      }

      // Filter by priority
      if (filters.priorities && filters.priorities.length > 0) {
        if (!filters.priorities.includes(event.priority)) {
          return false;
        }
      }

      // Filter by assigned member
      if (filters.assignedTo && filters.assignedTo.length > 0) {
        if (
          !event.assignedTo ||
          !event.assignedTo.some((id) => filters.assignedTo!.includes(id))
        ) {
          return false;
        }
      }

      // Filter by date range
      if (filters.dateRange) {
        const eventStart = startOfDay(event.startDate);
        const eventEnd = event.endDate
          ? endOfDay(event.endDate)
          : endOfDay(event.startDate);
        const filterStart = startOfDay(filters.dateRange.start);
        const filterEnd = endOfDay(filters.dateRange.end);

        if (
          !isWithinInterval(eventStart, {
            start: filterStart,
            end: filterEnd,
          }) &&
          !isWithinInterval(eventEnd, { start: filterStart, end: filterEnd })
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allEvents, filters]);

  const addEvent = useCallback(
    async (
      eventData: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">,
    ) => {
      setLoading(true);
      try {
        const newEvent: CalendarEvent = {
          ...eventData,
          id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setEvents((prev) => [...prev, newEvent]);
        return newEvent;
      } catch (error) {
        console.error("Error adding event:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateEvent = useCallback(
    async (eventId: string, eventData: Partial<CalendarEvent>) => {
      setLoading(true);
      try {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === eventId
              ? { ...event, ...eventData, updatedAt: new Date() }
              : event,
          ),
        );
      } catch (error) {
        console.error("Error updating event:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteEvent = useCallback(async (eventId: string) => {
    setLoading(true);
    try {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<CalendarFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Get events for a specific date
  const getEventsForDate = useCallback(
    (date: Date) => {
      const targetDate = startOfDay(date);
      return filteredEvents.filter((event) => {
        const eventStart = startOfDay(event.startDate);
        const eventEnd = event.endDate ? startOfDay(event.endDate) : eventStart;

        return targetDate >= eventStart && targetDate <= eventEnd;
      });
    },
    [filteredEvents],
  );

  // Get events for a date range
  const getEventsForRange = useCallback(
    (startDate: Date, endDate: Date) => {
      const rangeStart = startOfDay(startDate);
      const rangeEnd = endOfDay(endDate);

      return filteredEvents.filter((event) => {
        const eventStart = event.startDate;
        const eventEnd = event.endDate || event.startDate;

        return (
          (eventStart >= rangeStart && eventStart <= rangeEnd) ||
          (eventEnd >= rangeStart && eventEnd <= rangeEnd) ||
          (eventStart <= rangeStart && eventEnd >= rangeEnd)
        );
      });
    },
    [filteredEvents],
  );

  // Statistics
  const eventStats = useMemo(() => {
    const stats = {
      total: filteredEvents.length,
      byType: {} as Record<string, number>,
      byPriority: {} as Record<string, number>,
      upcoming: 0,
      overdue: 0,
    };

    const now = new Date();

    filteredEvents.forEach((event) => {
      // Count by type
      stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;

      // Count by priority
      stats.byPriority[event.priority] =
        (stats.byPriority[event.priority] || 0) + 1;

      // Count upcoming and overdue
      if (event.startDate > now) {
        stats.upcoming++;
      } else if (event.type === "deadline" && event.startDate < now) {
        stats.overdue++;
      }
    });

    return stats;
  }, [filteredEvents]);

  return {
    // Data
    events: filteredEvents,
    allEvents,
    manualEvents: events,
    projectEvents,
    filters,
    eventStats,
    loading,

    // Actions
    addEvent,
    updateEvent,
    deleteEvent,
    updateFilters,
    clearFilters,

    // Utilities
    getEventsForDate,
    getEventsForRange,
  };
}
