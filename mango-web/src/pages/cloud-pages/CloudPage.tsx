// pages/CloudPage.tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContextMenuBasic } from "@/components/shared/ContextMenuBasic";
import { NodeList } from "@/components/shared/NodeList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFolder, selectBreadcrumb } from "@/redux/nodes/nodesSlice";
import { useCloudUpload } from "@/hooks/useCloudUpload";
import { NodeCards } from "@/components/shared/NodeCards";
import { EmptyState } from "@/components/shared/EmptyState";
import { Cloud } from "lucide-react";
import { PageToolbar } from "@/components/shared/PageToolbar";
import { selectViewMode } from "@/redux/settings/settingsSlice";

export const CloudPage = () => {
  const { t } = useTranslation("cloud-page");
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.nodes.items);
  const status = useAppSelector((state) => state.nodes.status);
  const currentFolderId = useAppSelector(
    (state) => state.nodes.currentFolderId,
  );
  const viewMode = useAppSelector(selectViewMode);
  const breadcrumb = useAppSelector(selectBreadcrumb);

  useEffect(() => {
    dispatch(fetchFolder(null));
  }, [dispatch]);

  const isStale = currentFolderId !== null;
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
      <PageToolbar
        title={t("cloud-page.title")}
        rootPath="/cloud/my-cloud"
        breadcrumb={breadcrumb}
      ></PageToolbar>
      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        {/* inputuri "invizibile", declanșate programatic din context menu */}
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
              media={<Cloud />}
              title={t("cloud-page.emptyState.title")}
              description={t("cloud-page.emptyState.description")}
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
