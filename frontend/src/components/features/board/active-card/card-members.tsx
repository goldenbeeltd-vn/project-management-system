import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/types/common";
import { UserPlus, X } from "lucide-react";
import React from "react";

interface CardMembersProps {
  members: User[];
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
  allMembers: User[];
  search: string;
  setSearch: (val: string) => void;
  showAllMembers: boolean;
  setShowAllMembers: (val: boolean) => void;
}

const CardMembers: React.FC<CardMembersProps> = ({
  members,
  setMembers,
  allMembers,
  search,
  setSearch,
  showAllMembers,
  setShowAllMembers,
}) => {
  // Lọc thành viên chưa có trong thẻ và khớp từ khoá
  const filteredMembers = allMembers.filter(
    (m) =>
      !members.some((mem) => mem.id === m.id) &&
      m.displayName.toLowerCase().includes(search.toLowerCase()),
  );

  // Hiển thị tối đa 5 avatar, còn lại là số
  const maxAvatars = 5;
  const memberAvatars = showAllMembers ? members : members.slice(0, maxAvatars);
  const remaining = members.length - maxAvatars;

  return (
    <div className="flex flex-col gap-1 flex-1">
      <p className="text-sm font-medium">Thành viên</p>
      <div className="flex items-center gap-1">
        <div className="flex -space-x-2">
          {memberAvatars.map((m) => (
            <Avatar
              key={m.id}
              className="size-8 border-2 border-white cursor-pointer"
              onClick={() => setShowAllMembers(true)}
            >
              <AvatarImage src={m.avatar} />
              <AvatarFallback>{m.displayName[0]}</AvatarFallback>
            </Avatar>
          ))}
          {remaining > 0 && !showAllMembers && (
            <Avatar
              className="size-8 border-2 border-white bg-muted text-xs flex items-center justify-center cursor-pointer"
              onClick={() => setShowAllMembers(true)}
            >
              +{remaining}
            </Avatar>
          )}
        </div>
        {/* Popover thêm thành viên */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full size-8"
            >
              <UserPlus className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div
              className="max-h-[300px] overflow-y-auto p-4"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <p className="font-medium text-center mb-2">Thành viên</p>
              <Input
                placeholder="Tìm kiếm thành viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3 shadow-none"
              />
              {/* Danh sách thành viên để thêm */}
              {filteredMembers.length > 0 ? (
                <div className="mb-3">
                  {filteredMembers.map((m) => (
                    <Button
                      key={m.id}
                      variant="ghost"
                      className="w-full flex items-center justify-start gap-2 mb-1 rounded"
                      onClick={() => {
                        setMembers((prev) => [...prev, m]);
                        setSearch("");
                      }}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={m.avatar} />
                        <AvatarFallback>{m.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <span>{m.displayName}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mb-3">
                  Không tìm thấy thành viên
                </p>
              )}
              <div>
                <p className="text-sm font-medium mb-2">Thành viên của thẻ</p>
                <div className="flex flex-col gap-2">
                  {members.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-2 justify-between bg-muted/50 rounded px-2 py-1"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={m.avatar} />
                          <AvatarFallback>{m.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{m.displayName}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground size-8"
                        onClick={() =>
                          setMembers((prev) =>
                            prev.filter((mem) => mem.id !== m.id),
                          )
                        }
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                  {members.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">
                      Chưa có thành viên
                    </p>
                  )}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CardMembers;
