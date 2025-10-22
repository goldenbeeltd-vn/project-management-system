"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card as CardType } from "@/types/common";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Card from "./card";

export default function ListCards({
  cards,
  openNewCardForm,
  setOpenNewCardForm,
}: {
  cards: CardType[];
  openNewCardForm: boolean;
  setOpenNewCardForm: (open: boolean) => void;
}) {
  // Logic scroll tới form khi mở
  const newCardRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openNewCardForm && newCardRef.current) {
      newCardRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [openNewCardForm]);

  // State cho form thêm thẻ mới (không xử lý API)
  const [newCardTitle, setNewCardTitle] = useState("");

  const addNewCard = () => {
    if (!newCardTitle.trim()) return;
    // Chỉ cập nhật state cục bộ nếu muốn, không gọi API
    setNewCardTitle("");
    setOpenNewCardForm(false);
  };

  return (
    <SortableContext
      items={cards.map((card) => card.id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={listRef}
        className="flex flex-col flex-1 gap-2 mx-1 p-1 overflow-y-auto scrollbar-custom"
      >
        {/* Cards từ props */}
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}

        {/* Form thêm card mới */}
        {openNewCardForm && (
          <div ref={newCardRef} className="mt-1 space-y-2" data-no-dnd="true">
            <Input
              placeholder="Nhập tiêu đề"
              className="bg-card shadow-sm rounded-lg text-sm"
              autoFocus
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={addNewCard}>
                Thêm thẻ
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setOpenNewCardForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </SortableContext>
  );
}
