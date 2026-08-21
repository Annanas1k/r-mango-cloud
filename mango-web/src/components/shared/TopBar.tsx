import { useAppSelector } from "@/redux/hooks";
import { Search, SlidersVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { SidebarTrigger } from "../ui/sidebar";
import { AvatarCircle } from "./AvatarCircle";
import { AvatarDropDownButton } from "./AvatarDropDownButton";
import { SupportDropDownButton } from "./SupportDropDownButton";
import { UpgradeButton } from "./UpgradeButton";

export const TopBar = () => {
  const { t } = useTranslation("topbar");
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="flex sticky top-0 z-30 h-15 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-3 sm:px-4">
      {/* Partea Stângă: Trigger Sidebar + Search */}
      <div className="flex items-center gap-2 flex-1 min-w-0 mr-2 sm:mr-4">
        <SidebarTrigger />

        {/* InputGroup Adaptabil: Pe mobil ocupă spațiul rămas, pe desktop se oprește la o lățime fixă */}
        <InputGroup className="w-full max-w-xs sm:max-w-md md:max-w-xl h-9 sm:h-10 bg-muted rounded-full">
          <InputGroupInput
            placeholder={t("topbar.search")}
            className="text-xs sm:text-sm"
          />
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton className="h-7 w-7 sm:h-8 sm:w-8">
              <SlidersVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Partea Dreaptă: Acțiuni + Avatar */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
        <SupportDropDownButton />

        {/* Ascundem butonul de Upgrade pe telefoane foarte mici pentru a economisi spațiu */}
        <div className="hidden sm:block">
          <UpgradeButton />
        </div>

        <AvatarDropDownButton>
          <button className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
            {user && <AvatarCircle user={user} />}
          </button>
        </AvatarDropDownButton>
      </div>
    </header>
  );
};
