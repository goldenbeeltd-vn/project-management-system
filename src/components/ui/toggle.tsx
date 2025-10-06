import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

interface ToggleProps {
  viewMode: "grid" | "row";
  onViewModeChange: (mode: "grid" | "row") => void;
}

export function Toggle({ viewMode, onViewModeChange }: ToggleProps) {
  return (
    <div className="flex items-center border border-slate-200 rounded-md">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="rounded-r-none border-r border-slate-200"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === "row" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("row")}
        className="rounded-l-none"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  );
}
