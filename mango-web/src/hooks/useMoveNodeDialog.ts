/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { NodeDto } from "@/types/node.types";
import { listNodes } from "@/api/nodes.api";
import { useNodeActions } from "./useNodeActions";

export interface BreadcrumbItem {
  id: string | null;
  name: string;
}

interface UseMoveNodeDialogProps {
  node: NodeDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rootLabel?: string;
}

export function useMoveNodeDialog({
  node,
  open,
  onOpenChange,
  rootLabel = "My Cloud",
}: UseMoveNodeDialogProps) {
  const { handleMoveNode } = useNodeActions();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: null, name: rootLabel },
  ]);
  const [folders, setFolders] = useState<NodeDto[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // Reset state la deschiderea dialogului
  useEffect(() => {
    if (open) {
      setCurrentFolderId(null);
      setSelectedFolderId(null);
      setBreadcrumbs([{ id: null, name: rootLabel }]);
    }
  }, [open, rootLabel]);

  // Incarca folderele cand se schimba folderul curent sau se deschide dialogul
  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    async function fetchFolders() {
      setLoading(true);
      try {
        const nodes = await listNodes(currentFolderId);
        if (isMounted) {
          // Filtram doar nodurile de tip FOLDER si excludem nodul curent
          const folderNodes = nodes.filter(
            (item) => item.type === "FOLDER" && item.id !== node.id
          );
          setFolders(folderNodes);
        }
      } catch (error) {
        console.error("Failed to fetch folders:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchFolders();
    return () => {
      isMounted = false;
    };
  }, [open, currentFolderId, node.id]);

  const handleNavigateIntoFolder = (folder: NodeDto, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentFolderId(folder.id);
    setSelectedFolderId(folder.id);
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  const handleNavigateBack = () => {
    if (breadcrumbs.length <= 1) return;
    const newBreadcrumbs = breadcrumbs.slice(0, -1);
    const parent = newBreadcrumbs[newBreadcrumbs.length - 1];
    setBreadcrumbs(newBreadcrumbs);
    setCurrentFolderId(parent.id);
    setSelectedFolderId(parent.id);
  };

  const handleBreadcrumbClick = (index: number) => {
    const target = breadcrumbs[index];
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    setCurrentFolderId(target.id);
    setSelectedFolderId(target.id);
  };

  const handleConfirmMove = async () => {
    if (selectedFolderId === node.parentId) return;
    setIsMoving(true);
    try {
      await handleMoveNode(node, selectedFolderId);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to move node:", error);
    } finally {
      setIsMoving(false);
    }
  };

  const isCurrentLocation = selectedFolderId === node.parentId;

  return {
    currentFolderId,
    breadcrumbs,
    folders,
    selectedFolderId,
    loading,
    isMoving,
    isCurrentLocation,
    setSelectedFolderId,
    handleNavigateIntoFolder,
    handleNavigateBack,
    handleBreadcrumbClick,
    handleConfirmMove,
  };
}
