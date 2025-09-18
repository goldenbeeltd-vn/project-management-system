"use client";

import { useState, useMemo } from "react";
import { mockProjects, type Project } from "@/lib/mock-data";

/**
 * Custom hook quản lý filters và search cho projects
 */
export const useProjectFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid");

  const filteredProjects = useMemo(() => {
    const filtered = mockProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
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
  }, [searchTerm, statusFilter, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
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
