// FolderPage.tsx
import { PageToolbar } from "@/components/shared/PageToolbar";
import { EmptyState } from "@/components/shared/EmptyState";
import { NodeCards } from "@/components/shared/NodeCards";
import { NodeList } from "@/components/shared/NodeList";
import { Folder } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFolder,
  selectCurrentItems,
  selectNodesStatus,
  selectCurrentFolderId,
} from "@/redux/nodes/nodesSlice";
import { selectViewMode } from "@/redux/settings/settingsSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { ContextMenuBasic } from "@/components/shared/ContextMenuBasic";
import { useCloudUpload } from "@/hooks/useCloudUpload";

export const FolderPage = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("folder-page");

  const viewMode = useAppSelector(selectViewMode);
  const items = useAppSelector(selectCurrentItems);
  const status = useAppSelector(selectNodesStatus);
  const currentFolderId = useAppSelector(selectCurrentFolderId);

  useEffect(() => {
    dispatch(fetchFolder(folderId ?? null));
  }, [folderId, dispatch]);

  const requestedId = folderId ?? null;
  const isStale = currentFolderId !== requestedId;
  const isLoading = status === "loading" || isStale;
  const isEmpty = !isLoading && status === "succeeded" && items.length === 0;

  const {
    fileInputRef,
    folderInputRef,
    handleCreateFolder,
    handleFileInputChange,
    handleFolderInputChange,
    openFilePicker,
    openFolderPicker,
  } = useCloudUpload();

  return (
    <main className="flex flex-col w-full h-full">
      <PageToolbar title={t("title")} />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <input
          ref={folderInputRef}
          type="file"
          className="hidden"
          // @ts-expect-error - webkitdirectory nu e în tipurile standard React/DOM,
          // dar e suportat de toate browserele majore (Chrome, Edge, Safari)
          webkitdirectory=""
          directory=""
          multiple
          onChange={handleFolderInputChange}
        />
        <ContextMenuBasic
          createFolder={handleCreateFolder}
          onUploadFileClick={openFilePicker}
          onUploadFolderClick={openFolderPicker}
        >
          {isLoading ? null : isEmpty ? (
            <EmptyState
              media={<Folder />}
              title={t("emptyState.title")}
              description={t("emptyState.description")}
            />
          ) : (
            <div className="w-full h-full flex-1">
              {viewMode === "grid" && (
                <NodeCards items={items} status={status} />
              )}
              {viewMode === "list" && (
                <NodeList items={items} status={status} />
              )}
            </div>
          )}
        </ContextMenuBasic>
      </div>
    </main>
  );
};
