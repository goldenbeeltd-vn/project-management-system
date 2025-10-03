"use client";

import { useState } from "react";

export function useViewMode(initialMode: "grid" | "row" = "grid") {
  const [viewMode, setViewMode] = useState<"grid" | "row">(initialMode);

  const handleViewModeChange = (mode: "grid" | "row") => {
    setViewMode(mode);
  };

  return {
    viewMode,
    setViewMode: handleViewModeChange,
  };
}
