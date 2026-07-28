// components/layout/AvatarDropDownButton.tsx
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice";
import { logoutRequest } from "@/api/auth.api";
import { AvatarCircle } from "./AvatarCircle";

export const AvatarDropDownButton = ({children}: {children: React.ReactElement}) => {
  const { t } = useTranslation("topbar");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;


  const handleLogout = async () => {
    await logoutRequest();
    dispatch(logout());
    navigate("/");
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={children}
              />
            }
          />
          <TooltipContent className="text-center flex flex-col justify-center">
            <p className="font-medium">{t("topbar.mangoAccount")}</p>
            <p className="text-xs opacity-80">{user.name}</p>
            <p className="text-xs opacity-80">{user.email}</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="w-64" align="end">
        {/* --- header cu datele userului, acum în interiorul unui Group --- */}
        <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center gap-3 py-3">
                <AvatarCircle user={user} />
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
            <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
            >
            <LogOut className="size-4" />
            {t("topbar.logout")}
            </DropdownMenuItem>
        </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};