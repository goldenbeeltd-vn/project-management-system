import { useState, useMemo } from "react";
import { ExtendedTeamMember } from "@/types/projects/permissions";

interface UseTeamFiltersProps {
  teamMembers: ExtendedTeamMember[];
}

export function useTeamFilters({ teamMembers }: UseTeamFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique departments and roles for filters
  const departments = useMemo(() => {
    return Array.from(
      new Set(teamMembers.map((m) => m.department).filter(Boolean)),
    ) as string[];
  }, [teamMembers]);

  const roles = useMemo(() => {
    return Array.from(
      new Set(teamMembers.map((m) => m.role).filter(Boolean)),
    ) as string[];
  }, [teamMembers]);

  // Filter members based on search and filters
  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      const matchesDepartment =
        departmentFilter === "all" || member.department === departmentFilter;

      return matchesSearch && matchesRole && matchesDepartment;
    });
  }, [teamMembers, searchTerm, roleFilter, departmentFilter]);

  // Handler functions
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartmentFilter(value);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setDepartmentFilter("all");
  };

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    departmentFilter,
    setDepartmentFilter,
    viewMode,
    setViewMode,
    departments,
    roles,
    filteredMembers,
    handleSearchChange,
    handleRoleChange,
    handleDepartmentChange,
    resetFilters,
  };
}
