import { EmptyState } from "@/components/shared/EmptyState";
import LoadingUI from "@/components/shared/LoadingUI";
import { TrashCards } from "@/components/shared/TrashCards";
import { PageToolbar } from "@/components/shared/PageToolbar";
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

  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar title={t("trash-page.title")} showViewToggle={false} />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        {status === "loading" ? (
          <LoadingUI />
        ) : status === "failed" ? (
          <p>ups....</p>
        ) : trashItems.length === 0 ? (
          <EmptyState
            media={<Trash />}
            title={t("trash-page.emptyState.title")}
            description={t("trash-page.emptyState.description")}
          />
        ) : (
          <>
            <div className="flex justify-end">
              <Button
                onClick={handleEmptyTrash}
                variant="destructive"
                size="sm"
              >
                {t("trash-page.empty-trash")}
              </Button>
            </div>

            <div className="w-full flex-1 flex flex-wrap gap-4">
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
          </>
        )}
      </div>
    </div>
  );
};
