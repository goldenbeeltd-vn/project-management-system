import { useState, useMemo } from "react";
import { mockUsers } from "@/lib/mock-data";
import { type Project } from "@/types/projects/project";
import {
  ExtendedTeamMember,
  TeamPermissions,
  UserRole,
} from "@/types/projects/permissions";
import { DEFAULT_PERMISSIONS } from "@/constants/projects/team-permissions";

export function useProjectTeam(project?: Project) {
  const [selectedMember, setSelectedMember] =
    useState<ExtendedTeamMember | null>(null);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);

  // Map role string to allowed role types
  const mapRole = (role: string): UserRole => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes("manager") || lowerRole.includes("lead"))
      return "manager";
    if (lowerRole.includes("qc") || lowerRole.includes("test")) return "qc";
    if (lowerRole.includes("devops") || lowerRole.includes("ops"))
      return "devops";
    if (lowerRole.includes("admin")) return "admin";
    return "developer"; // default
  };

  // Get team members with permissions
  const teamMembers = useMemo((): ExtendedTeamMember[] => {
    if (project && project.teamMembers) {
      return project.teamMembers.map((member) => {
        const mappedRole = mapRole(member.role);
        return {
          id: member.id,
          name: member.name,
          email: member.email,
          avatar: member.avatar || "/placeholder-avatar.png",
          role: mappedRole,
          phone: member.phone,
          position: member.role,
          department: member.department || "N/A",
          salary: {
            hourlyRate: member.hourlyRate || 125000,
            monthlyRate: member.hourlyRate ? member.hourlyRate * 160 : 20000000,
            overtimeRate: member.hourlyRate ? member.hourlyRate * 1.5 : 187500,
          },
          experience: "2-5 năm",
          skills: member.skills || [],
          permissions: DEFAULT_PERMISSIONS[mappedRole],
        };
      });
    }

    // Fallback to mock users for demo
    return mockUsers.slice(0, 8).map((user) => ({
      ...user,
      position: user.position || "N/A",
      department: user.department || "N/A",
      permissions: DEFAULT_PERMISSIONS[user.role],
    }));
  }, [project]);

  // Get unique departments and roles for filters
  const departments = useMemo(() => {
    return Array.from(
      new Set(teamMembers.map((m) => m.department).filter(Boolean)),
    ) as string[];
  }, [teamMembers]);

  const roles = useMemo(() => {
    return Array.from(new Set(teamMembers.map((m) => m.role)));
  }, [teamMembers]);

  // Update member permissions
  const updateMemberPermissions = (
    memberId: string,
    permissionKey: keyof TeamPermissions,
    value: boolean,
  ) => {
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember({
        ...selectedMember,
        permissions: {
          ...selectedMember.permissions,
          [permissionKey]: value,
        },
      });
    }
    // In a real app, this would also update the backend
    console.log(
      `Updating ${selectedMember?.name}'s ${permissionKey}: ${value}`,
    );
  };

  // Update member role
  const updateMemberRole = (newRole: UserRole) => {
    if (selectedMember) {
      const newPermissions = DEFAULT_PERMISSIONS[newRole];
      if (newPermissions) {
        setSelectedMember({
          ...selectedMember,
          role: newRole,
          permissions: newPermissions,
        });
        console.log(
          `Updated ${selectedMember.name}'s role to: ${newRole} with default permissions`,
        );
      }
    }
  };

  // Open permission dialog
  const openPermissionDialog = (member: ExtendedTeamMember) => {
    setSelectedMember(member);
    setIsPermissionDialogOpen(true);
  };

  // Close permission dialog
  const closePermissionDialog = () => {
    setIsPermissionDialogOpen(false);
    setSelectedMember(null);
  };

  return {
    teamMembers,
    departments,
    roles,
    selectedMember,
    isPermissionDialogOpen,
    updateMemberPermissions,
    updateMemberRole,
    openPermissionDialog,
    closePermissionDialog,
  };
}
