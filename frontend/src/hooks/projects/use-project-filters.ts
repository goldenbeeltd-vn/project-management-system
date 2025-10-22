"use client";

import { useState, useMemo } from "react";
import { mockProjects, type Project } from "@/lib/mock-data";
import { ProjectCategory } from "@/types/projects/common";

/**
 * Custom hook quản lý filters và search cho projects
 */
export const useProjectFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">(
    "all",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid");

  const filteredProjects = useMemo(() => {
    const filtered = mockProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || project.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }, [searchTerm, statusFilter, categoryFilter, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortOrder("asc");
  };

  const toggleSortOrder = () => {
    setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredProjects,
    clearFilters,
  };
};

/**
 * Custom hook quản lý selection state cho projects
 */
export const useProjectSelection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return {
    selectedProject,
    setSelectedProject,
  };
};
