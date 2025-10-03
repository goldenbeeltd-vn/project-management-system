"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function DatePicker({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  className = "",
}: DatePickerProps) {
  const dateValue = value ? new Date(value) : undefined;
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(dateValue);

  return (
    <div className={`relative flex gap-2 ${className}`}>
      <Input
        value={value}
        placeholder={placeholder}
        className="bg-background pr-10 h-10"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            type="button"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Chọn ngày</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={dateValue}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              if (date) {
                onChange(date.toISOString().slice(0, 10));
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
