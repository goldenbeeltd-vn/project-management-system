"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { ExtendedTeamMember, UserRole } from "@/types/projects/permissions";
import {
  PERMISSION_CATEGORIES,
  ROLE_DESCRIPTIONS,
} from "@/constants/projects/team-permissions";

interface PermissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  member: ExtendedTeamMember;
  onUpdateRole?: (newRole: UserRole) => void;
  onUpdatePermission?: (permissionKey: string, value: boolean) => void;
}

export function PermissionDialog({
  isOpen,
  onClose,
  member,
  onUpdateRole,
  onUpdatePermission,
}: PermissionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent size="4xl" className="max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Phân quyền nhân viên</span>
          </DialogTitle>
          <DialogDescription>
            Cấu hình vai trò và quyền truy cập cho {member.name} trong dự án
            này.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-6 py-4">
            {/* Role Setting */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  Vai trò trong dự án
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Thay đổi vai trò sẽ áp dụng quyền mặc định
                </p>
              </div>
              <Select
                value={member.role}
                onValueChange={(newRole: UserRole) =>
                  onUpdateRole && onUpdateRole(newRole)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_DESCRIPTIONS).map(
                    ([role, { label, description }]) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex flex-col">
                          <span>{label}</span>
                          <span className="text-xs text-gray-500">
                            {description}
                          </span>
                        </div>
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Permission Categories */}
            <div className="grid grid-cols-2 gap-6">
              {PERMISSION_CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className="border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <category.icon className="h-5 w-5 text-gray-600" />
                    <h5 className="font-medium text-gray-900">
                      {category.title}
                    </h5>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {category.permissions.map((perm) => (
                        <div
                          key={perm.key}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Checkbox
                            id={`${member.id}-${perm.key}`}
                            checked={
                              member.permissions[
                                perm.key as keyof typeof member.permissions
                              ]
                            }
                            onCheckedChange={(checked) => {
                              if (onUpdatePermission) {
                                onUpdatePermission(perm.key, !!checked);
                              }
                            }}
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`${member.id}-${perm.key}`}
                              className="text-sm font-medium cursor-pointer text-gray-900 leading-tight"
                            >
                              {perm.label}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button onClick={onClose}>Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
