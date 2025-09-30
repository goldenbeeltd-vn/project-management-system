"use client";

import { ProjectsDisplay } from "@/components/display/projects-display";
import { ProjectFilters } from "@/components/filters/project-filters";
import { ProjectDetailModal } from "@/components/modals/project-detail-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import {
  useProjectFilters,
  useProjectSelection,
} from "@/hooks/use-project-filters";
import { Project } from "@/types/common";

export default function ProjectsPage() {
  const {
    isOpen: isDetailModalOpen,
    openModal,
    closeModal,
  } = useModal<Project>();

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredProjects,
    clearFilters,
  } = useProjectFilters();

  const { selectedProject, setSelectedProject } = useProjectSelection();

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    openModal(project);
  };

  return (
    <>
      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ProjectsDisplay
        projects={filteredProjects}
        viewMode={viewMode}
        onProjectSelect={handleProjectSelect}
        clearFilters={clearFilters}
      />

      {/* Project Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={() => closeModal()}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <ProjectDetailModal project={selectedProject} />
        </DialogContent>
      </Dialog>
    </>
  );
}
