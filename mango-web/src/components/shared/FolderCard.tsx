// components/shared/FolderCard.tsx
import { EllipsisVertical, Folder as FolderIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropDownMenuForCards } from "./DropDownMenuForCards";

interface FolderNode {
  id: string;
  name: string;
  type: string;
}

interface FolderCardProps {
  folder: FolderNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (folder: FolderNode) => void;
}

export const FolderCard = ({ folder, isSelected, onSelect, onOpen }: FolderCardProps) => {
  return (
    <Card
      onClick={() => onSelect(folder.id)}
      onDoubleClick={() => onOpen(folder)}
      className={cn(
        "w-full max-w-64 cursor-pointer select-none py-0 transition-colors",
        isSelected
          ? "border-primary bg-secondary/50"
          : "border-border hover:bg-muted/50",
      )}
    >
      <CardHeader className="flex flex-row items-center gap-2 px-4 py-3">
        <FolderIcon className="size-5 shrink-0 text-primary" />

        <CardTitle className="flex-1 truncate text-sm font-medium">
          {folder.name}
        </CardTitle>

        <DropDownMenuForCards>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 cursor-pointer"
            onClick={(e) => e.stopPropagation()} // nu selecta/deschide cardul la click pe meniu
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropDownMenuForCards>
      </CardHeader>
    </Card>
  );
};