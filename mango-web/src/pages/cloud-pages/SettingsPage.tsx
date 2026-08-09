import { AccountSettings } from "@/components/shared/AccountSettings";
import { AvatarCircle } from "@/components/shared/AvatarCircle";
import { AvatarDropDownButton } from "@/components/shared/AvatarDropDownButton";
import { GeneralSettings } from "@/components/shared/GeneralSettings";
import { NotificationsSettings } from "@/components/shared/NotificationsSettings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/redux/hooks";
import { ArrowLeft, Bell, Settings2, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";

const SETTINGS_SECTIONS = [
  {
    value: "account",
    label: "Account",
    icon: User,
    component: AccountSettings,
  },
  {
    value: "general",
    label: "General",
    icon: Settings2,
    component: GeneralSettings,
  },
  {
    value: "notifications",
    label: "Notifications",
    icon: Bell,
    component: NotificationsSettings,
  },
] as const;

type SettingsTab = (typeof SETTINGS_SECTIONS)[number]["value"];

const VALID_TABS = SETTINGS_SECTIONS.map((s) => s.value);
const DEFAULT_TAB: SettingsTab = "general";

export const SettingsPage = () => {
  const { t } = useTranslation("settings");
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab");
  const activeTab: SettingsTab = VALID_TABS.includes(tabFromUrl as SettingsTab)
    ? (tabFromUrl as SettingsTab)
    : DEFAULT_TAB;

  const handleTabChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("tab", value);
        return next;
      },
      { replace: true },
    );
  };

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <header className="flex items-center justify-between w-full px-4 py-3 border-b border-border bg-background">
        <div className="flex gap-3">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {t("settings")}
          </h1>
        </div>

        <AvatarDropDownButton>
          <button
            type="button"
            className="relative flex items-center justify-center rounded-full outline-none ring-offset-background transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {user && <AvatarCircle user={user} />}
          </button>
        </AvatarDropDownButton>
      </header>

      <div className="flex-1 px-6 pb-6">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          orientation="vertical"
          className="flex-row w-full h-full gap-8"
        >
          <TabsList className="flex-col h-fit w-56 shrink-0 items-stretch bg-transparent p-0 gap-1">
            {SETTINGS_SECTIONS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="justify-start gap-2 px-3 py-2 data-[state=active]:bg-primary"
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* --- conținut, dreapta --- */}
          <div className="flex-1 min-w-0">
            {SETTINGS_SECTIONS.map(({ value, component: Component }) => (
              <TabsContent key={value} value={value} className="mt-0">
                <Component />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};
