"use client";

import { useState } from "react";
import { type Project } from "@/types/projects/project";

export function useProjectDetail(project: Project) {
  const [currentProject, setCurrentProject] = useState<Project>(project);

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing project:", currentProject.name);
    // In a real app, this might open a share modal or copy link to clipboard
  };

  const handleEdit = () => {
    // Implement edit functionality
    console.log("Editing project:", currentProject.name);
    // In a real app, this might navigate to edit page or open edit modal
  };

  const handleArchive = () => {
    // Implement archive functionality
    console.log("Archiving project:", currentProject.name);
    // In a real app, this might show confirmation dialog and update project status
  };

  const handleAddFolder = () => {
    // Implement add folder functionality
    console.log("Adding folder to project:", currentProject.name);
    // In a real app, this might open a modal to create new folder
  };

  const handleAddDocument = () => {
    // Implement add document functionality
    console.log("Adding document to project:", currentProject.name);
    // In a real app, this might open file picker or upload modal
  };

  const updateProject = (updates: Partial<Project>) => {
    setCurrentProject((prev) => ({ ...prev, ...updates }));
  };

  return {
    project: currentProject,
    updateProject,
    handlers: {
      onShare: handleShare,
      onEdit: handleEdit,
      onArchive: handleArchive,
      onAddFolder: handleAddFolder,
      onAddDocument: handleAddDocument,
    },
  };
}
