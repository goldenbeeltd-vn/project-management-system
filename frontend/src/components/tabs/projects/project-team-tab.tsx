"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Lock } from "lucide-react";
import { TeamMemberCard } from "@/components/cards/projects/team-member-card";
import { TeamFilters } from "@/components/filters/projects/team-filters";
import { MembersList } from "@/components/lists/projects/members-list";
import { PermissionDialog } from "@/components/modals/projects/permission-dialog";
import { useProjectTeam } from "@/hooks/projects/use-project-team";
import { useTeamFilters } from "@/hooks/projects/use-team-filters";
import { type Project } from "@/types/projects/project";

interface ProjectTeamTabProps {
  project?: Project;
}

export function ProjectTeamTab({ project }: ProjectTeamTabProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Use custom hooks
  const {
    teamMembers,
    selectedMember,
    openPermissionDialog,
    isPermissionDialogOpen,
    closePermissionDialog,
  } = useProjectTeam(project);
  const {
    filteredMembers,
    searchTerm,
    roleFilter,
    departmentFilter,
    departments,
    roles,
    handleSearchChange,
    handleRoleChange,
    handleDepartmentChange,
  } = useTeamFilters({ teamMembers });

  return (
    <div className="bg-white rounded-lg border p-6">
      <Tabs defaultValue="members" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">Nhân sự dự án</h3>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {teamMembers.length} thành viên
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <TabsList>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Thành viên
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Phân quyền
              </TabsTrigger>
            </TabsList>

            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Thêm thành viên
            </Button>
          </div>
        </div>

        <TabsContent value="members" className="space-y-6">
          <TeamFilters
            searchTerm={searchTerm}
            roleFilter={roleFilter}
            departmentFilter={departmentFilter}
            onSearchChange={handleSearchChange}
            onRoleChange={handleRoleChange}
            onDepartmentChange={handleDepartmentChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            roles={roles}
            departments={departments}
          />

          {/* Team Members Display */}
          {filteredMembers.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  viewMode={viewMode === "list" ? "row" : "grid"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Không tìm thấy thành viên
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <MembersList
            members={filteredMembers}
            onOpenPermissionDialog={openPermissionDialog}
          />
        </TabsContent>
      </Tabs>

      {/* Permission Dialog */}
      {selectedMember && (
        <PermissionDialog
          isOpen={isPermissionDialogOpen}
          onClose={closePermissionDialog}
          member={selectedMember}
        />
      )}
    </div>
  );
}
