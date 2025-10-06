"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  showModalActiveCard,
  updateCurrentActiveCard,
} from "@/store/activeCard/activeCardSlice";
import { RootState } from "@/store/store";
import { CardWithPlaceholder, User } from "@/types/common";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, FileText, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Card({ card }: { card: CardWithPlaceholder }) {
  // DndKit sortable logic for card
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { ...card } });

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const dispatch = useDispatch();
  const activeProject = useSelector(
    (state: RootState) => state.activeProject.activeProject,
  );
  const projectMembers = activeProject?.users || [];

  const handleOpenCard = () => {
    dispatch(updateCurrentActiveCard(card));
    dispatch(showModalActiveCard());
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
        className={`w-full shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-raised hover:outline-2 hover:outline-yellow-500 transition bg-white ${
          card.FE_PlaceholderCard ? "hidden" : "block"
        }`}
        onClick={handleOpenCard}
      >
        {card.cover && (
          <Image
            src={card.cover}
            alt={card.title}
            width={600}
            height={200}
            className="h-36 w-full object-cover rounded-t-lg"
          />
        )}

        <div className="px-4 pt-2 pb-1">
          <h3 className="text-sm font-medium text-foreground">{card.title}</h3>
        </div>

        {(card.comments.length > 0 ||
          card.description ||
          card.memberIds.length > 0) && (
          <div className="flex justify-between items-center px-4 pb-2 pt-0">
            {/* Nhóm icon actions */}
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip open={isDragging ? false : undefined}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bạn đang tham gia thẻ này</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {card.description && (
                <TooltipProvider>
                  <Tooltip open={isDragging ? false : undefined}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Thẻ đã có mô tả</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {card.comments.length > 0 && (
                <TooltipProvider>
                  <Tooltip open={isDragging ? false : undefined}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground"
                      >
                        <MessageSquare className="mr-1 h-4 w-4" />
                        {card.comments.length}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bình luận</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {/* Nhóm avatar */}
            {card.memberIds.length > 0 && (
              <div className="flex -space-x-2">
                {card.memberIds.slice(0, 3).map((id) => {
                  const user = projectMembers.find((u: User) => u.id === id);
                  return (
                    <Avatar key={id} className="size-7 border-2 border-white">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.displayName}</AvatarFallback>
                    </Avatar>
                  );
                })}
                {card.memberIds.length > 3 && (
                  <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                    +{card.memberIds.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
