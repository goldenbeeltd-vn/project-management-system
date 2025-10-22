"use client";

import { DocumentGridView } from "@/components/display/document-grid";
import { DocumentDetailsPanel } from "@/components/display/document-pane";
import DocumentToolbar from "@/components/display/document-toolbar";
import { AddFolderModal } from "@/components/modals/add-folder-modal";
import { RenameDocumentModal } from "@/components/modals/rename-document-modal";
import { DocumentTableView } from "@/components/tables/document-table";
import { IDocument } from "@/types/document";
import { DocumentService } from "@/services/document.service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DocumentPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<IDocument | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "row">("row");
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [documentToRename, setDocumentToRename] = useState<IDocument | null>(
    null
  );
  const [items, setItems] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Load documents from API
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        const documents = await DocumentService.getDocuments(
          undefined,
          searchTerm || undefined
        );
        setItems(documents);
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [searchTerm]);

  const handleShowDetails = (item: IDocument) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleAddFolder = async (folderName: string) => {
    try {
      const newFolder = await DocumentService.createFolder(folderName);
      const folderDoc: IDocument = {
        id: newFolder.id,
        type: newFolder.type,
        name: newFolder.name,
        updatedAt: new Date(newFolder.updatedAt).toISOString().split("T")[0],
        user: {
          name: newFolder.createdBy.name,
          avatar: newFolder.createdBy.avatar,
        },
      };
      setItems([folderDoc, ...items]);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleDelete = (deletedItem: IDocument) => {
    setItems(items.filter((item) => item.id !== deletedItem.id));
  };

  const handleRename = (document: IDocument) => {
    setDocumentToRename(document);
    setShowRenameModal(true);
  };

  const handleRenameSubmit = async (newName: string) => {
    if (!documentToRename?.id) return;

    try {
      await DocumentService.updateDocument(documentToRename.id, {
        name: newName,
      });
      setItems(
        items.map((item) =>
          item.id === documentToRename.id ? { ...item, name: newName } : item
        )
      );
    } catch (error) {
      console.error("Failed to rename document:", error);
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <div className={`${showDetails ? "w-[70%]" : "w-full"}`}>
          <div className="space-y-4">
            <DocumentToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onAddFolder={() => setShowAddFolderModal(true)}
              onUploadFile={() => router.push("/document/upload")}
            />

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Đang tải...</div>
              </div>
            ) : viewMode === "grid" ? (
              <DocumentGridView
                items={items}
                onShowDetails={handleShowDetails}
                onDelete={handleDelete}
                onRename={handleRename}
              />
            ) : (
              <DocumentTableView
                items={items}
                onShowDetails={handleShowDetails}
                onDelete={handleDelete}
                onRename={handleRename}
              />
            )}
          </div>
        </div>

        {showDetails && selectedItem && (
          <DocumentDetailsPanel
            item={selectedItem}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>

      <AddFolderModal
        open={showAddFolderModal}
        onOpenChange={setShowAddFolderModal}
        onSubmit={handleAddFolder}
      />

      <RenameDocumentModal
        open={showRenameModal}
        onOpenChange={setShowRenameModal}
        document={documentToRename}
        onSubmit={handleRenameSubmit}
      />
    </>
  );
}
