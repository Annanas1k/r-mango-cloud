import { Info, LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Toggle } from "../ui/toggle";
import { useAppSelector } from "@/redux/hooks";
import { selectDetailsView, selectViewMode } from "@/redux/settings/settingsSlice";
import { useSettings } from "@/hooks/useSettings";

interface PageToolbarProps {
    title: string;
    showViewToggle?: boolean;
    showInfoButton?: boolean;
    children?: React.ReactElement;
}



export const PageToolbar = ({ title, showViewToggle = true, showInfoButton = true, children }: PageToolbarProps) => {

    const viewMode  = useAppSelector(selectViewMode)
    const isDetailsOpen = useAppSelector(selectDetailsView)
    const {handleToggleViewMode, handleToggleDetailsView} = useSettings()
    return (
        <div className="flex w-full h-20   justify-between mb-4 sticky top-0 z-10 bg-gray-50 px-6 py-4,">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                    {title}
                </h1>
                {children}
            </div>
            <div className="flex items-center gap-2">
                {showViewToggle && (
                    <div>
                        <ToggleGroup variant="outline" className="flex" spacing={0} typeof="single" value={[viewMode]} onValueChange={handleToggleViewMode}>
                            <ToggleGroupItem value="list" aria-label="List view" className="rounded-r-none ">
                                <List className="w-5 h-5" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="grid" aria-label="Grid view" className="rounded-l-none ">
                                <LayoutGrid className="w-5 h-5" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                )}
                {showInfoButton && (
                    <div>
                        <Toggle aria-label="details" variant="outline" pressed={isDetailsOpen} onPressedChange={handleToggleDetailsView}>
                            <Info className="w-5 h-5" />
                        </Toggle>
                    </div>
                )}
            </div>
        </div>
    )
}