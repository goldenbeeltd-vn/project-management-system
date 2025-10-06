"use client";

import { useState, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, X } from "lucide-react";

interface AddDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDocument: (documentData: {
    name: string;
    description: string;
    folder: string;
    files: File[];
  }) => void;
  folders: { id: string; name: string }[];
  preSelectedFolder?: string;
}

export function AddDocumentModal({
  open,
  onOpenChange,
  onAddDocument,
  folders,
  preSelectedFolder,
}: AddDocumentModalProps) {
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(preSelectedFolder || "");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentName.trim() && selectedFolder && selectedFiles.length > 0) {
      onAddDocument({
        name: documentName.trim(),
        description: description.trim(),
        folder: selectedFolder,
        files: selectedFiles,
      });
      resetForm();
      onOpenChange(false);
    }
  };

  const resetForm = () => {
    setDocumentName("");
    setDescription("");
    setSelectedFolder("");
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Thêm tài liệu mới
          </DialogTitle>
          <DialogDescription>
            Tải lên và tổ chức tài liệu cho dự án của bạn.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="document-name">Tên tài liệu</Label>
              <Input
                id="document-name"
                placeholder="Nhập tên tài liệu..."
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả (tùy chọn)</Label>
              <Textarea
                id="description"
                placeholder="Mô tả ngắn về tài liệu..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="folder">Thư mục</Label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thư mục..." />
                </SelectTrigger>
                <SelectContent>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Tệp tin</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Nhấp để chọn tệp hoặc kéo thả vào đây
                  </p>
                  <p className="text-xs text-gray-400">
                    Hỗ trợ nhiều định dạng: PDF, DOC, XLS, PPT, hình ảnh...
                  </p>
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Tệp đã chọn ({selectedFiles.length})</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={
                !documentName.trim() ||
                !selectedFolder ||
                selectedFiles.length === 0
              }
            >
              Thêm tài liệu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
