// components/shared/FileCard.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropDownMenuForCards } from "./DropDownMenuForCards";
import type { NodeDto } from "@/types/node.types";
import { formatBytes } from "@/utils/formatBytesHelper";
import { getIconForMimeType } from "@/utils/getIconForMimeTypeHelper";
import { EllipsisVertical } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCardPreview } from "@/redux/settings/settingsSlice";

interface FileCardProps {
  file: NodeDto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (file: NodeDto) => void; // ex: preview/download la dublu-click
}

export const FileCard = ({
  file,
  isSelected,
  onSelect,
  onOpen,
}: FileCardProps) => {
  const classname = "size-5 shrink-0 text-primary";
  const icon = getIconForMimeType(file.mimeType, classname);
  const cardPreview = useAppSelector(selectCardPreview);

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
      <CardContent className="px-4 pb-4">
        {cardPreview ? (
          <div className="w-full h-40 flex items-center justify-center rounded-md bg-linear-to-br from-muted to-muted/50 border border-border/50 overflow-hidden">
            {/* preview real va veni aici în viitor */}
            <span className="text-xs text-muted-foreground">
              preview(future)
            </span>
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center rounded-md bg-muted/40 border border-dashed border-border [&>svg]:w-16 [&>svg]:h-16 [&>svg]:text-muted-foreground transition-colors hover:bg-muted/60">
            {icon}
          </div>
        )}
      </CardContent>
      <CardFooter className="h-0">
        <p className="truncate text-xs text-muted-foreground">
          {formatBytes(file.sizeBytes)}
        </p>
      </CardFooter>
    </Card>
  );
};
