"use client";

"use client";

import { Layout } from "@/components/layout/layout";
import { ProjectFilters } from "@/components/filters/projects/project-filters";
import { ProjectsDisplay } from "@/components/display/projects/projects-display";
import { useProjectFilters } from "@/hooks/projects/use-project-filters";

export default function ProjectsPage() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredProjects,
    clearFilters,
  } = useProjectFilters();

  return (
    <Layout>
      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ProjectsDisplay
        projects={filteredProjects}
        viewMode={viewMode}
        clearFilters={clearFilters}
      />
    </Layout>
  );
}
