import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/constants/permissions";
import React, { useEffect, useState } from "react";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newRoleName: string, templateRole?: Role) => void;
  existingRoles: Role[];
}

const CreateRoleModal = ({
  isOpen,
  onClose,
  onCreate,
  existingRoles,
}: CreateRoleModalProps) => {
  const [newRoleName, setNewRoleName] = useState("");
  const [templateRole, setTemplateRole] = useState<Role | "">("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNewRoleName("");
      setTemplateRole("");
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedName = newRoleName.trim().toLowerCase();
    if (!formattedName) {
      setError("Vui lòng nhập tên vai trò.");
      return;
    }
    if (existingRoles.map((r) => r.toLowerCase()).includes(formattedName)) {
      setError("Vai trò này đã tồn tại.");
      return;
    }
    onCreate(newRoleName.trim(), templateRole || undefined);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo vai trò mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Tên vai trò</Label>
              <Input
                id="roleName"
                type="text"
                value={newRoleName}
                onChange={(e) => {
                  setNewRoleName(e.target.value);
                  setError("");
                }}
                placeholder="Developer, Designer, Manager..."
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateRole">
                Sao chép từ vai trò khác (tùy chọn)
              </Label>
              <Select
                value={templateRole}
                onValueChange={(value) => setTemplateRole(value as Role | "")}
              >
                <SelectTrigger id="templateRole">
                  <SelectValue placeholder="Lựa chọn" />
                </SelectTrigger>
                <SelectContent>
                  {existingRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant={"outline"} onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={!newRoleName.trim()}>
              Tạo vai trò
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleModal;
