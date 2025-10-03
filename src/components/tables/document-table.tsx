import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, Folder } from "lucide-react";
import Link from "next/link";
import { IDocument } from "@/types/document";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ItemActions } from "@/components/dropdowns/document-actions";
import { formatDate } from "@/lib/formatter";

interface TableViewProps {
  items: IDocument[];
  onShowDetails: (item: IDocument) => void;
  basePath?: string;
}

export function DocumentTableView({
  items,
  onShowDetails,
  basePath = "/document",
}: TableViewProps) {
  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Tên</TableHead>
          <TableHead>Chủ sở hữu</TableHead>
          <TableHead>Ngày sửa đổi</TableHead>
          <TableHead>Kích thước</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} className="hover:bg-slate-50">
            <TableCell className="font-medium">
              {item.type === "folder" ? (
                <Link
                  href={`${basePath}/${index}`}
                  className="flex items-center space-x-2 hover:underline"
                >
                  <Folder className="flex-shrink-0 size-4 text-blue-500" />
                  <span className="truncate max-w-[300px]" title={item.name}>
                    {item.name}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <File className="flex-shrink-0 size-4 text-gray-500" />
                  <span className="truncate max-w-[300px]" title={item.name}>
                    {item.name}
                  </span>
                </div>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.user.avatar} />
                </Avatar>
                <span className="text-sm text-gray-600">{item.user.name}</span>
              </div>
            </TableCell>
            <TableCell>{formatDate(item.updatedAt)}</TableCell>
            <TableCell>{item.type === "file" ? item.size : "-"}</TableCell>
            <TableCell>
              <ItemActions item={item} onShowDetails={onShowDetails} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
