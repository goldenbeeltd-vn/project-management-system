"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Layout } from "@/components/layout/layout";
import { ProjectFilters } from "@/components/filters/project-filters";
import { ProjectsDisplay } from "@/components/display/projects-display";
import { ProjectDetailModal } from "@/components/modals/project-detail-modal";
import {
  useProjectFilters,
  useProjectSelection,
} from "@/hooks/use-project-filters";
import { useModal } from "@/hooks/use-modal";
import { type Project } from "@/lib/mock-data";

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
    <Layout>
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
    </Layout>
  );
}
