import { BaseEntity, ProjectCategory } from "./common";

// Project status type
export type ProjectStatus =
  | "planning"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "maintenance"
  | "cancelled";

// Project priority type
export type ProjectPriority = "low" | "medium" | "high" | "urgent";

// Client/Customer interface
export interface Client extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  avatar?: string;
  status: "active" | "inactive";
}

// Team member interface
export interface TeamMember extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  department?: string;
  skills?: string[];
  status: "active" | "inactive";
  hourlyRate?: number;
}

// Project interface
export interface Project extends BaseEntity {
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  currency?: string;
  clientId: string;
  client?: Client;
  teamMemberIds: string[];
  teamMembers?: TeamMember[];
  progress: number;
  tags?: string[];
  technologies?: string[];
  attachments?: string[];
}

// Form data types
export interface ProjectFormData {
  name: string;
  description: string;
  category: ProjectCategory | "";
  status: ProjectStatus | "";
  priority: ProjectPriority | "";
  startDate: Date | undefined;
  endDate: Date | undefined;
  budget: string;
  currency: string;
  clientId: string;
  teamMemberIds: string[];
}

// Select option types
export interface ClientOption {
  value: string;
  label: string;
  company?: string;
}

export interface TeamMemberOption {
  value: string;
  label: string;
  role: string;
  avatar?: string;
}

// Document folder interface
export interface DocumentFolder {
  id: string;
  name: string;
  fileCount: number;
  color: string;
  lastModified: string;
  size?: number;
}

// Calendar Event types
export type EventType =
  | "milestone"
  | "deadline"
  | "meeting"
  | "task"
  | "review"
  | "launch";

export type EventPriority = "low" | "medium" | "high" | "urgent";

export interface CalendarEvent extends BaseEntity {
  title: string;
  description?: string;
  type: EventType;
  priority: EventPriority;
  startDate: Date;
  endDate?: Date;
  allDay: boolean;
  projectId: string;
  project?: Project;
  assignedTo?: string[];
  assignedMembers?: TeamMember[];
  color?: string;
  location?: string;
  reminder?: number; // minutes before event
  recurring?: {
    type: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    endDate?: Date;
  };
}

// Calendar view types
export type CalendarView = "month" | "week" | "day" | "agenda";

// Calendar filter interface
export interface CalendarFilters {
  projectIds?: string[];
  eventTypes?: EventType[];
  priorities?: EventPriority[];
  assignedTo?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}
