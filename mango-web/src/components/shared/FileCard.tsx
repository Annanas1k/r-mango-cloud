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
import { memo } from "react";

interface FileCardProps {
  file: NodeDto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (file: NodeDto) => void; // ex: preview/download la dublu-click
}

export const FileCard = memo(
  ({ file, isSelected, onSelect, onOpen }: FileCardProps) => {
    const classname = "size-4 sm:size-5 shrink-0 text-primary";
    const icon = getIconForMimeType(file.mimeType, classname);
    const cardPreview = useAppSelector(selectCardPreview);

    // Tratare click pentru mobil vs. desktop
    const handleClick = () => {
      onSelect(file.id);

      // Deschide fișierul direct la single-tap pe ecran tactil (mobil/tabletă)
      if (window.matchMedia("(pointer: coarse)").matches) {
        onOpen(file);
      }
    };

    return (
      <Card
        onClick={handleClick}
        onDoubleClick={() => onOpen(file)}
        className={cn(
          "w-full cursor-pointer select-none py-0 transition-all active:scale-[0.98] md:active:scale-100 flex flex-col justify-between",
          isSelected
            ? "border-primary bg-secondary/50 shadow-sm"
            : "border-border hover:bg-muted/50",
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
          {icon}

          <div className="flex-1 min-w-0">
            <CardTitle className="truncate text-xs font-medium sm:text-sm">
              {file.name}
            </CardTitle>
          </div>

          <DropDownMenuForCards node={file}>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-7 shrink-0 cursor-pointer -mr-1"
              onClick={(e) => e.stopPropagation()} // nu selecta/deschide cardul la click pe meniu
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropDownMenuForCards>
        </CardHeader>

        <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
          {cardPreview ? (
            <div className="w-full h-28 sm:h-36 md:h-40 flex items-center justify-center rounded-md bg-linear-to-br from-muted to-muted/50 border border-border/50 overflow-hidden">
              {/* preview real va veni aici în viitor */}
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                preview(future)
              </span>
            </div>
          ) : (
            <div className="w-full h-28 sm:h-36 md:h-40 flex items-center justify-center rounded-md bg-muted/40 border border-dashed border-border [&>svg]:w-10 [&>svg]:h-10 sm:[&>svg]:w-14 sm:[&>svg]:h-14 md:[&>svg]:w-16 md:[&>svg]:h-16 [&>svg]:text-muted-foreground transition-colors hover:bg-muted/60">
              {icon}
            </div>
          )}
        </CardContent>

        <CardFooter className="px-3 pb-2.5 pt-0 sm:px-4 sm:pb-3">
          <p className="truncate text-[10px] sm:text-xs text-muted-foreground">
            {formatBytes(file.sizeBytes)}
          </p>
        </CardFooter>
      </Card>
    );
  },
);

FileCard.displayName = "FileCard";
