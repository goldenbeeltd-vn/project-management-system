"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

// @uiw/react-md-editor cần dynamic import để tránh lỗi SSR
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(
  async () => (await import("@uiw/react-md-editor")).default.Markdown,
  { ssr: false },
);

interface CardDescriptionMdEditorProps {
  cardDescriptionProp: string;
  handleUpdateCardDescription: (value: string) => void;
  labelClassName?: string;
}

export default function CardDescriptionMdEditor({
  cardDescriptionProp,
  handleUpdateCardDescription,
  labelClassName,
}: CardDescriptionMdEditorProps) {
  const [markdownEditMode, setMarkdownEditMode] = useState(false);
  const [cardDescription, setCardDescription] = useState(cardDescriptionProp);

  const updateCardDescription = () => {
    setMarkdownEditMode(false);
    handleUpdateCardDescription(cardDescription);
  };

  return (
    <div className="-mt-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className={labelClassName}>
            <FileText className="size-4" />
            Mô tả
          </p>
          {!markdownEditMode && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setMarkdownEditMode(true)}
            >
              Chỉnh sửa
            </Button>
          )}
        </div>
        {!markdownEditMode ? (
          <div data-color-mode="light">
            {cardDescription ? (
              <Markdown
                source={cardDescription}
                style={{
                  whiteSpace: "pre-wrap",
                  padding: "10px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Chưa có mô tả...
              </p>
            )}
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            <div data-color-mode="light" className="border rounded-md">
              <MDEditor
                value={cardDescription}
                onChange={(val) => setCardDescription(val || "")}
                previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                height={300}
                preview="edit"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={updateCardDescription} size="sm">
                Lưu
              </Button>
              <Button
                onClick={() => {
                  setCardDescription(cardDescriptionProp);
                  setMarkdownEditMode(false);
                }}
                size="sm"
                variant="ghost"
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
