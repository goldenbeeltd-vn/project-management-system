"use client";

import CreateRoleModal from "@/components/features/role-permission/create-role-modal";
import PermissionMatrix from "@/components/features/role-permission/permission-matrix";
import RoleSelector from "@/components/features/role-permission/role-selector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Permission,
  PERMISSIONS,
  Role,
  ROLE_PERMISSIONS,
  ROLES,
} from "@/constants/permissions";
import { SaveIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>(Object.values(ROLES));
  const [permissionsByRole, setPermissionsByRole] = useState<
    Record<Role, Permission[]>
  >(() => JSON.parse(JSON.stringify(ROLE_PERMISSIONS)));
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES.ADMIN);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPermissions = useMemo(
    () => new Set(permissionsByRole[selectedRole] || []),
    [permissionsByRole, selectedRole],
  );

  const handlePermissionChange = useCallback(
    (permission: Permission, isEnabled: boolean) => {
      setPermissionsByRole((prev) => {
        const newPermissions = new Set(prev[selectedRole] || []);
        if (isEnabled) {
          newPermissions.add(permission);
        } else {
          newPermissions.delete(permission);
        }
        return {
          ...prev,
          [selectedRole]: Array.from(newPermissions),
        };
      });
    },
    [selectedRole],
  );

  const handleResetToDefault = () => {
    setPermissionsByRole((prev) => ({
      ...prev,
      [selectedRole]: [
        ...(ROLE_PERMISSIONS[selectedRole as keyof typeof ROLE_PERMISSIONS] ||
          []),
      ],
    }));
  };

  const handleSaveChanges = () => {
    // Thực hiện một lệnh gọi API để lưu các quyền
    console.log("Saving changes for role:", selectedRole);
    // console.log("New permissions:", permissionsByRole[selectedRole]);
  };

  const handleCreateRole = (newRoleName: string, templateRole?: Role) => {
    // Thực hiện một lệnh gọi API để tạo role
    // console.log(`Creating role: ${newRoleName} from template: ${templateRole}`);

    const newPermissions = templateRole
      ? [...(permissionsByRole[templateRole] || [])]
      : [];

    setRoles((prev) => [...prev, newRoleName as Role]);
    setPermissionsByRole((prev) => ({
      ...prev,
      [newRoleName]: newPermissions,
    }));
    setSelectedRole(newRoleName as Role);
    setIsModalOpen(false);
  };

  const handleDeleteRole = (roleToDelete: Role) => {
    setRoles((prev) => prev.filter((r) => r !== roleToDelete));
    setPermissionsByRole((prev) => {
      const newPermissions = { ...prev };
      delete newPermissions[roleToDelete];
      return newPermissions;
    });
    if (selectedRole === roleToDelete) {
      setSelectedRole(ROLES.ADMIN);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="space-y-4 lg:sticky lg:top-[80px]">
            <RoleSelector
              roles={roles}
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
              onAddNewRole={() => setIsModalOpen(true)}
              onDeleteRole={handleDeleteRole}
            />
          </div>
        </div>

        <div className="lg:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Phân quyền {selectedRole}</CardTitle>
              <CardAction>
                <div className="flex gap-1">
                  <Button onClick={handleResetToDefault} variant={"outline"}>
                    Reset
                  </Button>
                  <Button onClick={handleSaveChanges}>
                    <SaveIcon />
                    Lưu thay đổi
                  </Button>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <PermissionMatrix
                allPermissions={PERMISSIONS}
                rolePermissions={currentPermissions}
                onPermissionChange={handlePermissionChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <CreateRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateRole}
        existingRoles={roles}
      />
    </>
  );
}
