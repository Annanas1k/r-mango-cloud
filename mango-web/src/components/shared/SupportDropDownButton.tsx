import { CircleQuestionMark } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { SupportInfoDialog } from "./SupportInfoDialog";

type InfoDialogKey = "help" | "support" | "terms";

export const SupportDropDownButton = () => {
  const { t } = useTranslation("dialogs");
  const [openDialog, setOpenDialog] = useState<InfoDialogKey | null>(null);

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="border-0 rounded-full">
                    <CircleQuestionMark className="size-6 text-muted-foreground transition-colors hover:text-foreground" />
                  </Button>
                }
              />
            }
          />
          <TooltipContent>{t("topbar.support")}</TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpenDialog("help")}
            >
              {t("help.title")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpenDialog("support")}
            >
              {t("support.title")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDialog("terms")}
          >
            {t("terms.title")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" nativeButton>
            <Link
              to="https://github.com/Annanas1k/r-mango-cloud/issues"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {t("sendFeedback")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SupportInfoDialog
        open={openDialog === "help"}
        onOpenChange={(open) => setOpenDialog(open ? "help" : null)}
        title={t("help.title")}
        description={t("help.description")}
        content={t("help.content")}
      />
      <SupportInfoDialog
        open={openDialog === "support"}
        onOpenChange={(open) => setOpenDialog(open ? "support" : null)}
        title={t("support.title")}
        description={t("support.description")}
        content={t("support.content")}
      />
      <SupportInfoDialog
        open={openDialog === "terms"}
        onOpenChange={(open) => setOpenDialog(open ? "terms" : null)}
        title={t("terms.title")}
        description={t("terms.description")}
        content={t("terms.content")}
      />
    </TooltipProvider>
  );
};
