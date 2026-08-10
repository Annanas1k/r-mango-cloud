import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { SettingsRow } from "./SettingsRow";
import { useAppSelector } from "@/redux/hooks";
import {
  selectBrowserNotification,
  selectEmailNotification,
} from "@/redux/settings/settingsSlice";
import { useSettings } from "@/hooks/useSettings";

export const NotificationsSettings = () => {
  const { t } = useTranslation("settings");
  const browserNotification = useAppSelector(selectBrowserNotification);
  const emailNotification = useAppSelector(selectEmailNotification);
  const { handleCheckBrowserNotification, handleCheckEmailNotification } =
    useSettings();

  return (
    <div className="flex flex-col gap-0 max-w-xl">
      <h2 className="text-2xl font-medium mb-2">{t("notifications.title")}</h2>

      {/* --- row 1: notificari browser --- */}
      <SettingsRow
        title={t("notifications.browser.title")}
        description={t("notifications.browser.description")}
      >
        <Checkbox
          id="browser-notifications"
          checked={browserNotification}
          onCheckedChange={handleCheckBrowserNotification}
          className={"w-5 h-5 border-2"}
        />
      </SettingsRow>

      <Separator />

      {/* --- row 2: notificari email --- */}
      <SettingsRow
        title={t("notifications.email.title")}
        description={t("notifications.email.description")}
      >
        <Checkbox
          id="email-notifications"
          checked={emailNotification}
          onCheckedChange={handleCheckEmailNotification}
          className={"w-5 h-5 border-2"}
        />
      </SettingsRow>
    </div>
  );
};
