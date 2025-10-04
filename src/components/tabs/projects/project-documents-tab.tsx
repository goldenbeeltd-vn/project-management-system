"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockDocumentFolders } from "@/lib/mock-data";
import { CornerUpLeft, Folder, Upload } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { DocumentFolderCard } from "@/components/cards/projects/document-folder-card";
import { DocumentFileCard } from "@/components/cards/projects/document-file-card";
import { AddFolderModal } from "@/components/modals/projects/add-folder-modal";
import { AddDocumentModal } from "@/components/modals/projects/add-document-modal";

export function ProjectDocumentsTab() {
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid");
  const [folders, setFolders] = useState(mockDocumentFolders);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<
    (typeof mockDocumentFolders)[0] | null
  >(null);
  const [showFiles, setShowFiles] = useState(false);

  const handleAddFolder = (folderName: string) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      fileCount: 0,
      color: `bg-blue-${100 + Math.floor(Math.random() * 400)}`,
      lastModified: "Vừa tạo",
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleAddDocument = (documentData: {
    name: string;
    description: string;
    folder: string;
    files: File[];
  }) => {
    // Tìm folder và cập nhật số lượng file
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === documentData.folder
          ? {
              ...folder,
              fileCount: folder.fileCount + documentData.files.length,
              lastModified: "Vừa cập nhật",
            }
          : folder,
      ),
    );

    // Ở đây bạn có thể thêm logic upload file thực tế
    console.log("Thêm tài liệu:", documentData);
  };

  const handleFolderClick = (folder: (typeof mockDocumentFolders)[0]) => {
    setSelectedFolder(folder);
    setShowFiles(true);
  };

  const handleBackToFolders = () => {
    setShowFiles(false);
    setSelectedFolder(null);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {showFiles && selectedFolder && (
            <Button variant="outline" size="sm" onClick={handleBackToFolders}>
              <CornerUpLeft className="size-4" />
            </Button>
          )}
          <h3 className="text-lg font-semibold">
            {showFiles && selectedFolder
              ? `${selectedFolder.name} (${selectedFolder.files?.length || 0} tệp)`
              : "Tài liệu dự án"}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Toggle viewMode={viewMode} onViewModeChange={setViewMode} />
          {!showFiles && (
            <Button
              variant="outline"
              onClick={() => setShowAddFolderModal(true)}
            >
              <Folder className="size-4 mr-2" />
              Thêm thư mục
            </Button>
          )}
          <Button onClick={() => setShowAddDocumentModal(true)}>
            <Upload className="size-4 mr-2" />
            {showFiles ? "Thêm tệp vào thư mục" : "Thêm tài liệu"}
          </Button>
        </div>
      </div>

      {/* Document Display */}
      {!showFiles ? (
        // Show folders
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <DocumentFolderCard
                key={folder.id}
                folder={folder}
                viewMode={viewMode}
                onClick={handleFolderClick}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {folders.map((folder) => (
              <DocumentFolderCard
                key={folder.id}
                folder={folder}
                viewMode={viewMode}
                onClick={handleFolderClick}
              />
            ))}
          </div>
        )
      ) : // Show files in selected folder
      selectedFolder &&
        selectedFolder.files &&
        selectedFolder.files.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedFolder.files.map((file) => (
              <DocumentFileCard key={file.id} file={file} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {selectedFolder.files.map((file) => (
              <DocumentFileCard key={file.id} file={file} viewMode={viewMode} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Folder className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Thư mục trống
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Thư mục này chưa có tệp nào. Hãy thêm tệp mới.
          </p>
          <div className="mt-6">
            <Button onClick={() => setShowAddDocumentModal(true)}>
              <Upload className="size-4 mr-2" />
              Thêm tệp đầu tiên
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddFolderModal
        open={showAddFolderModal}
        onOpenChange={setShowAddFolderModal}
        onAddFolder={handleAddFolder}
      />

      <AddDocumentModal
        open={showAddDocumentModal}
        onOpenChange={setShowAddDocumentModal}
        onAddDocument={handleAddDocument}
        folders={folders.map((folder) => ({
          id: folder.id,
          name: folder.name,
        }))}
        preSelectedFolder={
          showFiles && selectedFolder ? selectedFolder.id : undefined
        }
      />
    </div>
  );
}
