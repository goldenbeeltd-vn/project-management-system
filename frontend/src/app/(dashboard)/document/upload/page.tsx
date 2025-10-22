"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DocumentService } from "@/services/document.service";
import { Check, ChevronLeft, FileText, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      name: string;
      size: number;
      uploadedAt: string;
    }>
  >([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    const newProgress = { ...progress };
    delete newProgress[fileToRemove.name];
    setProgress(newProgress);
  };

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      const uploadedFilesData: Array<{
        name: string;
        size: number;
        uploadedAt: string;
      }> = [];

      // Upload files one by one
      for (const file of files) {
        // Start progress
        setProgress((prev) => ({ ...prev, [file.name]: 0 }));

        try {
          // Upload file using API
          const result = await DocumentService.uploadFile(
            file,
            folderId || undefined
          );

          // Update progress to 100%
          setProgress((prev) => ({ ...prev, [file.name]: 100 }));

          uploadedFilesData.push({
            name: result.name,
            size: file.size,
            uploadedAt: result.createdAt,
          });
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          // You might want to show individual file errors
        }
      }

      setUploadedFiles(uploadedFilesData);
      setIsUploading(false);
      setFiles([]);
      setProgress({});
      setUploadComplete(true);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <Link href={folderId ? `/document/${folderId}` : "/document"}>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          Tải tệp lên {folderId ? "folder này" : ""}
        </h1>
      </div>

      {!uploadComplete ? (
        <>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-12 mt-6
              ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary hover:bg-gray-50"
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">
                {isDragActive ? "Thả tệp vào đây" : "Kéo thả tệp vào đây"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">hoặc</p>
              <Button type="button" disabled={isDragActive}>
                Chọn tệp từ máy tính
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Tải lên file</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFiles([]);
                    setProgress({});
                  }}
                  disabled={isUploading}
                >
                  Xóa tất cả
                </Button>
              </div>

              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium truncate">
                          {file.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file)}
                        disabled={isUploading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Progress value={progress[file.name] || 0} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFiles([]);
                    setProgress({});
                  }}
                  disabled={isUploading}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading || files.length === 0}
                >
                  {isUploading ? "Đang tải lên..." : "Tải lên"}
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>Tải lên thành công {uploadedFiles.length} tệp</span>
          </div>

          <div className="bg-white rounded-lg border divide-y">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {Math.round(file.size / 1024)} KB • Đã tải lên{" "}
                      {new Date(file.uploadedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setUploadComplete(false);
                setUploadedFiles([]);
              }}
            >
              Tải thêm tệp
            </Button>
            <Button
              onClick={() =>
                router.push(folderId ? `/document/${folderId}` : "/document")
              }
            >
              {folderId ? "Quay về folder" : "Quay về trang tài liệu"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
