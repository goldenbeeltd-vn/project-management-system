import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { type Project } from "@/lib/mock-data";

export function useProjectActions() {
  const router = useRouter();

  const handleViewProject = useCallback(
    (project: Project, options?: { showModal?: boolean }) => {
      if (options?.showModal) {
        // Return project data to show in modal - caller will handle modal state
        console.log(`Viewing project in modal: ${project.name}`);
        return project;
      } else {
        // Navigate to project detail page
        router.push(`/projects/${project.id}`);
        console.log(`Navigating to project: ${project.name}`);
      }
    },
    [router],
  );

  const handleEditProject = useCallback(
    (project: Project, onEdit?: (project: Project) => void) => {
      if (onEdit) {
        onEdit(project);
      }
      // Có thể thêm analytics tracking ở đây
      console.log(`Editing project: ${project.name}`);
    },
    [],
  );

  const handleDeleteProject = useCallback(
    (project: Project, onDelete?: (project: Project) => void) => {
      if (onDelete) {
        onDelete(project);
      }
      // Có thể thêm analytics tracking ở đây
      console.log(`Deleting project: ${project.name}`);
    },
    [],
  );

  return {
    handleViewProject,
    handleEditProject,
    handleDeleteProject,
  };
}
