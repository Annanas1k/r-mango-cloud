import { CircleQuestionMark } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useTranslation } from "react-i18next"


export const SupportDropDownButton = () =>{
    const {t} = useTranslation('topbar')
    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger render={<DropdownMenuTrigger render={
                    <Button variant="outline" className="border-0 rounded-full"><CircleQuestionMark className="size-6 text-muted-foreground transition-colors hover:text-foreground" /></Button>
                    } />}/>                   
                    <TooltipContent>
                        {t('topbar.support')}
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-auto">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            {t('topbar.help')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {t('topbar.support')}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        {t('topbar.termsAndPolicy')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        {t('topbar.sendFeedback')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    )
}