"use client";

import { useState, useEffect } from "react";
import { type DocumentFolder } from "@/types/projects/project";
import { mockDocumentFolders } from "@/lib/mock-data";

export function useDocumentFolders(projectId?: string) {
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFolders = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call with projectId
        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
        setFolders(mockDocumentFolders);
        setError(null);
      } catch (err) {
        setError("Failed to load document folders");
        console.error("Error loading document folders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFolders();
  }, [projectId]);

  const addFolder = (folderName: string) => {
    const newFolder: DocumentFolder = {
      id: Date.now().toString(),
      name: folderName,
      fileCount: 0,
      color: "bg-slate-100 text-slate-600",
      lastModified: "Vừa tạo",
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const deleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  const updateFolder = (folderId: string, updates: Partial<DocumentFolder>) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, ...updates } : folder,
      ),
    );
  };

  return {
    folders,
    loading,
    error,
    addFolder,
    deleteFolder,
    updateFolder,
  };
}
