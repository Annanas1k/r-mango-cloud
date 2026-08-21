import { AccountSettings } from "@/components/shared/AccountSettings";
import { GeneralSettings } from "@/components/shared/GeneralSettings";
import { NotificationsSettings } from "@/components/shared/NotificationsSettings";
import { PageToolbar } from "@/components/shared/PageToolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Settings2, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SETTINGS_SECTIONS = [
  {
    value: "general",
    label: "General",
    icon: Settings2,
    component: GeneralSettings,
  },
  {
    value: "account",
    label: "Account",
    icon: User,
    component: AccountSettings,
  },
  {
    value: "notifications",
    label: "Notifications",
    icon: Bell,
    component: NotificationsSettings,
  },
] as const;

type SettingsTab = (typeof SETTINGS_SECTIONS)[number]["value"];

const DEFAULT_TAB: SettingsTab = "general";

export const SettingsPage = () => {
  const { t } = useTranslation("settings");

  const [activeTab, setActiveTab] = useState<SettingsTab>(DEFAULT_TAB);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as SettingsTab)}
      className="flex flex-col w-full h-full"
    >
      <main className="flex flex-col w-full h-full">
        <PageToolbar
          title={t("settings")}
          rootPath="/cloud/settings"
          showInfoButton={false}
          showViewToggle={false}
        >
          <TabsList className="w-fit">
            {SETTINGS_SECTIONS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value} className="gap-2">
                <Icon className="size-4 shrink-0" />
                {t(label)}
              </TabsTrigger>
            ))}
          </TabsList>
        </PageToolbar>

        <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
          <div className="flex-1 min-h-0 overflow-y-auto">
            {SETTINGS_SECTIONS.map(({ value, component: Component }) => (
              <TabsContent key={value} value={value} className="mt-0">
                <Component />
              </TabsContent>
            ))}
          </div>
        </div>
      </main>
    </Tabs>
  );
};
