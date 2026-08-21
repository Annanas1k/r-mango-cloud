import type { NodeDto } from "@/types/node.types";
import LoadingUI from "./LoadingUI";
import { FolderCard } from "./FolderCard";
import { FileCard } from "./FileCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectNode,
  selectSelectedId,
  touchAccess,
} from "@/redux/nodes/nodesSlice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface NodeCardsProps {
  items: NodeDto[];
  status: string;
  onOpenFolder?: (id: string) => void;
}

export const NodeCards = ({ items, status, onOpenFolder }: NodeCardsProps) => {
  const { t } = useTranslation("node-cards");
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);

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

  const folders = useMemo(
    () => items.filter((item) => item.type === "FOLDER"),
    [items],
  );

  const files = useMemo(
    () =>
      items.filter(
        (item) => item.type === "FILE" || (!item.type && item.mimeType),
      ),
    [items],
  );

  if (status === "loading") return <LoadingUI />;
  if (status === "failed")
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        ups....
      </div>
    );

  return (
    <section className="flex h-auto w-full flex-col gap-4 sm:gap-6">
      {/* --- FOLDERE, sus --- */}
      {folders.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold sm:mb-3 sm:text-base md:text-lg">
            {t("folders")}
          </h2>
          {/* Grid responsive: 2 coloane pe mobil, scalând până la 6 pe ecran foarte mare */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                isSelected={selectedId === folder.id}
                onSelect={handleSelect}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </section>
      )}

      {/* --- FIȘIERE, jos --- */}
      {files.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold sm:mb-3 sm:text-base md:text-lg">
            {t("files")}
          </h2>
          {/* Grid responsive optimizat pentru preview-uri de fișiere */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedId === file.id}
                onSelect={handleSelect}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};
