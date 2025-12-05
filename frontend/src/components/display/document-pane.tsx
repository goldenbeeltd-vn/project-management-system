import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { File, Folder, X } from "lucide-react";
import { IDocument } from "@/types/document";
import { formatDate } from "@/lib/formatter";
import { useEffect, useState } from "react";

interface DetailsPanelProps {
  item: IDocument;
  onClose: () => void;
  isVisible: boolean;
}

export function DocumentDetailsPanel({
  item,
  onClose,
  isVisible,
}: DetailsPanelProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    // Delay the actual close to allow animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`p-4 w-[30%] bg-white rounded-lg shadow-xl border border-gray-200 
        transition-all duration-300 ease-out transform-gpu
        ${
          isAnimating
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }`}
    >
      <div
        className={`flex items-center justify-between mb-6 
        transition-opacity duration-500 delay-100 ease-out
        ${isAnimating ? "opacity-100" : "opacity-0"}`}
      >
        <h2 className="text-lg font-semibold text-gray-900">Chi tiết</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 rounded-md"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={`space-y-6 
        transition-opacity duration-500 delay-200 ease-out
        ${isAnimating ? "opacity-100" : "opacity-0"}`}
      >
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
