// pages/CloudPage.tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContextMenuBasic } from "@/components/shared/ContextMenuBasic";
import { NodeList } from "@/components/shared/NodeList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFolder } from "@/redux/nodes/nodesSlice";
import { useCloudUpload } from "@/hooks/useCloudUpload";
import { NodeCards } from "@/components/shared/NodeCards";
import { EmptyState } from "@/components/shared/EmptyState";
import { Cloud } from "lucide-react";

export const CloudPage = () => {
  const { t } = useTranslation("cloud-page");
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.nodes.items);
  const status = useAppSelector((state) => state.nodes.status);
  const currentFolderId = useAppSelector((state) => state.nodes.currentFolderId);

  useEffect(() => {
    dispatch(fetchFolder(currentFolderId));
  }, [dispatch, currentFolderId]);

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
    <main className="flex flex-col w-full gap-4 h-full">
      <h1 className="text-4xl w-full">{t("cloud-page.title")}</h1>

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
        {items.length === 0 ? (
          <EmptyState media={<Cloud />}  title={t('cloud-page.emptyState.title')} description={t('cloud-page.emptyState.description')} />
        ): (
          <div className="w-full h-full flex-1 bg-gray-50">
            <NodeCards items={items} status={status}/>
            <NodeList items={items} status={status} />
          </div>
        )}
      </ContextMenuBasic>
    </main>
  );
};