import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFolder,
  selectNode,
  selectSelectedId,
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
import { useNavigate } from "react-router";

interface NodeListProps {
  items: NodeDto[];
  status: string;
}

export const NodeList = ({ items, status }: NodeListProps) => {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);
  const navigate = useNavigate();
  if (status === "loading") return <LoadingUI />;
  if (status === "failed") return <p>ups....</p>;

  const handleSelect = (id: string) => {
    dispatch(selectNode(id));
  };

  const handleOpen = (node: NodeDto) => {
    if (node.type === "FOLDER") {
      dispatch(fetchFolder(node.id));
      navigate(`/cloud/folder/${node.id}`);
    } else {
      console.log("preview file");
    }
  };
  const sortedItems = [...items].sort((a, b) => {
    const aIsFolder = a.type === "FOLDER";
    const bIsFolder = b.type === "FOLDER";

    if (aIsFolder === bIsFolder) return 0;
    return aIsFolder ? -1 : 1;
  });
  return (
    <Table>
      <TableCaption>A list of garden mango.</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Modified At</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedItems.map((node) => {
          const isFolder = node.type === "FOLDER";
          const isSelected = selectedId === node.id;
          const icon = isFolder ? (
            <FolderIcon className="size-5 shrink-0 text-primary" />
          ) : (
            getIconForMimeType(node.mimeType, "size-5 shrink-0 text-primary")
          );

          return (
            <TableRow
              key={node.id}
              onClick={() => handleSelect(node.id)}
              onDoubleClick={() => handleOpen(node)}
              className={cn(
                "cursor-pointer select-none",
                isSelected && "bg-secondary/50 hover:bg-secondary/60",
              )}
            >
              <TableCell className="flex items-center gap-2 font-medium">
                {icon}
                <span className="truncate">{node.name}</span>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {isFolder ? "Folder" : (node.mimeType ?? "File")}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {isFolder ? "—" : formatBytes(node.sizeBytes)}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {node.updatedAt
                  ? new Intl.DateTimeFormat("ro-RO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(node.createdAt))
                  : "—"}
              </TableCell>

              <TableCell>
                <DropDownMenuForCards node={node}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0"
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
  );
};
