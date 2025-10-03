"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { clearCurrentActiveCard } from "@/store/activeCard/activeCardSlice";
import { RootState } from "@/store/store";
import type { Comment } from "@/types/common";
import {
  BellOff,
  Calendar as CalendarIcon,
  Check,
  CheckSquare,
  Image as ImageIcon,
  Paperclip,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToggleFocusInput from "../column/toggle-focus-input";
import CardAttachments from "./card-attachments";
import CardChecklist from "./card-checklist";
import CardComments from "./card-comments";
import CardDescriptionMdEditor from "./card-description-mdeditor";
import CardMembers from "./card-members";

interface ActiveCardModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ActiveCardModal({
  open,
  onClose,
}: ActiveCardModalProps) {
  const dispatch = useDispatch();
  const currentActiveCard = useSelector(
    (state: RootState) => state.activeCard.currentActiveCard,
  );
  const activeProject = useSelector(
    (state: RootState) => state.activeProject.activeProject,
  );

  // Lấy dữ liệu từ card hiện tại
  const [title, setTitle] = useState(currentActiveCard?.title || "");
  const [description, setDescription] = useState(
    currentActiveCard?.description || "",
  );

  // Chuyển đổi checklist từ card data
  const [checklist, setChecklist] = useState(
    currentActiveCard?.checklist?.map((item) => ({
      id: parseInt(item.id.replace("chk-", "")),
      text: item.content,
      done: item.completed,
    })) || [],
  );

  // Lấy members từ project users dựa trên memberIds (dùng useMemo để tránh tính lại không cần thiết)
  const projectMembers = useMemo(
    () => activeProject?.users || [],
    [activeProject?.users],
  );
  const cardMembers = useMemo(
    () =>
      projectMembers.filter((user) =>
        currentActiveCard?.memberIds?.includes(user.id),
      ),
    [projectMembers, currentActiveCard?.memberIds],
  );

  const [members, setMembers] = useState(cardMembers);

  // Chuyển đổi comments từ card data: dùng trực tiếp interface Comment
  const [comments, setComments] = useState<Comment[]>(
    currentActiveCard?.comments || [],
  );

  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(
    currentActiveCard?.deadlineDate
      ? new Date(currentActiveCard.deadlineDate)
      : undefined,
  );
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [attachments, setAttachments] = useState<
    { name: string; url: string; type: string }[]
  >([]);
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state khi currentActiveCard thay đổi (chỉ setMembers khi card id đổi)
  useEffect(() => {
    if (currentActiveCard) {
      setTitle(currentActiveCard.title);
      setDescription(currentActiveCard.description || "");
      setChecklist(
        currentActiveCard.checklist?.map((item) => ({
          id: parseInt(item.id.replace("chk-", "")),
          text: item.content,
          done: item.completed,
        })) || [],
      );
      setMembers(cardMembers); // chỉ set lại khi card đổi
      setComments(currentActiveCard.comments || []);
      setDueDate(
        currentActiveCard.deadlineDate
          ? new Date(currentActiveCard.deadlineDate)
          : undefined,
      );
    }
    // chỉ phụ thuộc vào currentActiveCard (không phụ thuộc cardMembers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActiveCard]);

  // Khi click vào item để chỉnh sửa, set editingText
  const handleEditClick = (item: { id: number; text: string }) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  // Khi blur input, nếu không lưu thì hủy chỉnh sửa
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Khi lưu chỉnh sửa
  const handleEditSave = () => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === editingId ? { ...c, text: editingText } : c)),
    );
    setEditingId(null);
    setEditingText("");
  };

  // Xử lý khi chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles: { name: string; url: string; type: string }[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newFiles.push({ name: file.name, url, type: file.type });
    });
    setAttachments((prev) => [...prev, ...newFiles]);
    // Reset input để có thể chọn lại cùng file
    e.target.value = "";
  };

  // Xóa file
  const handleRemoveAttachment = (url: string) => {
    setAttachments((prev) => prev.filter((f) => f.url !== url));
  };

  // Xử lý gửi bình luận
  const handleSendComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(), // Tạo id tạm thời dựa trên timestamp
        userId: members[0]?.id || "", // giả sử user đầu tiên là người bình luận
        userEmail: members[0]?.email || "",
        userAvatar: members[0]?.avatar || "",
        userDisplayName: members[0]?.displayName || "",
        content: commentText.trim(),
        commentAt: new Date().toISOString(),
      },
    ]);
    setCommentText("");
  };

  // Xóa bình luận (dựa vào index)
  const handleRemoveComment = (index: number) => {
    setComments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    dispatch(clearCurrentActiveCard());
    onClose();
  };

  if (!currentActiveCard) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="md:max-w-4xl max-h-[calc(100dvh-128px)] p-0 flex flex-col gap-0">
        {/* Header */}
        <DialogHeader
          className={`flex items-center justify-between border-b ${!currentActiveCard.cover ? "px-6 py-4" : ""}`}
        >
          {!currentActiveCard.cover ? (
            <DialogTitle className="text-sm font-medium text-muted-foreground">
              Tổng quan công việc
            </DialogTitle>
          ) : (
            <div
              className="w-full h-[160px] max-h-[160px] min-h-[160px] bg-center bg-cover rounded-t-lg overflow-hidden"
              style={{ backgroundImage: `url(${currentActiveCard.cover})` }}
            >
              <DialogTitle className="text-sm font-medium text-center py-3 bg-white/20 backdrop-blur-sm">
                Tổng quan công việc
              </DialogTitle>
            </div>
          )}
        </DialogHeader>

        {/* Body */}
        <div className="flex gap-6 px-4 relative overflow-hidden h-full">
          {/* Left side */}
          <div className="relative flex-1 flex flex-col space-y-6 overflow-y-auto p-2 pb-0 *:shrink-0">
            {/* Title */}
            <ToggleFocusInput
              value={title}
              onChangedValue={(val) => setTitle(val)}
              className="!text-xl font-semibold"
            />

            {/* Assigned + Due */}
            <div className="flex gap-4 items-center">
              {/* Members */}
              <CardMembers
                members={members}
                setMembers={setMembers}
                allMembers={projectMembers}
                search={search}
                setSearch={setSearch}
                showAllMembers={showAllMembers}
                setShowAllMembers={setShowAllMembers}
              />

              {/* Deadline */}
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm font-medium">Hạn chót</p>
                <div className="flex items-center gap-2">
                  <Popover
                    open={showDatePicker}
                    onOpenChange={setShowDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => setShowDatePicker((v) => !v)}
                      >
                        <CalendarIcon className="size-4 mr-1" />{" "}
                        {dueDate
                          ? dueDate.toLocaleDateString("vi-VN")
                          : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <CardDescriptionMdEditor
                cardDescriptionProp={description}
                handleUpdateCardDescription={(val) => setDescription(val)}
                labelClassName="text-sm font-medium mb-1 flex items-center gap-2"
              />
            </div>

            {/* Checklist */}
            <CardChecklist
              checklist={checklist}
              setChecklist={setChecklist}
              editingId={editingId}
              // setEditingId={setEditingId}
              editingText={editingText}
              setEditingText={setEditingText}
              addingItem={addingItem}
              setAddingItem={setAddingItem}
              newItemText={newItemText}
              setNewItemText={setNewItemText}
              handleEditClick={handleEditClick}
              handleEditCancel={handleEditCancel}
              handleEditSave={handleEditSave}
            />

            {/* Attachments */}
            <CardAttachments
              attachments={attachments}
              handleFileChange={handleFileChange}
              handleRemoveAttachment={handleRemoveAttachment}
              fileInputRef={fileInputRef}
            />

            {/* Comments & Comment box */}
            <CardComments
              comments={comments}
              commentText={commentText}
              setCommentText={setCommentText}
              handleSendComment={handleSendComment}
              // Truyền index thay vì id nếu CardComments cần
              handleRemoveComment={handleRemoveComment}
            />
          </div>

          {/* Right side actions */}
          <div className="w-1/4 p-2 py-4">
            <p className="text-sm font-medium mb-2">Thao tác</p>
            <div className="space-y-1 text-sm">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Check className="size-4 mr-2" /> Đánh dấu hoàn thành
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <ImageIcon className="size-4 mr-2" /> Ảnh bìa
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Paperclip className="size-4 mr-2" /> Tệp đính kèm
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <CheckSquare className="size-4 mr-2" /> Việc cần làm
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <UserPlus className="size-4 mr-2" /> Thêm thành viên
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <BellOff className="size-4 mr-2" /> Tắt thông báo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                <Trash2 className="size-4 mr-2" /> Xóa công việc
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
