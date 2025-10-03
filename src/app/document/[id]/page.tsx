"use client";

import { DocumentGridView } from "@/components/display/document-grid";
import { DocumentDetailsPanel } from "@/components/display/document-pane";
import DocumentToolbar from "@/components/display/document-toolbar";
import { Layout } from "@/components/layout/layout";
import { AddFolderModal } from "@/components/modals/add-folder-modal";
import { DocumentTableView } from "@/components/tables/document-table";
import { Button } from "@/components/ui/button";
import { IDocument } from "@/types/document";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function FolderDetailPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "row">("row");
  const [selectedItem, setSelectedItem] = useState<IDocument | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // Convert items to state so we can update it
  const [items, setItems] = useState<IDocument[]>([
    {
      type: "file",
      name: "presentation.pptx",
      updatedAt: "2025-09-29",
      size: "5.2MB",
      user: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      type: "file",
      name: "report.pdf",
      updatedAt: "2025-09-28",
      size: "2.1MB",
      user: {
        name: "Jane Smith",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      type: "folder",
      name: "Project Assets",
      updatedAt: "2025-09-27",
      user: {
        name: "Admin",
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
    // TODO: Gọi API
    // await createFolder({ name: folderName, parentId: id });
  };

  const folderData = {
    id,
    name: "Documents",
  };

  return (
    <Layout>
      <div className="flex gap-3">
        <div className={`${showDetails ? "w-[70%]" : "w-full"}`}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Link href="/document">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trở lại</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">{folderData.name}</h1>
            </div>

            <DocumentToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onAddFolder={() => setShowAddFolderModal(true)}
              onUploadFile={() =>
                router.push("/document/upload?folderId=" + id)
              }
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
