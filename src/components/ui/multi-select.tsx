"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  role?: string;
}

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
};

/**
 * A multi-select component that allows the user to select multiple options from a list of options.
 */
export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className = "",
  error = false,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (option: string) => {
    onChange(selected.filter((s) => s !== option));
  };

  const handleSelect = (option: string) => {
    setInputValue("");
    onChange([...selected, option]);
    inputRef.current?.focus();
  };

  const selectables = options.filter(
    (option) =>
      !selected.includes(option.value) &&
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 min-h-[40px] cursor-text",
          error && "border-red-500",
        )}
        onClick={() => {
          inputRef.current?.focus();
          setOpen(true);
        }}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <Badge key={value} variant="secondary" className="text-xs">
                {option?.label || value}
                <button
                  type="button"
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-destructive/10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUnselect(value);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : ""}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 h-auto border-0 px-0 py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {open && (
        <div className="absolute w-full z-50 top-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="max-h-60 overflow-auto p-1">
            {selectables.length === 0 ? (
              <div className="py-6 text-center text-sm">No results found.</div>
            ) : (
              selectables.map((option) => {
                return (
                  <div
                    key={option.value}
                    className="cursor-pointer relative flex items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleSelect(option.value)}
                  >
                    <div className="flex flex-col">
                      <div className="font-medium">{option.label}</div>
                      {option.role && (
                        <div className="text-xs text-muted-foreground">
                          {option.role}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
