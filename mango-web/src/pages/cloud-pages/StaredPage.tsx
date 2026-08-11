import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { NodeCards } from "@/components/shared/NodeCards";
import { NodeList } from "@/components/shared/NodeList";

import { PageToolbar } from "@/components/shared/PageToolbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectViewMode } from "@/redux/settings/settingsSlice";
import { fetchStarred } from "@/redux/nodes/nodesSlice";

export const StarredPage = () => {
  const { t } = useTranslation("starred-page");
  const dispatch = useAppDispatch();

  const viewMode = useAppSelector(selectViewMode);
  const starredItems = useAppSelector((state) => state.nodes.starredList);
  const status = useAppSelector((state) => state.nodes.status);

  useEffect(() => {
    dispatch(fetchStarred());
  }, [dispatch]);

  const isEmpty = status === "succeeded" && starredItems.length === 0;

  return (
    <main className="flex flex-col w-full h-full">
      <PageToolbar title={t("title")} />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        {isEmpty ? (
          <EmptyState
            media={<Star />}
            title={t("emptyState.title")}
            description={t("emptyState.description")}
          />
        ) : (
          <div className="w-full h-full flex-1">
            {viewMode === "grid" && (
              <NodeCards items={starredItems} status={status} />
            )}
            {viewMode === "list" && (
              <NodeList items={starredItems} status={status} />
            )}
          </div>
        )}
      </div>
    </main>
  );
};
