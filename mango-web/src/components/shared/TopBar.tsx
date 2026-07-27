import { useTranslation } from "react-i18next"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group"
import { SidebarTrigger } from "../ui/sidebar"
import { Search, SlidersVertical } from "lucide-react";
import { SupportDropDownButton } from "./SupportDropDownButton";
import { SettingsDropDownButton } from "./SettingsDropDownButton";
import { UpgradeButton } from "./UpgradeButton";
import { AvatarDropDownButton } from "./AvatarDropDownButton";

export const TopBar = () => {
    const {t} = useTranslation('topbar');
    return (
        <header className="flex h-15 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-4">
            <div className="flex items-center">
            <SidebarTrigger />
            <InputGroup className="w-150 h-full bg-muted rounded-full">
            <InputGroupInput placeholder={t('topbar.search')} />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <InputGroupButton><SlidersVertical/></InputGroupButton>
            </InputGroupAddon>
            </InputGroup>
            </div>


            <div className="flex items-center justify-around gap-4">
                <SupportDropDownButton />
                <SettingsDropDownButton />
                <UpgradeButton />
                <AvatarDropDownButton />
            </div>
        </header>
    )
}