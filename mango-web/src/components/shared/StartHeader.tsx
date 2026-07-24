// components/layout/StartHeader.tsx
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { StartNavbar } from "./StatNavbar";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "./ThemeToggle";

export const StartHeader = () => {
  const { t } = useTranslation('navbar');
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2">
          <img
            className="h-10 w-10"
            src="/logo/MANOG-ICON.svg"
            alt="rMango Cloud Logo"
          />
          <h1 className="font-semibold text-base sm:text-lg">
            r<span className="text-secondary">Mango</span> Cloud
          </h1>
        </div>

        {/* Navigare - ascunsă pe mobil */}
        <div className="hidden md:flex">
          <StartNavbar />
        </div>

        {/* Auth */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button variant="default" size="sm" className="hidden sm:inline-flex">
            {t("navbar.try-free")}
          </Button>

          {user ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
              <AvatarFallback className="text-xs">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="outline" size="sm">
              {t("navbar.sign-in")}
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};