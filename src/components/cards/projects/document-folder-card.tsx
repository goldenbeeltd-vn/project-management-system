import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreVertical, Download, Edit, Trash2 } from "lucide-react";

interface DocumentFolder {
  id: string;
  name: string;
  fileCount: number;
  color: string;
  lastModified: string;
}

interface DocumentFolderCardProps {
  folder: DocumentFolder;
  viewMode: "grid" | "row";
  onClick?: (folder: DocumentFolder) => void;
}

export function DocumentFolderCard({
  folder,
  viewMode,
  onClick,
}: DocumentFolderCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (
      e.target !== e.currentTarget &&
      (e.target as Element).closest('[role="button"]')
    ) {
      return;
    }
    onClick?.(folder);
  };
  if (viewMode === "grid") {
    return (
      <div
        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${folder.color} rounded-lg flex items-center justify-center`}
            >
              <FileText className="w-5 h-5 text-current" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{folder.name}</h4>
              <p className="text-xs text-gray-500">{folder.fileCount} tệp</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="size-4 mr-2" />
                Tải xuống
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="size-4 mr-2" />
                Đổi tên
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="size-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-xs text-gray-500">
          Cập nhật: {folder.lastModified}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3 flex-1">
        <div
          className={`w-8 h-8 ${folder.color} rounded-md flex items-center justify-center`}
        >
          <FileText className="w-4 h-4 text-current" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{folder.name}</h4>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{folder.fileCount} tệp</span>
            <span>Cập nhật: {folder.lastModified}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="text-xs">
          {folder.fileCount} tệp
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Tải xuống
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="size-4 mr-2" />
              Đổi tên
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="size-4 mr-2" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
