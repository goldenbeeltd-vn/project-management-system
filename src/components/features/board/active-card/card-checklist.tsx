import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckSquare, X } from "lucide-react";
import React from "react";
import ToggleFocusInput from "../column/toggle-focus-input";

interface CardChecklistProps {
  checklist: { id: number; text: string; done: boolean }[];
  setChecklist: React.Dispatch<
    React.SetStateAction<{ id: number; text: string; done: boolean }[]>
  >;
  editingId: number | null;
  setEditingId?: (id: number | null) => void;
  editingText: string;
  setEditingText: (val: string) => void;
  addingItem: boolean;
  setAddingItem: (val: boolean) => void;
  newItemText: string;
  setNewItemText: (val: string) => void;
  handleEditClick: (item: { id: number; text: string }) => void;
  handleEditCancel: () => void;
  handleEditSave: () => void;
}

const CardChecklist: React.FC<CardChecklistProps> = ({
  checklist,
  setChecklist,
  editingId,
  // setEditingId,
  editingText,
  setEditingText,
  addingItem,
  setAddingItem,
  newItemText,
  setNewItemText,
  handleEditClick,
  handleEditCancel,
  handleEditSave,
}) => (
  <div>
    <p className="text-sm font-medium mb-2 flex items-center gap-2">
      <CheckSquare className="size-4" />
      Việc cần làm
    </p>
    <div className="space-y-2">
      {checklist.map((item) => (
        <div
          key={item.id}
          className="group flex justify-between gap-2 px-2 rounded"
        >
          <span className="inline-block py-2">
            <Checkbox
              checked={item.done}
              onCheckedChange={(checked) =>
                setChecklist((prev) =>
                  prev.map((c) =>
                    c.id === item.id ? { ...c, done: !!checked } : c,
                  ),
                )
              }
            />
          </span>
          <div
            className={`flex flex-col gap-2 flex-1 px-2 py-1.5 rounded-md ${editingId === item.id ? "bg-muted" : "hover:bg-muted/50"}`}
          >
            <div className="flex items-center gap-2 flex-1">
              {editingId === item.id ? (
                <ToggleFocusInput
                  value={editingText}
                  onChangedValue={setEditingText}
                  className="text-sm flex-1 font-normal"
                />
              ) : (
                <span
                  className={`text-sm flex-1 cursor-pointer ${
                    item.done ? "line-through text-muted-foreground" : ""
                  }`}
                  onClick={() => handleEditClick(item)}
                >
                  {item.text}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 size-6"
                onClick={() =>
                  setChecklist((prev) => prev.filter((c) => c.id !== item.id))
                }
              >
                <X className="size-4" />
              </Button>
            </div>
            {editingId === item.id && (
              <div className="flex gap-2">
                <Button variant="default" size="sm" onClick={handleEditSave}>
                  Lưu
                </Button>
                <Button variant="ghost" size="sm" onClick={handleEditCancel}>
                  Hủy
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
      {!addingItem ? (
        <Button
          variant="secondary"
          size="sm"
          className="justify-start rounded"
          onClick={() => setAddingItem(true)}
        >
          Thêm một mục
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            autoFocus
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Nhập nội dung việc cần làm..."
            className="h-8 shadow-none flex-1"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              if (newItemText.trim()) {
                setChecklist((prev) => [
                  ...prev,
                  {
                    id:
                      prev.length > 0
                        ? Math.max(...prev.map((c) => c.id)) + 1
                        : 1,
                    text: newItemText.trim(),
                    done: false,
                  },
                ]);
                setNewItemText("");
                setAddingItem(false);
              }
            }}
          >
            Thêm
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setNewItemText("");
              setAddingItem(false);
            }}
          >
            Hủy
          </Button>
        </div>
      )}
    </div>
  </div>
);

export default CardChecklist;
