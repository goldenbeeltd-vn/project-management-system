"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, Eye, Edit, BarChart3 } from "lucide-react";
import { ExtendedTeamMember } from "@/types/projects/permissions";

interface MembersListProps {
  members: ExtendedTeamMember[];
  onOpenPermissionDialog: (member: ExtendedTeamMember) => void;
}

export function MembersList({
  members,
  onOpenPermissionDialog,
}: MembersListProps) {
  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Không tìm thấy thành viên
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h6 className="font-medium text-slate-900">{member.name}</h6>
              <p className="text-sm text-slate-600">
                {member.position} - {member.department}
              </p>
            </div>
            <Badge
              variant="outline"
              className="capitalize bg-slate-100 text-slate-700 border-slate-300"
            >
              {member.role}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {/* Permission badges */}
            <div className="flex gap-1">
              {member.permissions.canViewProject && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-100 text-green-700 border-green-200"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Xem
                </Badge>
              )}
              {member.permissions.canEditProject && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Sửa
                </Badge>
              )}
              {member.permissions.canManageTeam && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-purple-100 text-purple-700 border-purple-200"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Quản lý
                </Badge>
              )}
              {member.permissions.canViewReports && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-orange-100 text-orange-700 border-orange-200"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Báo cáo
                </Badge>
              )}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenPermissionDialog(member)}
              className="border-slate-300 hover:bg-slate-100"
            >
              <Settings className="h-4 w-4 mr-1" />
              Cấu hình
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
