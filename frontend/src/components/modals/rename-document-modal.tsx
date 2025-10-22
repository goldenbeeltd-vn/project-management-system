import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IDocument } from "@/types/document";
import { useState, useEffect } from "react";

interface RenameDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: IDocument | null;
  onSubmit: (newName: string) => void;
}

export function RenameDocumentModal({
  open,
  onOpenChange,
  document,
  onSubmit,
}: RenameDocumentModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (document && open) {
      setName(document.name);
    }
  }, [document, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Đổi tên {document?.type === "folder" ? "thư mục" : "tệp"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên mới
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder={`Nhập tên ${document?.type === "folder" ? "thư mục" : "tệp"} mới`}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Đổi tên
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
