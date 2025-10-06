import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  File,
  Image,
  FileSpreadsheet,
  MoreVertical,
  Download,
  Edit,
  Trash2,
  Eye,
  Share,
} from "lucide-react";
import { DocumentFile } from "@/lib/mock-data";

interface DocumentFileCardProps {
  file: DocumentFile;
  viewMode: "grid" | "row";
}

const getFileIcon = (fileType: string) => {
  if (fileType.includes("pdf")) return FileText;
  if (fileType.includes("image")) return Image;
  if (fileType.includes("spreadsheet") || fileType.includes("excel"))
    return FileSpreadsheet;
  if (fileType.includes("word") || fileType.includes("document"))
    return FileText;
  return File;
};

const getFileTypeColor = (fileType: string) => {
  if (fileType.includes("pdf")) return "text-red-600";
  if (fileType.includes("image")) return "text-green-600";
  if (fileType.includes("spreadsheet") || fileType.includes("excel"))
    return "text-green-700";
  if (fileType.includes("word") || fileType.includes("document"))
    return "text-blue-600";
  return "text-gray-600";
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export function DocumentFileCard({ file, viewMode }: DocumentFileCardProps) {
  const FileIcon = getFileIcon(file.type);
  const iconColor = getFileTypeColor(file.type);

  if (viewMode === "grid") {
    return (
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <FileIcon className={`w-10 h-10 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate" title={file.name}>
                {file.name}
              </h4>
              <div className="mt-1">
                <span className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />
                Xem trước
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="size-4 mr-2" />
                Tải xuống
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="size-4 mr-2" />
                Chia sẻ
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
        <div className="flex items-center justify-between text-xs text-gray-500">
          Tải lên: {new Date(file.uploadDate).toLocaleDateString("vi-VN")}
          <span className="text-xs text-gray-500">{file.uploadedBy}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="flex-shrink-0">
          <FileIcon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate" title={file.name}>
            {file.name}
          </h4>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{formatFileSize(file.size)}</span>
            <span>
              Tải lên: {new Date(file.uploadDate).toLocaleDateString("vi-VN")}
            </span>
            <span>Bởi: {file.uploadedBy}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="text-xs">
          {file.type.split("/").pop()?.toUpperCase()}
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
              <Eye className="size-4 mr-2" />
              Xem trước
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Tải xuống
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="size-4 mr-2" />
              Chia sẻ
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
