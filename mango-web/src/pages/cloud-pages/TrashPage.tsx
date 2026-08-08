import { EmptyState } from "@/components/shared/EmptyState";
import LoadingUI from "@/components/shared/LoadingUI";
import { TrashCards } from "@/components/shared/TrashCards";
import { Button } from "@/components/ui/button";
import { useNodeActions } from "@/hooks/useNodeActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchTrash,
  selectNode,
  selectNodesStatus,
  selectSelectedId,
  selectTrashItems,
} from "@/redux/nodes/nodesSlice";
import type { NodeDto } from "@/types/node.types";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const TrashPage = () => {
  const { t } = useTranslation("trash-page");
  const { handleEmptyTrash } = useNodeActions();
  const trashItems = useAppSelector(selectTrashItems);
  const status = useAppSelector(selectNodesStatus);
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);

  const handleSelect = (id: string) => {
    dispatch(selectNode(id));
  };

  const handleOpen = (folder: NodeDto) => {
    console.log("aici ceva va fi", folder);
  };

  useEffect(() => {
    dispatch(fetchTrash());
  }, [dispatch]);

  if (status === "loading") return <LoadingUI />;
  if (status === "failed") return <p>ups....</p>;

  return (
    <main className="flex flex-col w-full gap-4 h-full">
      <h1>{t("trash-page.title")}</h1>
      <section>
        <Button onClick={handleEmptyTrash} variant="destructive" size="sm">
          {t("trash-page.empty-trash")}
        </Button>
        {trashItems.length === 0 ? (
          <EmptyState
            media={<Trash />}
            title={t("trash-page.emptyState.title")}
            description={t("trash-page.emptyState.description")}
          />
        ) : (
          <div className="w-full h-full flex flex-wrap gap-4 bg-background">
            {trashItems.map((item) => (
              <TrashCards
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                onSelect={handleSelect}
                onOpen={handleOpen}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
