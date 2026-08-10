import type { NodeDto } from "@/types/node.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EllipsisVertical, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIconForMimeType } from "@/utils/getIconForMimeTypeHelper";
import { DropDownMenuForTrash } from "./DropDownMenuForTrash";
import { Button } from "../ui/button";
import { memo } from "react";

interface TrashCardsProps {
  item: NodeDto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (item: NodeDto) => void;
}

export const TrashCards = memo(
  ({ item, isSelected, onSelect, onOpen }: TrashCardsProps) => {
    const classname = "size-10 text-accent";
    const icon = getIconForMimeType(item.mimeType, classname);
    return (
      <Card
        onClick={() => onSelect(item.id)}
        onDoubleClick={() => onOpen(item)}
        className={cn(
          "w-full max-w-64 cursor-pointer select-none py-0 transition-colors h-auto pb-3",
          isSelected
            ? "border-primary bg-secondary/50"
            : "border-border hover:bg-muted/50",
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2 px-4 py-3">
          <CardTitle className="flex-1 truncate text-sm font-medium">
            {item.name}
          </CardTitle>
          <DropDownMenuForTrash node={item}>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0 cursor-pointer"
              onClick={(e) => e.stopPropagation()} // nu selecta cardul la click pe meniu
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropDownMenuForTrash>
        </CardHeader>
        <CardContent>
          <div className="flex w-full h-20 justify-center items-center bg-muted rounded">
            {item.type === "FOLDER" && (
              <Folder className="size-10 text-accent" />
            )}
            {(item.type === "FILE" || (!item.type && item.mimeType)) && icon}
          </div>
        </CardContent>
      </Card>
    );
  },
);

TrashCards.displayName = "TrashCards";
