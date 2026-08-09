// components/ThemeToggle.tsx
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { CustomTooltip } from "./CustomTooltip";
import { useSettings } from "@/hooks/useSettings";

export function ThemeToggle() {
  const { theme, handleToggleTheme } = useSettings();
  return (
    <CustomTooltip
      tooltipMessage={
        theme === "light"
          ? "Comută la tema întunecată"
          : "Comută la tema deschisă"
      }
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleTheme}
        aria-label="Schimbă tema"
      >
        {theme === "light" ? (
          <Moon className="size-4" />
        ) : (
          <Sun className="size-4" />
        )}
      </Button>
    </CustomTooltip>
  );
}
