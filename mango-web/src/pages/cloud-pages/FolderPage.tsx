import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ContextMenuBasic } from "@/components/shared/ContextMenuBasic";
import { PageToolbar } from "@/components/shared/PageToolbar";
import { NodeList } from "@/components/shared/NodeList";
import { NodeCards } from "@/components/shared/NodeCards";
import { EmptyState } from "@/components/shared/EmptyState";
import { Folder } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFolder, selectBreadcrumb } from "@/redux/nodes/nodesSlice";
import { selectViewMode } from "@/redux/settings/settingsSlice";
import { useCloudUpload } from "@/hooks/useCloudUpload";
import {
  SECTION_CONFIG,
  DEFAULT_SECTION,
  isValidSection,
} from "@/utils/sections";

export const FolderPage = () => {
  const { t } = useTranslation("common");
  const { folderId } = useParams<{ folderId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const rawFrom = searchParams.get("from");
  const from = isValidSection(rawFrom) ? rawFrom : DEFAULT_SECTION;
  const { rootPath, basePath, titleKey } = SECTION_CONFIG[from];

  const items = useAppSelector((state) => state.nodes.items);
  const status = useAppSelector((state) => state.nodes.status);
  const breadcrumb = useAppSelector(selectBreadcrumb);
  const viewMode = useAppSelector(selectViewMode);

  const {
    fileInputRef,
    folderInputRef,
    handleCreateFolder,
    handleFileInputChange,
    handleFolderInputChange,
    openFilePicker,
    openFolderPicker,
  } = useCloudUpload();

  useEffect(() => {
    if (folderId) dispatch(fetchFolder(folderId));
  }, [dispatch, folderId]);

  const handleOpenFolder = (id: string) => {
    navigate(`${basePath}/${id}?from=${from}`);
  };

  const isLoading = status === "loading";
  const isEmpty = !isLoading && status === "succeeded" && items.length === 0;

  return (
    <main className="flex flex-col w-full h-full">
      <PageToolbar
        title={t(titleKey)}
        rootPath={rootPath}
        basePath={basePath}
        fromSection={from}
        breadcrumb={breadcrumb}
      />
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
              title={t("emptyFolder.title", { defaultValue: "Folder gol" })}
              description={t("emptyFolder.description", {
                defaultValue: "Nu există fișiere sau foldere aici.",
              })}
            />
          ) : (
            <div className="w-full h-full flex-1">
              {viewMode === "grid" && (
                <NodeCards
                  items={items}
                  status={status}
                  onOpenFolder={handleOpenFolder}
                />
              )}
              {viewMode === "list" && (
                <NodeList
                  items={items}
                  status={status}
                  onOpenFolder={handleOpenFolder}
                />
              )}
            </div>
          )}
        </ContextMenuBasic>
      </div>
    </main>
  );
};
