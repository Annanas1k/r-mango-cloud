// components/layout/StartHeader.tsx
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { StartNavbar } from "./StatNavbar";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { LoginDialog } from "./LoginDialog";
import { useNavigate } from "react-router";
import { selectStartPage } from "@/redux/settings/settingsSlice";
import { useScrolled } from "@/hooks/useScrolled";
import { LanguageToggle } from "./LanguageToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Menu } from "lucide-react";

export const StartHeader = () => {
  const { t } = useTranslation("navbar");
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const startPage = useAppSelector(selectStartPage);
  const scrolled = useScrolled(60);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-colors duration-300 ${
        scrolled
          ? "border-b bg-background/80 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-6 sm:px-6">
        <div
          className={`flex items-center gap-2 px-3 py-2 sm:gap-4 sm:px-6 bg-background rounded-full ${scrolled && "bg-background/50"}`}
        >
          {/* 1. Brand Logo & Name */}
          <div
            onClick={() => navigate("/")}
            className="flex shrink-0 cursor-pointer items-center gap-2 sm:gap-3"
          >
            <img
              className="h-8 w-8 sm:h-11 sm:w-11 object-contain"
              src="/logo/MANOG-ICON.svg"
              alt="rMango Cloud Logo"
            />
            <h1 className="text-base font-bold sm:text-xl tracking-tight">
              r<span className="text-sidebar-primary">Mango</span> Cloud
            </h1>
          </div>

          {/* 2. Navigare NavBar Desktop */}
          <div className="hidden md:flex">
            <StartNavbar />
          </div>
        </div>

        {/* 3. Auth Actions & Controls */}
        <div
          className={`flex shrink-0 items-center gap-1.5 px-3 py-2 sm:gap-3 sm:px-6 bg-background rounded-full ${scrolled && "bg-background/50"}`}
        >
          {user ? (
            <Button
              onClick={() => navigate(`/cloud/${startPage}`)}
              variant="outline"
              size="default"
              className="flex h-9 sm:h-10 items-center gap-2 px-2.5 sm:px-3 py-1 font-medium transition-all hover:bg-accent text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Go to Cloud</span>
              <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border">
                <AvatarImage
                  src={user.avatarUrl ?? undefined}
                  alt={user.name}
                />
                <AvatarFallback className="text-xs font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <LoginDialog
              trigger={
                <span className="h-9 sm:h-10 px-3 sm:px-4 border rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground flex items-center justify-center cursor-pointer">
                  {t("navbar.sign-in")}
                </span>
              }
            />
          )}

          {/* Controls Desktop */}
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center">
            <ThemeToggle />
          </div>
          <div className="hidden md:flex items-center justify-center">
            <LanguageToggle />
          </div>

          {/* 4. Meniu Burger Mobil (Sheet) */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col justify-between p-6"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 object-contain"
                      src="/logo/MANOG-ICON.svg"
                      alt="Logo"
                    />
                    <span>rMango Cloud</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Navigarea principală pe mobil */}
                <div
                  className="flex flex-col gap-4 py-6"
                  onClick={() => setIsOpen(false)}
                >
                  <StartNavbar />
                </div>

                {/* Setări limba jos în meniul mobil */}
                <div className="border-t pt-4 flex flex-col gap-3">
                  <span className="text-xs text-muted-foreground font-medium">
                    Language
                  </span>
                  <div className="flex justify-start">
                    <LanguageToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StartHeader;
