"use client";

import { Badge } from "@/components/ui/badge";
import { useSidebarSections } from "@/hooks/use-sidebar-sections";
import {
  AlertTriangle,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Database,
  DollarSign,
  Folder,
  FolderOpen,
  Globe,
  Key,
  LayoutGrid,
  ListTodo,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Server,
  Settings,
  Shield,
  Star,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export function Sidebar({
  isCollapsed,
  onCollapsedChange,
}: {
  isCollapsed: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}) {
  const { toggleSection, isExpanded } = useSidebarSections([""]);

  // Unified styles
  const baseItemClasses = isCollapsed
    ? "flex items-center px-1 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
    : "flex items-center px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors";
  const navigationLinkClasses = `${baseItemClasses} gap-3`;
  const actionButtonClasses = `${baseItemClasses} w-full justify-between`;

  return (
    <aside
      className={`bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Main Navigation - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        <nav className="space-y-1 p-5.5">
          {/* Dashboard */}
          <Link href="/" className={navigationLinkClasses}>
            <LayoutGrid className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          {/* Recent */}
          <Link href="/recent" className={actionButtonClasses}>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>Gần đây</span>}
            </div>
            {!isCollapsed && <ChevronRight className="w-4 h-4" />}
          </Link>

          {/* Starred */}
          <Link href="/starred" className={actionButtonClasses}>
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>Đã đánh dấu</span>}
            </div>
            {!isCollapsed && <ChevronRight className="w-4 h-4" />}
          </Link>

          {/* Apps */}
          <Link href="/tasks" className={navigationLinkClasses}>
            <ListTodo className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Công việc</span>}
          </Link>

          {/* Plans */}
          <Link href="/plans" className={navigationLinkClasses}>
            <CreditCard className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span>Kế hoạch</span>
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs bg-gray-200 text-gray-700"
                >
                  3 <span className="text-gray-500">ngày</span>
                </Badge>
              </>
            )}
          </Link>

          {/* Projects */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection("projects")}
              className={
                isCollapsed
                  ? `${baseItemClasses} justify-center`
                  : actionButtonClasses
              }
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Dự án</span>}
              </div>
              {!isCollapsed &&
                (isExpanded("projects") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                ))}
            </button>

            {!isCollapsed && isExpanded("projects") && (
              <div className="ml-4 mt-1 space-y-1">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-xs font-medium text-gray-500">
                    Gần đây
                  </div>
                  <div className="flex items-center gap-1">
                    <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </div>
                </div>

                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 rounded hover:bg-gray-100 border-l-2 border-orange-500 bg-orange-50"
                >
                  <div className="w-6 h-4 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold p-2">WP</span>
                  </div>
                  <span className="truncate">Quản Lý Dự Án</span>
                </Link>

                <Link
                  href="/projects/more"
                  className={`${actionButtonClasses} py-1`}
                >
                  <div className="flex items-center gap-2">
                    <MoreHorizontal className="w-4 h-4" />
                    <span>Thêm dự án</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Team Management */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection("members")}
              className={
                isCollapsed
                  ? `${baseItemClasses} justify-center`
                  : actionButtonClasses
              }
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Quản lý Nhân sự</span>}
              </div>
              {!isCollapsed &&
                (isExpanded("team") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                ))}
            </button>

            {!isCollapsed && isExpanded("members") && (
              <div className="ml-4 mt-1 space-y-1">
                <Link href="/members" className={navigationLinkClasses}>
                  <UserCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Thành viên</span>
                </Link>
                <Link href="/members/roles" className={navigationLinkClasses}>
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span>Vai trò & Quyền hạn</span>
                </Link>
              </div>
            )}
          </div>

          {/* Infrastructure Management */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection("infrastructure")}
              className={
                isCollapsed
                  ? `${baseItemClasses} justify-center`
                  : actionButtonClasses
              }
            >
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Hạ tầng & Hosting</span>}
              </div>
              {!isCollapsed &&
                (isExpanded("infrastructure") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                ))}
            </button>

            {!isCollapsed && isExpanded("infrastructure") && (
              <div className="ml-4 mt-1 space-y-1">
                <Link href="/hosting" className={navigationLinkClasses}>
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span>Hosting & Domains</span>
                </Link>

                <Link
                  href="/infrastructure/database"
                  className={navigationLinkClasses}
                >
                  <Database className="w-4 h-4 flex-shrink-0" />
                  <span>Database</span>
                </Link>

                <Link
                  href="/infrastructure/api-keys"
                  className={navigationLinkClasses}
                >
                  <Key className="w-4 h-4 flex-shrink-0" />
                  <span>API Keys & Secrets</span>
                </Link>

                <Link
                  href="/infrastructure/maintenance"
                  className={navigationLinkClasses}
                >
                  <Wrench className="w-4 h-4 flex-shrink-0" />
                  <span>Bảo trì & Vận hành</span>
                </Link>
              </div>
            )}
          </div>

          {/* Document */}
          <Link href="/document" className={navigationLinkClasses}>
            <Folder className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Quản lý tài liệu</span>}
          </Link>

          {/* Finance & Budget */}
          <Link href="/finance" className={navigationLinkClasses}>
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Ngân sách & Chi phí</span>}
          </Link>

          {/* Risk Management */}
          <Link href="/risks" className={navigationLinkClasses}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span>Quản lý Rủi ro</span>
                <Badge className="ml-auto text-xs bg-red-100 text-red-800">
                  2
                </Badge>
              </>
            )}
          </Link>

          {/* Reports */}
          <Link href="/reports" className={navigationLinkClasses}>
            <BarChart3 className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Báo cáo Tổng hợp</span>}
          </Link>

          {/* Customer Management */}
          <Link href="/clients" className={navigationLinkClasses}>
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Khách hàng & Hợp đồng</span>}
          </Link>

          {/* Settings */}
          <Link href="/settings" className={navigationLinkClasses}>
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Cài đặt</span>}
          </Link>
        </nav>
      </div>

      {/* Bottom Section - Fixed */}
      <div className="border-t border-gray-200 p-2 flex-shrink-0">
        {!isCollapsed ? (
          /* When expanded: 2 buttons side by side */
          <div className="flex items-center gap-2">
            <div className={`${baseItemClasses} flex-1 justify-start`}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full flex-shrink-0" />
                <span className="text-xs truncate">
                  Được viết bởi GOLDEN BEE
                </span>
              </div>
            </div>

            <button
              onClick={() => onCollapsedChange?.(!isCollapsed)}
              className={`${baseItemClasses} flex-shrink-0 justify-center`}
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isCollapsed ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          </div>
        ) : (
          /* When collapsed: only toggle button */
          <button
            onClick={() => onCollapsedChange?.(!isCollapsed)}
            className={`${baseItemClasses} w-full justify-center`}
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        )}
      </div>
    </aside>
  );
}
