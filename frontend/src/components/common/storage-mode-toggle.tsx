"use client";

import { Button } from "@/components/ui/button";
import { useGoogleDrive } from "@/providers/GoogleDriveProvider";
import {
  setStorageMode,
  getStorageMode,
  type StorageMode,
} from "@/services/document.service";
import { HardDrive, Cloud } from "lucide-react";
import { useState, useEffect } from "react";

export function StorageModeToggle() {
  const { isSignedIn } = useGoogleDrive();
  const [currentMode, setCurrentMode] = useState<StorageMode>("local");

  useEffect(() => {
    setCurrentMode(getStorageMode());
  }, []);

  const handleModeChange = (mode: StorageMode) => {
    if (mode === "google-drive" && !isSignedIn) {
      alert("Vui lòng đăng nhập Google Drive trước!");
      return;
    }

    setStorageMode(mode);
    setCurrentMode(mode);

    // Emit custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("storage-mode-changed", {
        detail: { mode },
      }),
    );

    console.log(`Storage mode changed to: ${mode}`);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
      <span className="text-sm font-medium text-gray-600">Lưu trữ:</span>

      <Button
        variant={currentMode === "local" ? "default" : "outline"}
        size="sm"
        onClick={() => handleModeChange("local")}
        className="flex items-center space-x-2"
      >
        <HardDrive className="w-4 h-4" />
        <span>Local</span>
      </Button>

      <Button
        variant={currentMode === "google-drive" ? "default" : "outline"}
        size="sm"
        onClick={() => handleModeChange("google-drive")}
        disabled={!isSignedIn}
        className="flex items-center space-x-2"
        title={!isSignedIn ? "Cần đăng nhập Google Drive" : ""}
      >
        <Cloud className="w-4 h-4" />
        <span>Google Drive</span>
      </Button>
    </div>
  );
}
