import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectNode,
  selectSelectedId,
  touchAccess,
} from "@/redux/nodes/nodesSlice";
import type { NodeDto } from "@/types/node.types";
import { formatBytes } from "@/utils/formatBytesHelper";
import { getIconForMimeType } from "@/utils/getIconForMimeTypeHelper";
import { EllipsisVertical, FolderIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DropDownMenuForCards } from "./DropDownMenuForCards";
import LoadingUI from "./LoadingUI";

interface NodeListProps {
  items: NodeDto[];
  status: string;
  onOpenFolder?: (id: string) => void;
}

export const NodeList = ({ items, status, onOpenFolder }: NodeListProps) => {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);

  if (status === "loading") return <LoadingUI />;
  if (status === "failed")
    return <p className="text-center py-4 text-muted-foreground">ups....</p>;

  const handleSelect = (id: string) => {
    dispatch(selectNode(id));
  };

  const handleOpen = (node: NodeDto) => {
    if (node.type === "FOLDER") {
      onOpenFolder?.(node.id);
    } else {
      dispatch(touchAccess(node.id));
      console.log("preview file");
    }
  };

  // Handler unificat pentru Click/Tap (Single tap pe mobil, Double click pe desktop)
  const handleClick = (node: NodeDto) => {
    handleSelect(node.id);

    if (window.matchMedia("(pointer: coarse)").matches) {
      handleOpen(node);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    const aIsFolder = a.type === "FOLDER";
    const bIsFolder = b.type === "FOLDER";

    if (aIsFolder === bIsFolder) return 0;
    return aIsFolder ? -1 : 1;
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>A list of garden mango.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[50%] sm:w-[40%]">Name</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="w-[25%] sm:w-[20%]">Size</TableHead>
            <TableHead className="hidden md:table-cell">Modified At</TableHead>
            <TableHead className="w-10 text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedItems.map((node) => {
            const isFolder = node.type === "FOLDER";
            const isSelected = selectedId === node.id;
            const icon = isFolder ? (
              <FolderIcon className="size-4 sm:size-5 shrink-0 text-primary" />
            ) : (
              getIconForMimeType(
                node.mimeType,
                "size-4 sm:size-5 shrink-0 text-primary",
              )
            );

            return (
              <TableRow
                key={node.id}
                onClick={() => handleClick(node)}
                onDoubleClick={() => handleOpen(node)}
                className={cn(
                  "cursor-pointer select-none transition-colors",
                  isSelected && "bg-secondary/50 hover:bg-secondary/60",
                )}
              >
                {/* Nume & Iconiță */}
                <TableCell className="py-2.5 sm:py-3 font-medium">
                  <div className="flex items-center gap-2 min-w-0 max-w-[180px] xs:max-w-[220px] sm:max-w-none">
                    {icon}
                    <span className="truncate text-xs sm:text-sm">
                      {node.name}
                    </span>
                  </div>
                </TableCell>

                {/* Tip Fișier (Ascuns pe mobil) */}
                <TableCell className="hidden md:table-cell text-xs sm:text-sm text-muted-foreground">
                  {isFolder ? "Folder" : (node.mimeType ?? "File")}
                </TableCell>

                {/* Dimensiune */}
                <TableCell className="py-2.5 sm:py-3 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {isFolder ? "—" : formatBytes(node.sizeBytes)}
                </TableCell>

                {/* Data modificării (Ascuns pe mobil) */}
                <TableCell className="hidden md:table-cell text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {node.updatedAt || node.createdAt
                    ? new Intl.DateTimeFormat("ro-RO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(node.updatedAt ?? node.createdAt))
                    : "—"}
                </TableCell>

                {/* Meniu Acțiuni */}
                <TableCell className="py-2.5 sm:py-3 text-right">
                  <DropDownMenuForCards node={node}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 sm:size-7 shrink-0 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EllipsisVertical className="size-4" />
                    </Button>
                  </DropDownMenuForCards>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
