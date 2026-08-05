// components/shared/FileCard.tsx
import { EllipsisVertical, File as FileIcon, Image, FileText, FileArchive, FileVideo, FileAudio } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropDownMenuForCards } from "./DropDownMenuForCards";
import type { NodeDto } from "@/types/node.types";



interface FileCardProps {
  file: NodeDto;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (file: NodeDto) => void; // ex: preview/download la dublu-click
}

function getIconForMimeType(mimeType: string | null) {
  const className = "size-5 shrink-0 text-muted-foreground";

  if (!mimeType) return <FileIcon className={className} />;
  if (mimeType.startsWith("image/")) return <Image className={className} />;
  if (mimeType.startsWith("video/")) return <FileVideo className={className} />;
  if (mimeType.startsWith("audio/")) return <FileAudio className={className} />;
  if (mimeType.includes("zip") || mimeType.includes("archive")) return <FileArchive className={className} />;
  if (mimeType.startsWith("text/") || mimeType.includes("pdf")) return <FileText className={className} />;
  
  return <FileIcon className={className} />;
}

function formatBytes(bytes?: string | null): string {
  if (!bytes) return "0 B";
  const num = Number(bytes);
  if (isNaN(num) || num === 0) return "0 B";
  if (num < 1024) return `${num} B`;
  if (num < 1024 ** 2) return `${(num / 1024).toFixed(1)} KB`;
  if (num < 1024 ** 3) return `${(num / 1024 ** 2).toFixed(1)} MB`;
  return `${(num / 1024 ** 3).toFixed(1)} GB`;
}

export const FileCard = ({ file, isSelected, onSelect, onOpen }: FileCardProps) => {
  const icon = getIconForMimeType(file.mimeType);

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
            <div>
                preview(future)
            </div>
      </CardContent>
      <CardFooter >
            <p className="truncate text-xs text-muted-foreground">
            {formatBytes(file.sizeBytes)}
          </p>
      </CardFooter>
    </Card>
  );
};