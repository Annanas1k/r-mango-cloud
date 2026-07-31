// components/shared/DropDownMenuForCards.tsx
import { Activity, Copy, Download, FolderInput, FolderPen, Info, PencilLine, Share2, Star, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DropDownMenuForCardsProps {
  children: React.ReactElement;
}

export const DropDownMenuForCards = ({ children }: DropDownMenuForCardsProps) => {
  const { t } = useTranslation("node-menu");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={children} nativeButton />

      <DropdownMenuContent className="w-auto">
        <DropdownMenuGroup>
          <DropdownMenuItem className={"cursor-pointer"}>
            <Download />
            {t("node-menu.download")}
          </DropdownMenuItem>
          <DropdownMenuItem className={"cursor-pointer"}>
            <PencilLine />
            {t("node-menu.rename")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Share2 />
              {t("node-menu.share.title")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Share2 />
                  {t("node-menu.share.share")}
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Copy />
                  {t("node-menu.share.copyLink")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderPen />
              {t("node-menu.organize.title")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <FolderInput />
                  {t("node-menu.organize.move")}
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Star />
                  {t("node-menu.organize.toggleStar")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Info />
              {t("node-menu.info.title")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Info />
                  {t("node-menu.info.details")}
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Activity />
                  {t("node-menu.info.activity")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" className={"cursor-pointer"}>
            <Trash />
            {t("node-menu.moveToTrash")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};