"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Column as ColumnType } from "@/types/common";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Column from "./column";

const ListColumn = ({ columns }: { columns: ColumnType[] }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const addNewColumn = () => {
    if (!newColumnTitle.trim()) return;
    setNewColumnTitle("");
    setOpenNewColumnForm(false);
  };

  return (
    <SortableContext
      items={columns.map((column) => column.id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-3 absolute bottom-0 left-0 right-0 -top-[2px] pt-[2px] pb-1 px-1.5 mt-1.5 mb-1 overflow-x-auto overflow-y-hidden select-none scrollbar-hidden">
        {/* Danh sách cột */}
        {columns.map((col: ColumnType) => (
          <Column key={col.id} column={col} />
        ))}

        {/* Thêm cột mới */}
        <div className="w-[300px] px-1.5 shrink-0">
          {!openNewColumnForm ? (
            <Button
              onClick={() => setOpenNewColumnForm(true)}
              className="cursor-pointer w-full justify-start p-3"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm danh sách khác
            </Button>
          ) : (
            <div className="w-full rounded-lg p-2 bg-white">
              <div className="mb-2">
                <Label htmlFor="new-column" className="sr-only">
                  Nhập tên danh sách
                </Label>
                <Input
                  id="new-column"
                  type="text"
                  autoFocus
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  placeholder="Nhập tên danh sách..."
                />
              </div>

              <div className="flex gap-1">
                <Button onClick={addNewColumn} className="cursor-pointer">
                  Thêm danh sách
                </Button>
                <Button
                  onClick={() => setOpenNewColumnForm(false)}
                  variant="ghost"
                  className="p-2 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SortableContext>
  );
};

export default ListColumn;
