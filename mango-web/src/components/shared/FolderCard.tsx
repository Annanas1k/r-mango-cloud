// components/shared/FolderCard.tsx
import { EllipsisVertical, Folder as FolderIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropDownMenuForCards } from "./DropDownMenuForCards";
import type { NodeDto } from "@/types/node.types";
import { memo } from "react";

interface FolderCardProps {
  folder: NodeDto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (folder: NodeDto) => void;
}

export const FolderCard = memo(
  ({ folder, isSelected, onSelect, onOpen }: FolderCardProps) => {
    // Tratare click pentru mobil vs. desktop
    const handleClick = () => {
      onSelect(folder.id);

      // Dacă utilizatorul este pe un dispozitiv touch (mobil), deschidem la un singur click
      if (window.matchMedia("(pointer: coarse)").matches) {
        onOpen(folder);
      }
    };

    return (
      <Card
        onClick={handleClick}
        onDoubleClick={() => onOpen(folder)}
        className={cn(
          // Am scos max-w-64 fix pentru a permite Grid-ului să controleze dimensiunea
          "w-full cursor-pointer select-none py-0 transition-all active:scale-[0.98] md:active:scale-100",
          isSelected
            ? "border-primary bg-secondary/50 shadow-sm"
            : "border-border hover:bg-muted/50",
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
          {/* Iconiță Folder flexibilă */}
          <FolderIcon className="size-4 sm:size-5 shrink-0 text-primary" />

          {/* Titlu folder cu truncate */}
          <CardTitle className="flex-1 truncate text-xs font-medium sm:text-sm">
            {folder.name}
          </CardTitle>

          {/* Meniu de acțiuni */}
          <DropDownMenuForCards node={folder}>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-7 shrink-0 cursor-pointer -mr-1"
              onClick={(e) => e.stopPropagation()} // Previne selectarea sau deschiderea la apăsarea pe meniu
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropDownMenuForCards>
        </CardHeader>
      </Card>
    );
  },
);

FolderCard.displayName = "FolderCard";
