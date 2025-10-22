import { memo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface TableAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
}

export interface TableColumn {
  key: string;
  content: ReactNode;
  className?: string;
}

interface GenericTableRowProps {
  columns: TableColumn[];
  actions?: TableAction[];
  onRowClick?: () => void;
  className?: string;
}

export const GenericTableRow = memo(
  ({ columns, actions, onRowClick, className }: GenericTableRowProps) => {
    return (
      <TableRow
        className={`hover:bg-slate-50 ${onRowClick ? "cursor-pointer" : ""} ${className || ""}`}
        onClick={onRowClick}
      >
        {columns.map((column) => (
          <TableCell key={column.key} className={column.className}>
            {column.content}
          </TableCell>
        ))}

        {actions && actions.length > 0 && (
          <TableCell className="text-right">
            {actions.length === 1 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  actions[0].onClick();
                }}
                className="size-8 p-0"
              >
                {actions[0].icon}
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick();
                      }}
                      className={
                        action.variant === "destructive" ? "text-red-600" : ""
                      }
                    >
                      {action.icon && (
                        <span className="mr-2">{action.icon}</span>
                      )}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </TableCell>
        )}
      </TableRow>
    );
  },
);

GenericTableRow.displayName = "GenericTableRow";
