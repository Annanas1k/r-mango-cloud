// components/layout/StartHeader.tsx
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { StartNavbar } from "./StatNavbar";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { LoginDialog } from "./LoginDialog";
import { useNavigate } from "react-router";

export const StartHeader = () => {
  const { t } = useTranslation("navbar");
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* 1. Brand Logo & Name */}
        <div 
          onClick={() => navigate("/")} 
          className="flex shrink-0 cursor-pointer items-center gap-3"
        >
          <img
            className="h-11 w-11 object-contain"
            src="/logo/MANOG-ICON.svg"
            alt="rMango Cloud Logo"
          />
          <h1 className="text-lg font-bold sm:text-xl tracking-tight">
            r<span className="text-secondary">Mango</span> Cloud
          </h1>
        </div>

        {/* 2. Navigare NavBar */}
        <div className="hidden md:flex">
          <StartNavbar />
        </div>

        {/* 3. Auth Actions & Controls */}
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="default" size="default" className="hidden sm:inline-flex h-10 px-4">
            {t("navbar.try-free")}
          </Button>

          {user ? (
            <Button
              onClick={() => navigate("/home")}
              variant="outline"
              size="default"
              className="flex h-10 items-center gap-2.5 px-3 py-1 font-medium transition-all hover:bg-accent"
            >
              <span>Go to Cloud</span>
              <Avatar className="h-7 w-7 border">
                <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                <AvatarFallback className="text-xs font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <LoginDialog
              trigger={
                <span  className="h-10 px-4 border rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground flex items-center justify-center">
                  {t("navbar.sign-in")}
                </span>
              }
            />
          )}

          {/* Wrapper pentru a alinia ThemeToggle la aceeași înălțime */}
          <div className="flex h-10 w-10 items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default StartHeader;