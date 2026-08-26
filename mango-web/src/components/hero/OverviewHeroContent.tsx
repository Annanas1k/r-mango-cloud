import { CircleCheckBig } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export const OverviewHeroContent = () => {
  const { t } = useTranslation("overview");

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
        {t("home.hero.titlePrefix")}{" "}
        <span className="bg-linear-to-r from-primary via-orange-300 to-primary bg-clip-text text-transparent">
          {t("home.hero.titleHighlight")}
        </span>
      </h1>

      <p className="mt-4 text-lg text-background/85 sm:text-xl">
        {t("home.hero.subtitle")}
      </p>

      {/* Mini listă cu bife — beneficii rapide, nu features detaliate */}
      <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
        {(["point1", "point2", "point3"] as const).map((key) => (
          <li
            key={key}
            className="flex items-center gap-2 text-sm text-background/90"
          >
            <CircleCheckBig className="h-4 w-4 shrink-0 text-primary" />
            {t(`home.hero.points.${key}`)}
          </li>
        ))}
      </ul>

      <Button size="lg" className="mt-8 text-base" nativeButton>
        <a href="#features">{t("home.hero.cta")}</a>
      </Button>

      {/* Stat-uri — dovadă socială, sub buton, discret, nu concurează cu CTA-ul */}
      <div className="mt-10 flex gap-8 border-t border-background/20 pt-6">
        {(["users", "uptime", "storage"] as const).map((key) => (
          <div key={key}>
            <div className="text-2xl font-bold">
              {t(`home.hero.stats.${key}.value`)}
            </div>
            <div className="text-xs text-background/70">
              {t(`home.hero.stats.${key}.label`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
