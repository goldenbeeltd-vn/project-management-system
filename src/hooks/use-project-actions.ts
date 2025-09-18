import { useCallback } from "react";
import { type Project } from "@/lib/mock-data";

export function useProjectActions() {
  const handleViewProject = useCallback(
    (project: Project, onView?: (project: Project) => void) => {
      if (onView) {
        onView(project);
      }
      // Có thể thêm analytics tracking ở đây
      console.log(`Viewing project: ${project.name}`);
    },
    []
  );

  const handleEditProject = useCallback(
    (project: Project, onEdit?: (project: Project) => void) => {
      if (onEdit) {
        onEdit(project);
      }
      // Có thể thêm analytics tracking ở đây
      console.log(`Editing project: ${project.name}`);
    },
    []
  );

  const handleDeleteProject = useCallback(
    (project: Project, onDelete?: (project: Project) => void) => {
      if (onDelete) {
        onDelete(project);
      }
      // Có thể thêm analytics tracking ở đây
      console.log(`Deleting project: ${project.name}`);
    },
    []
  );

  return {
    handleViewProject,
    handleEditProject,
    handleDeleteProject,
  };
}
