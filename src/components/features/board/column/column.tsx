"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Column as ColumnType } from "@/types/common";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Clipboard,
  Cloud,
  Copy,
  GripVertical,
  MoreHorizontal,
  Plus,
  Scissors,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import ListCard from "../card/list-card";
import ToggleFocusInput from "./toggle-focus-input";

export default function Column({ column }: { column: ColumnType }) {
  // DndKit sortable logic for column
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id, data: { ...column } });

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const cards = column?.cards || [];

  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      className="w-[300px] h-full flex-shrink-0"
    >
      {/* Column inner */}
      <div
        {...listeners}
        className="flex flex-col rounded-lg bg-white pb-1 text-sm shadow-xs max-h-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-1 px-2 pt-2 pb-1 text-foreground">
          <ToggleFocusInput
            value={columnTitle}
            onChangedValue={(val) => setColumnTitle(val)}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setOpenNewCardForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm thẻ mới
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Scissors className="mr-2 h-4 w-4" />
                Cắt
                <span className="ml-auto text-xs text-muted-foreground">
                  ⌘X
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Sao chép
                <span className="ml-auto text-xs text-muted-foreground">
                  ⌘C
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Clipboard className="mr-2 h-4 w-4" />
                Dán
                <span className="ml-auto text-xs text-muted-foreground">
                  ⌘V
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Cloud className="mr-2 h-4 w-4" />
                Lưu trữ danh sách này
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa danh sách này
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <ListCard
          cards={cards}
          openNewCardForm={openNewCardForm}
          setOpenNewCardForm={setOpenNewCardForm}
        />

        {/* Footer */}
        {!openNewCardForm && (
          <div className="mt-1 flex items-center justify-between px-2 py-1">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-1 justify-start gap-1 rounded-md text-foreground cursor-pointer hover:bg-accent"
              onClick={() => setOpenNewCardForm(true)}
            >
              <Plus className="h-4 w-4" />
              Thêm thẻ
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <GripVertical className="ml-1 h-4 w-4 cursor-grab text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Giữ và kéo để di chuyển</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}
