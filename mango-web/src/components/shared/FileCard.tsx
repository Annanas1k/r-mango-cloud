// components/shared/FileCard.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropDownMenuForCards } from "./DropDownMenuForCards";
import type { NodeDto } from "@/types/node.types";
import { formatBytes } from "@/utils/formatBytesHelper";
import { getIconForMimeType } from "@/utils/getIconForMimeTypeHelper";
import { EllipsisVertical } from "lucide-react";



interface FileCardProps {
  file: NodeDto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (file: NodeDto) => void; // ex: preview/download la dublu-click
}


export const FileCard = ({ file, isSelected, onSelect, onOpen }: FileCardProps) => {
  const classname = "size-5 shrink-0 text-primary";
  const icon = getIconForMimeType(file.mimeType, classname);

  return (
    <Card
      onClick={() => onSelect(file.id)}
      onDoubleClick={() => onOpen(file)}
      className={cn(
        "w-full max-w-64 cursor-pointer select-none py-0 transition-colors",
        isSelected
          ? "border-primary bg-secondary/50"
          : "border-border hover:bg-muted/50",
      )}
    >
      <CardHeader className="flex flex-row items-center gap-2 px-4 py-3">
        {icon}

        <div className="flex-1 min-w-0">
          <CardTitle className="truncate text-sm font-medium">
            {file.name}
          </CardTitle>
        </div>

        <DropDownMenuForCards node={file}>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 cursor-pointer"
            onClick={(e) => e.stopPropagation()} // nu selecta cardul la click pe meniu
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropDownMenuForCards>
      </CardHeader>
      <CardContent>
            <div className="w-full h-40 flex items-center justify-center bg-sidebar-border rounded-md">
                preview(future)
            </div>
      </CardContent>
      <CardFooter  className="h-0">
            <p className="truncate text-xs text-muted-foreground">
            {formatBytes(file.sizeBytes)}
          </p>
      </CardFooter>
    </Card>
  );
};