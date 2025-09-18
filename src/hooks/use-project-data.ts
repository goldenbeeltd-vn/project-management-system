import { useMemo } from "react";
import { getClientById, type Project } from "@/lib/mock-data";

export function useProjectData(project: Project) {
  const client = useMemo(() => {
    return getClientById(project.clientId);
  }, [project.clientId]);

  const allTeamMembers = useMemo(() => {
    return [
      ...project.team.frontend,
      ...project.team.backend,
      ...project.team.qc,
    ];
  }, [project.team.frontend, project.team.backend, project.team.qc]);

  const teamDisplayMembers = useMemo(() => {
    return allTeamMembers.slice(0, 3);
  }, [allTeamMembers]);

  const extraMembersCount = useMemo(() => {
    return Math.max(0, allTeamMembers.length - 3);
  }, [allTeamMembers.length]);

  const hasHostingInfo = useMemo(() => {
    return project.status === "completed" && project.hosting;
  }, [project.status, project.hosting]);

  return {
    client,
    allTeamMembers,
    teamDisplayMembers,
    extraMembersCount,
    hasHostingInfo,
  };
}
