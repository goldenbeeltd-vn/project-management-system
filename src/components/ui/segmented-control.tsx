import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center bg-gray-100 rounded-lg p-1",
      className,
    )}
    {...props}
  />
));
SegmentedControl.displayName = ToggleGroupPrimitive.Root.displayName;

const SegmentedControlItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 min-w-[60px]",
      "text-gray-600 hover:text-gray-900 hover:bg-white/50",
      "data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
));
SegmentedControlItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { SegmentedControl, SegmentedControlItem };
