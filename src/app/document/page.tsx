"use client";

import { DocumentGridView } from "@/components/display/document-grid";
import { DocumentDetailsPanel } from "@/components/display/document-pane";
import DocumentToolbar from "@/components/display/document-toolbar";
import { Layout } from "@/components/layout/layout";
import { AddFolderModal } from "@/components/modals/add-folder-modal";
import { DocumentTableView } from "@/components/tables/document-table";
import { IDocument } from "@/types/document";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DocumentPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<IDocument | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "row">("row");
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [items, setItems] = useState<IDocument[]>([
    {
      type: "folder",
      name: "Documents",
      updatedAt: "2025-09-29",
      user: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      type: "folder",
      name: "Images",
      updatedAt: "2025-09-28",
      user: {
        name: "Jane Smith",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      type: "file",
      name: "report.pdf",
      updatedAt: "2025-09-27",
      size: "2.5MB",
      user: {
        name: "Mike Johnson",
        avatar: "https://github.com/shadcn.png",
      },
    },
  ]);

  const handleShowDetails = (item: IDocument) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleAddFolder = (folderName: string) => {
    const newFolder: IDocument = {
      type: "folder",
      name: folderName,
      updatedAt: new Date().toISOString().split("T")[0],
      user: {
        name: "Current User",
        avatar: "https://github.com/shadcn.png",
      },
    };
    setItems([newFolder, ...items]);
  };

  return (
    <Layout>
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

            {viewMode === "grid" ? (
              <DocumentGridView
                items={items}
                onShowDetails={handleShowDetails}
              />
            ) : (
              <DocumentTableView
                items={items}
                onShowDetails={handleShowDetails}
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
    </Layout>
  );
}
