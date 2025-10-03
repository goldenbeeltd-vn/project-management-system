import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Role, ROLES } from "@/constants/permissions";
import { PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";

interface RoleSelectorProps {
  roles: Role[];
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
  onAddNewRole: () => void;
  onDeleteRole: (role: Role) => void;
}

const RoleSelector = ({
  roles,
  selectedRole,
  onSelectRole,
  onAddNewRole,
  onDeleteRole,
}: RoleSelectorProps) => {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const handleDeleteClick = (e: React.MouseEvent, role: Role) => {
    e.stopPropagation();
    setRoleToDelete(role);
    setAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      onDeleteRole(roleToDelete);
    }
    setAlertOpen(false);
    setRoleToDelete(null);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vai trò</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {roles.map((role) => (
              <div key={role} className="group relative">
                <Button
                  key={role}
                  onClick={() => onSelectRole(role)}
                  variant={selectedRole === role ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {role}
                </Button>
                {role !== ROLES.ADMIN && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    onClick={(e) => handleDeleteClick(e, role)}
                    aria-label={`Delete role ${role}`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={onAddNewRole} variant={"outline"}>
              <PlusIcon className="size-4" />
              Tạo vai trò mới
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa vai trò?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa vai trò{" "}
              <strong className="capitalize font-bold text-foreground">
                {roleToDelete}
              </strong>{" "}
              và tất cả các quyền liên quan của nó.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(false)}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
            >
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RoleSelector;
