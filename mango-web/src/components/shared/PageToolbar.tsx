import { useSettings } from "@/hooks/useSettings";
import { useAppSelector } from "@/redux/hooks";
import {
  selectDetailsView,
  selectViewMode,
} from "@/redux/settings/settingsSlice";
import type { BreadcrumbItems } from "@/types/node.types";
import { DotIcon, Info, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router";
import { Toggle } from "../ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { CustomTooltip } from "./CustomTooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface PageToolbarProps {
  title: string;
  rootPath: string;
  breadcrumb?: BreadcrumbItems[];
  basePath?: string;
  fromSection?: string;
  showViewToggle?: boolean;
  showInfoButton?: boolean;
  children?: React.ReactElement;
}

export const PageToolbar = ({
  title,
  rootPath,
  breadcrumb = [],
  basePath = "/cloud/folder",
  fromSection,
  showViewToggle = true,
  showInfoButton = true,
  children,
}: PageToolbarProps) => {
  const viewMode = useAppSelector(selectViewMode);
  const isDetailsOpen = useAppSelector(selectDetailsView);
  const { handleToggleViewMode, handleToggleDetailsView } = useSettings();
  const hasBreadcrumb = breadcrumb.length > 0;

  const buildFolderLink = (id: string) =>
    fromSection ? `${basePath}/${id}?from=${fromSection}` : `${basePath}/${id}`;

  return (
    <div className="flex w-full h-20   justify-between mb-4 sticky top-0 z-10 bg-background px-6 py-4">
      <div className="flex items-center gap-2 min-w-0">
        {/* Root Link / Titlu Rădăcină */}
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem>
              {hasBreadcrumb ? (
                <BreadcrumbLink
                  render={
                    <Link
                      to={rootPath}
                      className="truncate text-xl font-semibold text-muted-foreground transition-colors hover:text-foreground max-w-37.5"
                    >
                      {title}
                    </Link>
                  }
                ></BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="truncate text-xl font-semibold text-foreground tracking-tight">
                  {title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;

              return (
                <span
                  key={item.id || item.name}
                  className="flex items-center gap-2 min-w-0"
                >
                  <BreadcrumbSeparator>
                    <DotIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="truncate text-xl font-semibold text-foreground tracking-tight">
                        {item.name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        render={
                          <Link
                            to={buildFolderLink(item.id)}
                            className="truncate text-xl font-semibold text-muted-foreground transition-colors hover:text-foreground max-w-37.5"
                          >
                            {item.name}
                          </Link>
                        }
                      ></BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        {children}
      </div>
      <div className="flex items-center gap-2">
        {showViewToggle && (
          <div>
            <ToggleGroup
              variant="outline"
              className="flex"
              spacing={0}
              typeof="single"
              value={[viewMode]}
              onValueChange={handleToggleViewMode}
            >
              <CustomTooltip tooltipMessage="list view">
                <ToggleGroupItem
                  value="list"
                  aria-label="List view"
                  className="rounded-r-none "
                >
                  <List className="w-5 h-5" />
                </ToggleGroupItem>
              </CustomTooltip>
              <CustomTooltip tooltipMessage="grid view">
                <ToggleGroupItem
                  value="grid"
                  aria-label="Grid view"
                  className="rounded-l-none "
                >
                  <LayoutGrid className="w-5 h-5" />
                </ToggleGroupItem>
              </CustomTooltip>
            </ToggleGroup>
          </div>
        )}
        {showInfoButton && (
          <div>
            <CustomTooltip tooltipMessage="details">
              <Toggle
                aria-label="details"
                variant="outline"
                pressed={isDetailsOpen}
                onPressedChange={handleToggleDetailsView}
              >
                <Info className="w-5 h-5" />
              </Toggle>
            </CustomTooltip>
          </div>
        )}
      </div>
    </div>
  );
};
