import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useNavigate } from "react-router";

export const UpgradeButton = () => {
  const { t } = useTranslation("topbar");
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              onClick={() => navigate("/cloud/upgrade")}
              variant="secondary"
              className="h-full rounded-2xl p-3 shadow-xs"
            >
              {t("topbar.upgrade")}
            </Button>
          }
        />
        <TooltipContent>{t("topbar.upgradeMessage")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
