"use client";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "../cards/project-card";
import { ProjectTable } from "../tables/project-table";
import { type Project } from "@/lib/mock-data";
import { Search } from "lucide-react";

interface ProjectsDisplayProps {
  projects: Project[];
  viewMode: "grid" | "row";
  onProjectSelect: (project: Project) => void;
  clearFilters: () => void;
}

export function ProjectsDisplay({
  projects,
  viewMode,
  onProjectSelect,
  clearFilters,
}: ProjectsDisplayProps) {
  // Empty State
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          Không tìm thấy dự án
        </h3>
        <p className="text-slate-500 mb-4">
          Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
        </p>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="border-slate-200"
        >
          Xóa bộ lọc
        </Button>
      </div>
    );
  }

  // Projects Display
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectSelect(project)}
          />
        ))}
      </div>
    );
  }

  return <ProjectTable projects={projects} onProjectClick={onProjectSelect} />;
}
