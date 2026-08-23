import { useSettings } from "@/hooks/useSettings";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const LanguageToggle = () => {
  const { language, handleSetLanguage } = useSettings();
  return (
    <ToggleGroup
      spacing={0}
      variant="outline"
      value={[language]}
      onValueChange={(groupValue) => {
        const lang = groupValue[0];
        if (lang === "en" || lang === "ro" || lang === "ru") {
          handleSetLanguage(lang);
        }
      }}
    >
      <ToggleGroupItem
        value="en"
        aria-label="English"
        className={"cursor-pointer"}
      >
        en
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ro"
        aria-label="Romanian"
        className={"cursor-pointer"}
      >
        ro
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ru"
        aria-label="Russian"
        className={"cursor-pointer"}
      >
        ru
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
