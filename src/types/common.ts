/**
 * Common Types
 * Utility types và common interfaces
 */

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormState<T = Record<string, unknown>> {
  data: T;
  errors: Record<string, string>;
  loading: boolean;
  touched: Record<string, boolean>;
}

// Table types
export interface TableColumn<T = unknown> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sorter?: boolean;
  width?: number;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
}

export interface TableProps<T = unknown> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string);
  onRow?: (record: T) => Record<string, unknown>;
}

// Modal types
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  width?: number;
  centered?: boolean;
  destroyOnClose?: boolean;
}

// Navigation types
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  disabled?: boolean;
  hidden?: boolean;
}

// Filter types
export interface FilterOption {
  label: string;
  value: string | number;
  count?: number;
}

export interface FilterProps {
  name: string;
  label: string;
  type: "select" | "multiselect" | "date" | "daterange" | "search";
  options?: FilterOption[];
  value?: unknown;
  onChange: (value: unknown) => void;
  placeholder?: string;
}

// Upload types
export interface UploadFile {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error" | "removed";
  url?: string;
  response?: unknown;
  error?: unknown;
  size?: number;
  type?: string;
}

// Theme types
export interface ThemeConfig {
  primaryColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
}

// Status types
export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "cancelled"
  | "draft";

export interface StatusOption {
  value: Status;
  label: string;
  color: string;
  bgColor: string;
}

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface SelectChangeEvent {
  target: {
    value: string | number;
    name?: string;
  };
}

export interface InputChangeEvent {
  target: {
    value: string;
    name?: string;
  };
}
