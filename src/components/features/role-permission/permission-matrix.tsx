import React, { useMemo } from "react";
import { Permission, PERMISSIONS } from "@/constants/permissions";
import PermissionGroup from "./permission-group";

interface PermissionMatrixProps {
  allPermissions: typeof PERMISSIONS;
  rolePermissions: Set<Permission>;
  onPermissionChange: (permission: Permission, isEnabled: boolean) => void;
}

const PermissionMatrix = ({
  allPermissions,
  rolePermissions,
  onPermissionChange,
}: PermissionMatrixProps) => {
  const groupedPermissions = useMemo(() => {
    return Object.values(allPermissions).reduce(
      (acc, permission: Permission) => {
        const groupName = permission.split(".")[0];
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(permission);
        return acc;
      },
      {} as Record<string, Permission[]>,
    );
  }, [allPermissions]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(([groupName, permissions]) => (
        <PermissionGroup
          key={groupName}
          groupName={groupName}
          permissions={permissions}
          rolePermissions={rolePermissions}
          onPermissionChange={onPermissionChange}
        />
      ))}
    </div>
  );
};

export default PermissionMatrix;
