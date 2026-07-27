import {  Settings } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useTranslation } from "react-i18next"


export const SettingsDropDownButton = () =>{
    const {t} = useTranslation('topbar')
    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger render={<DropdownMenuTrigger render={
                    <Button variant="outline" className="border-0 rounded-full"><Settings className="size-6 text-muted-foreground transition-colors hover:text-foreground" /></Button>
                    } />}/>                   
                    <TooltipContent>
                        {t('topbar.settings')}
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-auto">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            {t('topbar.settings')}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    )
}