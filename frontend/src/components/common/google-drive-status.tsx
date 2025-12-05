"use client";

import { Button } from "@/components/ui/button";
import { useGoogleDrive } from "@/providers/GoogleDriveProvider";
import { Cloud, CloudOff, Loader2, LogIn, LogOut } from "lucide-react";

export function GoogleDriveStatus() {
  const { isSignedIn, isLoading, signIn, signOut } = useGoogleDrive();

  const handleToggleAuth = async () => {
    try {
      if (isSignedIn) {
        await signOut();
      } else {
        await signIn();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Đang kết nối Google Drive...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full bg-slate-50 p-3 rounded-lg border">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {isSignedIn ? (
            <>
              <Cloud className="w-5 h-5 text-green-500" />
              <div>
                <span className="text-sm text-green-600 font-medium block">
                  Đã kết nối Google Drive
                </span>
                <span className="text-xs text-gray-500">
                  Tất cả tài liệu được lưu trên Google Drive
                </span>
              </div>
            </>
          ) : (
            <>
              <CloudOff className="w-5 h-5 text-red-400" />
              <div>
                <span className="text-sm text-red-600 font-medium block">
                  Chưa kết nối Google Drive
                </span>
                <span className="text-xs text-gray-500">
                  Vui lòng đăng nhập để sử dụng tính năng quản lý tài liệu
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <Button
        variant={isSignedIn ? "outline" : "default"}
        size="sm"
        onClick={handleToggleAuth}
        className="flex items-center space-x-2"
      >
        {isSignedIn ? (
          <>
            <LogOut className="w-4 h-4" />
            <span>Ngắt kết nối</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            <span>Kết nối Google Drive</span>
          </>
        )}
      </Button>
    </div>
  );
}
