import { Info, LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Toggle } from "../ui/toggle";

interface PageToolbarProps {
    title: string;
    viewMode?: "list" | "grid";
    showViewToggle?: boolean;
    showInfoButton?: boolean;
    children?: React.ReactElement;
}



export const PageToolbar = ({ title, viewMode = "grid", showViewToggle = true, showInfoButton = true, children }: PageToolbarProps) => {

    return (
        <div className="flex w-full h-auto   justify-between mb-4">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                    {title}
                </h1>
                {children}
            </div>
            <div className="flex items-center gap-2">
                {showViewToggle && (
                    <div>
                        <ToggleGroup variant="outline" className="flex" spacing={0}>
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
                        <Toggle aria-label="details" variant="outline">
                            <Info className="w-5 h-5" />
                        </Toggle>
                    </div>
                )}
            </div>
        </div>
    )
}