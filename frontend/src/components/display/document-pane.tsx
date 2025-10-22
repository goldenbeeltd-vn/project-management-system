import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { File, Folder, X } from "lucide-react";
import { IDocument } from "@/types/document";
import { formatDate } from "@/lib/formatter";

interface DetailsPanelProps {
  item: IDocument;
  onClose: () => void;
}

export function DocumentDetailsPanel({ item, onClose }: DetailsPanelProps) {
  return (
    <div className="p-4 w-[30%] bg-white rounded-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Chi tiết</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          {item.type === "folder" ? (
            <Folder className="w-8 h-8 text-blue-500" />
          ) : (
            <File className="w-8 h-8 text-gray-500" />
          )}
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {item.type === "file" ? item.size : "Folder"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Người tạo</label>
            <div className="flex items-center space-x-2 mt-1">
              <Avatar>
                <AvatarImage src={item.user.avatar} />
              </Avatar>
              <span>{item.user.name}</span>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Ngày cập nhật</label>
            <p className="mt-1">{formatDate(item.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
