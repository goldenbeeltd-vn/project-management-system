"use client";

import { ProjectDetailView } from "@/components/display/projects/project-detail-view";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectById } from "@/hooks/projects/use-project-by-id";
import { AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { project, isLoading, error } = useProjectById(projectId);

  if (isLoading) {
    return (
      <>
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>
            {error || "Không tìm thấy dự án với ID này."}
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <ProjectDetailView project={project} />
    </>
  );
}
