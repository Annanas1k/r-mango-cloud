import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export const PricingHeroContent = () => {
  const { t } = useTranslation("pricing");
  return (
    <div className="max-w-2xl">
      {/* Eyebrow badge — context rapid, înainte de titlu */}
      <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-primary" />
        {t("hero.badge")}
      </span>

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
