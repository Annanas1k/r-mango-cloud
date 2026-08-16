import { EmptyState } from "@/components/shared/EmptyState";
import { NodeCards } from "@/components/shared/NodeCards";
import { NodeList } from "@/components/shared/NodeList";
import { PageToolbar } from "@/components/shared/PageToolbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchRecent,
  selectNodesStatus,
  selectRecentNodes,
} from "@/redux/nodes/nodesSlice";
import { selectViewMode } from "@/redux/settings/settingsSlice";
import { groupNodesByRecency } from "@/utils/groupByRecency";
import { Clock } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const RecentPage = () => {
  const { t } = useTranslation("recent-page");
  const dispatch = useAppDispatch();

  const viewMode = useAppSelector(selectViewMode);
  const recentItems = useAppSelector(selectRecentNodes);
  const status = useAppSelector(selectNodesStatus);

  useEffect(() => {
    dispatch(fetchRecent());
  }, [dispatch]);

  const groups = useMemo(() => groupNodesByRecency(recentItems), [recentItems]);
  const isEmpty = status === "succeeded" && recentItems.length === 0;

  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar title={t("title")} rootPath="/cloud/home" />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        {isEmpty ? (
          <EmptyState media={<Clock />} title={t("")} description={t("")} />
        ) : (
          groups.map((group) => (
            <div key={group.labelKey} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-muted-foreground">
                {t(group.labelKey)}
              </h2>

              {viewMode === "grid" && (
                <NodeCards items={group.items} status={status} />
              )}
              {viewMode === "list" && (
                <NodeList items={group.items} status={status} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
