import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Permission } from "@/constants/permissions";
import React from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";

interface PermissionGroupProps {
  groupName: string;
  permissions: Permission[];
  rolePermissions: Set<Permission>;
  onPermissionChange: (permission: Permission, isEnabled: boolean) => void;
}

const PermissionGroup = ({
  groupName,
  permissions,
  rolePermissions,
  onPermissionChange,
}: PermissionGroupProps) => {
  const handleSelectAll = (checked: CheckedState) => {
    permissions.forEach((p) => onPermissionChange(p, !!checked));
  };

  const isAllSelected = permissions.every((p) => rolePermissions.has(p));

  return (
    <div className="bg-secondary-light/50 border border-gray-200 rounded-lg p-5">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h4 className="text-xl font-medium">{groupName}</h4>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`select-all-${groupName}`}
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
            aria-label={`Select all ${groupName} permissions`}
          />
          <Label
            htmlFor={`select-all-${groupName}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Chọn tất cả
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {permissions.map((permission) => (
          <div key={permission} className="flex items-center space-x-3">
            <Checkbox
              id={permission}
              checked={rolePermissions.has(permission)}
              onCheckedChange={(checked) =>
                onPermissionChange(permission, !!checked)
              }
            />
            <Label htmlFor={permission}>
              {permission.split(".")[1].replace(/_/g, " ")}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionGroup;
