"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ToggleFocusInputProps {
  value: string;
  onChangedValue?: (val: string) => void;
  className?: string;
}

export default function ToggleFocusInput({
  value,
  onChangedValue,
  className,
}: ToggleFocusInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const triggerBlur = () => {
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value);
      return;
    }
    const trimmed = inputValue.trim();
    setInputValue(trimmed);
    onChangedValue?.(trimmed);
  };

  return (
    <Textarea
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={triggerBlur}
      spellCheck={false}
      className={`
        w-full min-h-auto font-bold px-1.5 shadow-none
        border border-transparent bg-transparent
        focus:border focus:border-blue-500
        focus:bg-white dark:focus:bg-slate-700
        focus:outline-none resize-none
        ${className}
      `}
    />
  );
}
