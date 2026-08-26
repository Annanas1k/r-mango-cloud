import { useTranslation } from "react-i18next";

export const AboutHeroContent = () => {
  const { t } = useTranslation("about");
  return (
    <div className="max-w-2xl">
      <h1 className="text4xl font-bold leading-tight sm:text-6xl">
        {t("hero.titlePrefix")}{" "}
        <span className="bg-linear-to-r from-primary via-orange-300 to-primary bg-clip-text text-transparent">
          {t("hero.titleHighlight")}
        </span>
      </h1>{" "}
    </div>
  );
};
