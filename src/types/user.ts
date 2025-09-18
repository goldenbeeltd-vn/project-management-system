/**
 * User Types
 * User, permission, role types
 */

import { BaseEntity } from "./common";
import { Role, Permission } from "@/constants/permissions";

export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: Role;
  status: "active" | "inactive" | "pending";
  lastLoginAt?: Date;
  emailVerifiedAt?: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  projectUpdates: boolean;
  teamUpdates: boolean;
  systemUpdates: boolean;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: Role;
  phone?: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatar?: string;
  role?: Role;
  status?: "active" | "inactive";
  preferences?: Partial<UserPreferences>;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: Role;
  permissions: Permission[];
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: Permission[];
  avatar?: string;
}

export interface Team extends BaseEntity {
  name: string;
  description?: string;
  members: TeamMember[];
  leaderId: string;
  status: "active" | "inactive";
}

export interface TeamMember {
  userId: string;
  user: User;
  role: "leader" | "member";
  joinedAt: Date;
}

export interface Invitation extends BaseEntity {
  email: string;
  role: Role;
  teamId?: string;
  invitedBy: string;
  invitedByUser: User;
  status: "pending" | "accepted" | "rejected" | "expired";
  expiresAt: Date;
  acceptedAt?: Date;
}
