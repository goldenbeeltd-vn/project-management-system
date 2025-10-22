"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, MoreVertical, Edit, Trash2 } from "lucide-react";
import { User as UserType } from "@/lib/mock-data";

interface TeamMemberCardProps {
  member: UserType;
  viewMode: "grid" | "row";
  onClick?: (member: UserType) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function TeamMemberCard({
  member,
  viewMode,
  onClick,
}: TeamMemberCardProps) {
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [useCustomOvertimeRate, setUseCustomOvertimeRate] = useState(false);
  const [customOvertimeRate, setCustomOvertimeRate] = useState(
    member.salary?.overtimeRate || 0,
  );

  const handleClick = (e: React.MouseEvent) => {
    if (
      e.target !== e.currentTarget &&
      (e.target as Element).closest('[role="button"]')
    ) {
      return;
    }
    onClick?.(member);
  };

  const handleSaveOvertimeSettings = () => {
    console.log(`Updated overtime settings for ${member.name}:`, {
      useCustomRate: useCustomOvertimeRate,
      customRate: customOvertimeRate,
    });
    setIsManageDialogOpen(false);
  };

  if (viewMode === "grid") {
    return (
      <div
        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-blue-100 text-blue-800">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{member.name}</h4>
              <p className="text-xs text-gray-500">{member.department}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog
                open={isManageDialogOpen}
                onOpenChange={setIsManageDialogOpen}
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Settings className="size-4 mr-2" />
                    Cài đặt OT
                  </DropdownMenuItem>
                </DialogTrigger>
              </Dialog>
              <DropdownMenuItem>
                <Edit className="size-4 mr-2" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="size-4 mr-2" />
                Xóa khỏi dự án
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-xs text-gray-500">
          Vai trò: {member.position || member.role}
        </div>

        <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cài đặt OT - {member.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      Sử dụng lương OT cố định
                    </p>
                    <p className="text-xs text-gray-500">
                      Lấy từ thông tin nhân sự:{" "}
                      {formatCurrency(member.salary?.overtimeRate || 0)}/giờ
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="overtimeType"
                    checked={!useCustomOvertimeRate}
                    onChange={() => setUseCustomOvertimeRate(false)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      Lương OT đặc biệt cho dự án
                    </p>
                    <p className="text-xs text-gray-500">
                      Thiết lập riêng cho dự án này
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="overtimeType"
                    checked={useCustomOvertimeRate}
                    onChange={() => setUseCustomOvertimeRate(true)}
                    className="h-4 w-4"
                  />
                </div>

                {useCustomOvertimeRate && (
                  <div className="grid gap-2">
                    <Label htmlFor="customRate">
                      Lương OT đặc biệt (VND/giờ)
                    </Label>
                    <Input
                      id="customRate"
                      type="number"
                      value={customOvertimeRate}
                      onChange={(e) =>
                        setCustomOvertimeRate(Number(e.target.value))
                      }
                      placeholder="Nhập lương OT mới"
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleSaveOvertimeSettings} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3 flex-1">
        <Avatar className="w-8 h-8">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{member.name}</h4>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{member.department}</span>
            <span>Vai trò: {member.position || member.role}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="text-xs">
          {member.role}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog
              open={isManageDialogOpen}
              onOpenChange={setIsManageDialogOpen}
            >
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Settings className="size-4 mr-2" />
                  Cài đặt OT
                </DropdownMenuItem>
              </DialogTrigger>
            </Dialog>
            <DropdownMenuItem>
              <Edit className="size-4 mr-2" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="size-4 mr-2" />
              Xóa khỏi dự án
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cài đặt OT - {member.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">
                    Sử dụng lương OT cố định
                  </p>
                  <p className="text-xs text-gray-500">
                    Lấy từ thông tin nhân sự:{" "}
                    {formatCurrency(member.salary?.overtimeRate || 0)}/giờ
                  </p>
                </div>
                <input
                  type="radio"
                  name="overtimeType"
                  checked={!useCustomOvertimeRate}
                  onChange={() => setUseCustomOvertimeRate(false)}
                  className="h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">
                    Lương OT đặc biệt cho dự án
                  </p>
                  <p className="text-xs text-gray-500">
                    Thiết lập riêng cho dự án này
                  </p>
                </div>
                <input
                  type="radio"
                  name="overtimeType"
                  checked={useCustomOvertimeRate}
                  onChange={() => setUseCustomOvertimeRate(true)}
                  className="h-4 w-4"
                />
              </div>

              {useCustomOvertimeRate && (
                <div className="grid gap-2">
                  <Label htmlFor="customRateRow">
                    Lương OT đặc biệt (VND/giờ)
                  </Label>
                  <Input
                    id="customRateRow"
                    type="number"
                    value={customOvertimeRate}
                    onChange={(e) =>
                      setCustomOvertimeRate(Number(e.target.value))
                    }
                    placeholder="Nhập lương OT mới"
                  />
                </div>
              )}
            </div>

            <Button onClick={handleSaveOvertimeSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Lưu cài đặt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
