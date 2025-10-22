import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, FileUp, FileX, RotateCw, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type FileStatus = "uploading" | "success" | "error";

export interface UploadFile {
  id: number;
  name: string;
  size: string | null;
  progress: number;
  status: FileStatus;
  file: File;
}

interface FileUploadProgressProps {
  files: UploadFile[];
  setFiles: Dispatch<SetStateAction<UploadFile[]>>;
  onRemove: (fileId: number) => void;
}

const FileUploadProgress = ({
  files,
  setFiles,
  onRemove,
}: FileUploadProgressProps) => {
  const getStatusColor = (status: FileStatus): string => {
    switch (status) {
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      case "uploading":
        return "bg-blue-100";
      default:
        return "bg-gray-300";
    }
  };

  const getIcon = (status: FileStatus) => {
    if (status === "success") {
      return <Check className="size-5 text-green-600" />;
    } else if (status === "error") {
      return <FileX className="size-5 text-red-600" />;
    }
    return <FileUp className="size-5 text-blue-600" />;
  };

  const handleRetry = (id: number) => {
    setFiles(
      files.map((file) =>
        file.id === id ? { ...file, status: "uploading", progress: 0 } : file,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
    onRemove(id);
  };

  return (
    <div className="w-full">
      <div className="bg-white overflow-hidden">
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="px-4 py-3 rounded-2xl border border-gray-200"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`p-2 flex justify-center items-center rounded-full ${getStatusColor(file.status)}`}
                >
                  {getIcon(file.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* File name */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </h3>
                    {/* Delete button */}
                    <Button
                      variant={"ghost"}
                      onClick={() => handleDelete(file.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors size-8 rounded-full"
                      aria-label="Delete file"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-2">
                    <Progress
                      value={file.progress}
                      className={`h-1.5 ${
                        file.status === "success"
                          ? "[&>div]:bg-green-500"
                          : file.status === "error"
                            ? "[&>div]:bg-red-500"
                            : "[&>div]:bg-blue-600"
                      }`}
                    />
                  </div>

                  {/* Status text */}
                  <div className="flex items-center justify-between text-xs">
                    {file.status === "uploading" && (
                      <>
                        <span className="text-gray-500">{file.size}</span>
                        <span className="text-gray-900 font-medium">
                          {file.progress}%
                        </span>
                      </>
                    )}
                    {file.status === "success" && (
                      <>
                        <span className="text-green-600 font-medium">
                          Upload Successful!
                        </span>
                        <span className="text-green-600 font-medium">100%</span>
                      </>
                    )}
                    {file.status === "error" && (
                      <>
                        <span className="text-red-600">
                          Upload failed! Please try again.
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 h-auto p-0 font-medium"
                          onClick={() => handleRetry(file.id)}
                        >
                          <RotateCw className="w-3 h-3 mr-1" />
                          Try Again
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploadProgress;
