"use client";

import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FileUploadProgress from "./file-upload-progress";

type FileUploadBoxProps = {
  label: string;
  accept?: string;
  value?: File[];
  onChange: (files: File[]) => void;
};

type FileStatus = "uploading" | "success" | "error";

interface UploadFile {
  id: number;
  name: string;
  size: string | null;
  progress: number;
  status: FileStatus;
  file: File;
}

const FileUploadBox = ({
  label,
  accept,
  value = [],
  onChange,
}: FileUploadBoxProps) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  // Khởi tạo ban đầu từ value props (chỉ chạy một lần khi mount hoặc khi value thay đổi từ bên ngoài)
  useEffect(() => {
    if (!initializedRef.current && value && value.length > 0) {
      const files: UploadFile[] = value.map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        progress: 100,
        status: "success",
        file: file,
      }));
      setUploadFiles(files);
      initializedRef.current = true;
    }
  }, [value]);

  // Khi danh sách file thực tế thay đổi, gọi onChange để cập nhật cho form
  useEffect(() => {
    // Chỉ lấy các file thực tế từ uploadFiles
    const files = uploadFiles.map((item) => item.file);
    // Tránh gọi onChange khi khởi tạo ban đầu
    if (initializedRef.current) {
      onChange(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFiles]);

  // Xử lý việc xóa file
  const handleRemoveFile = (fileId: number) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return;

    const newUploadFiles: UploadFile[] = files.map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
      status: "uploading",
      file: file,
    }));

    setUploadFiles((prev) => [...prev, ...newUploadFiles]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // Tiến trình upload giả - tăng progress và chuyển trạng thái thành success khi đạt 100%
  useEffect(() => {
    const filesInProgress = uploadFiles.filter(
      (f) => f.progress < 100 && f.status === "uploading",
    );
    if (filesInProgress.length === 0) return;

    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.status === "uploading" && file.progress < 100) {
            const newProgress = Math.min(file.progress + 10, 100);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? "success" : "uploading",
            };
          }
          return file;
        }),
      );
    }, 500);

    return () => clearInterval(interval);
  }, [uploadFiles]);

  return (
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`file-${label}`}
          multiple
        />
        <label
          htmlFor={`file-${label}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
        >
          <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" />
          <span className="text-sm text-gray-600 group-hover:text-blue-600 font-medium">
            Nhấn hoặc kéo thả file vào đây
          </span>
          <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG</span>
        </label>
      </div>
      {/* Hiển thị tiến trình upload */}
      {uploadFiles.length > 0 && (
        <div className="mt-4">
          <FileUploadProgress
            files={uploadFiles}
            setFiles={setUploadFiles}
            onRemove={handleRemoveFile}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadBox;
