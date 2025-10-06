"use client";

import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  FileText,
  Settings,
  CheckSquare,
  Calendar,
  Archive,
  Edit,
  Share,
  CornerUpLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectDetailHeaderProps {
  onBack?: () => void;
}

export function ProjectDetailHeader({ onBack }: ProjectDetailHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <CornerUpLeft className="size-4" />
        </Button>
        <TabsList className="h-9">
          <TabsTrigger value="tasks" className="p-2">
            <CheckSquare className="size-4" />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="p-2">
            <Calendar className="size-4" />
            <span>Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="p-2">
            <FileText className="size-4" />
            <span>Tài liệu</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="p-2">
            <Users className="size-4" />
            <span>Nhân sự</span>
          </TabsTrigger>
          <TabsTrigger value="setting" className="p-2">
            <Settings className="size-4" />
            <span>Cài đặt</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Share className="size-4 mr-2" />
          Chia sẻ
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="size-4 mr-2" />
          Chỉnh sửa
        </Button>
        <Button variant="outline" size="sm">
          <Archive className="size-4 mr-2" />
          Lưu trữ
        </Button>
      </div>
    </div>
  );
}
