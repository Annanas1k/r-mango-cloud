import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { BadgeCheck } from "lucide-react";

export const PricingHeroContent = () => {
  const { t } = useTranslation("pricing");
  return (
    <div className="max-w-2xl">
      {/* Eyebrow badge — context rapid, înainte de titlu */}
      <Badge variant="outline" className="text-background p-3">
        <BadgeCheck className="text-sidebar-primary" />
        {t("hero.badge")}
      </Badge>

      {/* Titlu cu accent de culoare pe cuvântul cheie */}
      <h1 className="mt-6 text-4xl font-bold bg leading-tight sm:text-6xl">
        {t("hero.titlePrefix")}{" "}
        <span className="bg-linear-to-r from-primary via-orange-300 to-primary bg-clip-text text-transparent">
          {t("hero.titleHighlight")}
        </span>
      </h1>

      <p className="mt-5 max-w-lg text-lg text-background sm:text-xl">
        {t("hero.subtitle")}
      </p>

      {/* CTA direct în hero + micro-trust text, nu doar text pasiv */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" className="text-base">
          {t("hero.cta")}
        </Button>
        <span className="text-sm text-background">{t("hero.ctaNote")}</span>
      </div>
    </div>
  );
};
