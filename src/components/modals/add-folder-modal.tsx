import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder } from "lucide-react";
import { useState } from "react";

interface AddFolderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
}

export function AddFolderModal({
  open,
  onOpenChange,
  onSubmit,
}: AddFolderModalProps) {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!folderName.trim()) {
      setError("Tên thư mục không được để trống");
      return;
    }
    onSubmit(folderName);
    handleClose();
  };

  const handleClose = () => {
    setFolderName("");
    setError("");
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-blue-500" />
            Tạo thư mục mới
          </DialogTitle>
          <DialogDescription>
            Nhập tên cho thư mục mới của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Tên thư mục</Label>
            <Input
              id="folder-name"
              placeholder="Nhập tên thư mục..."
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Tạo thư mục
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
