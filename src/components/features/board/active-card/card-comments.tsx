import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment } from "@/types/common";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { MessageCircle, SendHorizontal } from "lucide-react";
import React from "react";

interface CardCommentsProps {
  comments: Comment[];
  commentText: string;
  setCommentText: (val: string) => void;
  handleSendComment: () => void;
  handleRemoveComment: (id: number) => void;
}

const CardComments: React.FC<CardCommentsProps> = ({
  comments,
  commentText,
  setCommentText,
  handleSendComment,
  handleRemoveComment,
}) => (
  <>
    {/* Comments */}
    <div>
      <p className="text-sm font-medium mb-2 flex items-center gap-2">
        <MessageCircle className="size-4" />
        Bình luận{" "}
      </p>
      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="py-2 flex gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={c.userAvatar} />
              <AvatarFallback>{c.userDisplayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{c.userDisplayName}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {format(c.commentAt, "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })}
                </span>
              </div>
              <div className="text-sm border rounded-lg py-1.5 px-3 bg-muted/50">
                {c.content}
              </div>
              <Button
                variant="link"
                size="sm"
                className="self-start text-xs px-2 py-1"
                onClick={() => handleRemoveComment(c.id)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Comment box */}
    <div className="sticky bottom-0 left-0 right-0 bg-white pt-2 pb-2 z-10 flex items-center gap-2 border-t">
      <Input
        placeholder="Nhập bình luận của bạn"
        className="flex-1"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendComment();
          }
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSendComment}
        disabled={!commentText.trim()}
      >
        <SendHorizontal className="w-5 h-5" />
      </Button>
    </div>
  </>
);

export default CardComments;
