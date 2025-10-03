import { Card, CardContent } from "@/components/ui/card";
import { File, Folder } from "lucide-react";
import Link from "next/link";
import { IDocument } from "@/types/document";
import { ItemActions } from "@/components/dropdowns/document-actions";

interface GridViewProps {
  items: IDocument[];
  onShowDetails: (item: IDocument) => void;
}

export function DocumentGridView({ items, onShowDetails }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {items.map((item, index) => (
        <Card key={index} className="hover:bg-slate-50 cursor-pointer p-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {item.type === "folder" ? (
                      <Folder className="size-5 text-blue-500" />
                    ) : (
                      <File className="size-5 text-gray-500" />
                    )}
                  </div>
                  {item.type === "folder" ? (
                    <Link
                      href={`/document/${index}`}
                      className="flex-1 truncate ml-2"
                    >
                      <p className="truncate">{item.name}</p>
                    </Link>
                  ) : (
                    <p className="flex-1 truncate ml-2">{item.name}</p>
                  )}
                </div>
                <ItemActions item={item} onShowDetails={onShowDetails} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
