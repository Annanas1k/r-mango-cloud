import { EmptyState } from "@/components/shared/EmptyState";
import { PageToolbar } from "@/components/shared/PageToolbar";
import { useTranslation } from "react-i18next";

export const ShareWithMePage = () => {
  const { t } = useTranslation("share");

  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar title={t("title")} rootPath="/cloud/shared-with-me" />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        <EmptyState
          illustrationSrc="/images/empty/empty-share.png"
          title={t("emptyState.title")}
          description={t("emptyState.description")}
        />
      </div>
    </div>
  );
};
