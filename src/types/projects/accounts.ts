/**
 * Account management types for project accounts
 */

export type AccountType =
  | "hosting"
  | "vps"
  | "domain"
  | "chplay"
  | "appstore"
  | "github"
  | "gitlab"
  | "bitbucket"
  | "canva"
  | "figma"
  | "adobe"
  | "google-api"
  | "facebook-api"
  | "twitter-api"
  | "firebase"
  | "aws"
  | "azure"
  | "cloudflare"
  | "mongodb"
  | "mysql"
  | "postgresql"
  | "redis"
  | "stripe"
  | "paypal"
  | "email"
  | "sms"
  | "push-notification"
  | "analytics"
  | "seo-tools"
  | "social-media"
  | "cdn"
  | "ssl"
  | "monitoring"
  | "backup"
  | "other";

export interface AccountCategory {
  id: string;
  name: string;
  description?: string;
  icon: string;
  types: AccountType[];
}

export interface Account {
  id: string;
  projectId: string;
  type: AccountType;
  category: string;
  name: string;
  description?: string;
  username?: string;
  email?: string;
  password?: string;
  apiKey?: string;
  accessToken?: string;
  secretKey?: string;
  url?: string;
  port?: number;
  database?: string;
  additionalFields?: Record<string, string | number | boolean>;
  isActive: boolean;
  lastUsed?: Date;
  expirationDate?: Date;
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
}

export interface AccountFormData {
  type: AccountType;
  category: string;
  name: string;
  description?: string;
  username?: string;
  email?: string;
  password?: string;
  apiKey?: string;
  accessToken?: string;
  secretKey?: string;
  url?: string;
  port?: number;
  database?: string;
  additionalFields?: Record<string, string | number | boolean>;
  isActive: boolean;
  expirationDate?: Date;
  notes?: string;
  tags?: string[];
}

export interface AccountFormErrors {
  type?: string;
  category?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  apiKey?: string;
  url?: string;
  port?: string;
  database?: string;
}

export interface AccountFilter {
  category?: string;
  type?: AccountType;
  isActive?: boolean;
  search?: string;
  tags?: string[];
}

export interface AccountStats {
  total: number;
  active: number;
  inactive: number;
  expiringSoon: number;
  byCategory: Record<string, number>;
  byType: Record<AccountType, number>;
}
