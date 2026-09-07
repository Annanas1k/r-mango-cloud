import { useTranslation } from "react-i18next";
import type { NodeDto } from "@/types/node.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Folder,
  Loader2,
  Check,
} from "lucide-react";
import { useMoveNodeDialog } from "@/hooks/useMoveNodeDialog";

interface MoveNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: NodeDto;
}

export const MoveNodeDialog = ({
  node,
  open,
  onOpenChange,
}: MoveNodeDialogProps) => {
  const { t } = useTranslation("node-menu");
  const rootLabel = t("node-menu.moveDialog.root", "My Cloud");

  const {
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
  } = useMoveNodeDialog({
    node,
    open,
    onOpenChange,
    rootLabel,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140">
        <DialogHeader className="space-y-1.5 pb-1">
          <DialogTitle className="truncate text-lg">
            {t("node-menu.moveDialog.title", { name: node.name })}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t("node-menu.moveDialog.currentLocation", {
              location: node.parentId ? "Folder" : rootLabel,
            })}
          </DialogDescription>
        </DialogHeader>

        {/* Navigation Breadcrumbs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-sm py-2 px-3 bg-muted/50 rounded-lg border text-muted-foreground">
          {breadcrumbs.length > 1 && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleNavigateBack}
              className="h-6 w-6 shrink-0"
              title={t("node-menu.moveDialog.back", "Back")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          <div className="flex items-center gap-1 min-w-0 flex-1 flex-wrap">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div
                  key={crumb.id ?? "root"}
                  className="flex items-center gap-1"
                >
                  {idx > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleBreadcrumbClick(idx)}
                    className={`text-xs px-2 py-1 rounded-md font-medium transition-colors truncate max-w-35 ${
                      isLast
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {idx === 0 && (
                      <Cloud className="inline-block h-3.5 w-3.5 mr-1.5 -mt-0.5" />
                    )}
                    {crumb.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Destination Folder List */}
        <div className="border rounded-lg overflow-hidden">
          {/* Current viewing directory option */}
          <div
            onClick={() => setSelectedFolderId(currentFolderId)}
            className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer border-b text-sm transition-colors ${
              selectedFolderId === currentFolderId
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {currentFolderId === null ? (
                <Cloud className="h-4.5 w-4.5 shrink-0 text-primary" />
              ) : (
                <Folder className="h-4.5 w-4.5 shrink-0 text-amber-500" />
              )}
              <span className="truncate font-medium">
                {currentFolderId === null
                  ? t(
                      "node-menu.moveDialog.rootWithParenthesis",
                      "My Cloud (Root)",
                    )
                  : breadcrumbs[breadcrumbs.length - 1]?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("node-menu.moveDialog.currentFolder", "(current folder)")}
              </span>
            </div>
            {selectedFolderId === currentFolderId && (
              <Check className="h-4.5 w-4.5 shrink-0 text-primary" />
            )}
          </div>

          <ScrollArea className="h-65">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-50 text-muted-foreground gap-2.5">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-xs font-medium">
                  {t("node-menu.moveDialog.loading", "Loading folders...")}
                </span>
              </div>
            ) : folders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-50 text-muted-foreground text-xs">
                {t(
                  "node-menu.moveDialog.noFolders",
                  "No subfolders in this location",
                )}
              </div>
            ) : (
              <div className="p-1.5 space-y-1">
                {folders.map((folder) => {
                  const isSelected = selectedFolderId === folder.id;
                  return (
                    <div
                      key={folder.id}
                      onClick={() => setSelectedFolderId(folder.id)}
                      onDoubleClick={() => handleNavigateIntoFolder(folder)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer text-sm transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/60"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Folder className="h-5 w-5 shrink-0 text-amber-500" />
                        <span className="truncate">{folder.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSelected && (
                          <Check className="h-4.5 w-4.5 text-primary mr-1" />
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className="h-7 w-7 opacity-60 hover:opacity-100"
                          onClick={(e) => handleNavigateIntoFolder(folder, e)}
                          title={t("node-menu.moveDialog.openFolder", {
                            name: folder.name,
                            defaultValue: `Open ${folder.name}`,
                          })}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 pt-1 sm:justify-end">
          <DialogClose
            nativeButton
            render={
              <Button type="button" variant="outline" disabled={isMoving}>
                {t("node-menu.moveDialog.cancel", "Cancel")}
              </Button>
            }
          />
          <Button
            type="button"
            onClick={handleConfirmMove}
            disabled={isCurrentLocation || isMoving}
          >
            {isMoving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isCurrentLocation
              ? t("node-menu.moveDialog.alreadyHere", "Already here")
              : t("node-menu.moveDialog.moveHere", "Move here")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
