import { Home, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useSettings } from "@/hooks/useSettings";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCardPreview,
  selectStartPage,
} from "@/redux/settings/settingsSlice";
import { Cloud, Moon, Sun } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { SettingsRow } from "./SettingsRow";

export const GeneralSettings = () => {
  const { t } = useTranslation("settings");
  const {
    language,
    handleSetLanguage,
    handleStartPage,
    theme,
    handleSetTheme,
    handleToggleCardPreview,
  } = useSettings();
  const startPage = useAppSelector(selectStartPage);
  const cardPreview = useAppSelector(selectCardPreview);

  return (
    <div className="flex flex-col gap-0 max-w-xl">
      <h2 className="text-2xl font-medium mb-2">{t("general")}</h2>

      {/* --- row 1: pagina de start --- */}
      <SettingsRow
        title={t("start-page.title")}
        description={t("start-page.description")}
      >
        <RadioGroup
          value={startPage}
          onValueChange={handleStartPage}
          className="flex flex-row gap-4"
        >
          <RadioOption value="home" label={t("start-page.home")} icon={Home} />
          <RadioOption
            value="my-cloud"
            label={t("start-page.cloud")}
            icon={Cloud}
          />
        </RadioGroup>
      </SettingsRow>

      <Separator />

      {/* --- row 2: tema --- */}
      <SettingsRow title={t("theme.title")}>
        <RadioGroup
          value={theme}
          onValueChange={handleSetTheme}
          className="flex flex-row gap-4"
        >
          <RadioOption value="light" label={t("theme.light")} icon={Sun} />
          <RadioOption value="dark" label={t("theme.dark")} icon={Moon} />
        </RadioGroup>
      </SettingsRow>

      <Separator />

      {/* --- row 3: preview card --- */}
      <SettingsRow
        title={t("preview-card.title")}
        description={t("preview-card.description")}
      >
        <Checkbox
          id="preview-card"
          defaultChecked
          checked={cardPreview}
          onCheckedChange={handleToggleCardPreview}
          className={"w-5 h-5 border-2"}
        />
      </SettingsRow>

      <Separator />

      {/* --- row 4: limba --- */}
      <SettingsRow title={t("language.title")}>
        <Select value={language} onValueChange={handleSetLanguage}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("language.title")}</SelectLabel>
              <SelectItem value="en">{t("language.en")}</SelectItem>
              <SelectItem value="ro">{t("language.ro")}</SelectItem>
              <SelectItem value="ru">{t("language.ru")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </SettingsRow>
    </div>
  );
};

interface RadioOptionProps {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const RadioOption = ({ value, label, icon: Icon }: RadioOptionProps) => (
  <div className="flex items-center gap-2">
    <RadioGroupItem value={value} id={value} />
    <Label
      htmlFor={value}
      className="flex items-center gap-1.5 font-normal cursor-pointer"
    >
      <Icon className="size-4 text-muted-foreground" />
      {label}
    </Label>
  </div>
);
