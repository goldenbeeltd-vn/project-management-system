import { Button } from "@/components/ui/button";
import { Paperclip, X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CardAttachmentsProps {
  attachments: { name: string; url: string; type: string }[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAttachment: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const CardAttachments: React.FC<CardAttachmentsProps> = ({
  attachments,
  handleFileChange,
  handleRemoveAttachment,
  fileInputRef,
}) => (
  <div>
    <p className="text-sm font-medium mb-2 flex items-center gap-2">
      <Paperclip className="size-4" /> Đính kèm
    </p>
    <input
      type="file"
      multiple
      hidden
      ref={fileInputRef}
      onChange={handleFileChange}
    />
    <Button
      variant="secondary"
      size="sm"
      className="text-sm rounded"
      onClick={() => fileInputRef.current?.click()}
    >
      Tải lên tệp đính kèm
    </Button>
    <div className="mt-3 flex flex-wrap gap-3">
      {attachments.map((file) => (
        <div
          key={file.url}
          className="relative w-full flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            {file.type.startsWith("image/") ? (
              <Image
                src={file.url}
                alt={file.name}
                width={48}
                height={48}
                className="size-12 object-cover rounded"
              />
            ) : (
              <Paperclip className="size-6 text-muted-foreground" />
            )}
            <span className="text-xs max-w-[300px] truncate">{file.name}</span>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() => handleRemoveAttachment(file.url)}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default CardAttachments;
