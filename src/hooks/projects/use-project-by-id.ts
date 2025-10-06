import { useState, useEffect } from "react";
import { getProjectById, type Project } from "@/lib/mock-data";

export function useProjectById(projectId: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundProject = getProjectById(projectId);

        if (!foundProject) {
          setError(`Không tìm thấy dự án với ID: ${projectId}`);
          setProject(null);
        } else {
          setProject(foundProject);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định",
        );
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  return {
    project,
    isLoading,
    error,
  };
}
