import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderPlus, Grid3X3, List, Paperclip, Search } from "lucide-react";
interface DocumentToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "row";
  onViewModeChange: (mode: "grid" | "row") => void;
  onAddFolder: () => void;
  onUploadFile: () => void;
}
const DocumentToolbar = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddFolder,
  onUploadFile,
}: DocumentToolbarProps) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          className="pl-8 sm:w-[300px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-3">
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
        <Button className="flex items-center space-x-2" onClick={onAddFolder}>
          <FolderPlus className="w-4 h-4" />
          <span>Thêm thư mục</span>
        </Button>
        <Button className="flex items-center space-x-2" onClick={onUploadFile}>
          <Paperclip className="w-4 h-4" />
          <span>Tải tệp lên</span>
        </Button>
      </div>
    </div>
  );
};

export default DocumentToolbar;
