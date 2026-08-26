import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/layouts/PageHero";
import { PricingCard } from "@/components/shared/PricingCard";
import PricingFaq from "@/components/shared/PricingFaq";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  id: string;
  media: string;
  price: string;
  featured?: boolean;
  attributeCount: number;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "sprout",
    media: "/images/pricing-sprout.png",
    price: "0",
    attributeCount: 2,
  },
  {
    id: "ripe",
    media: "/images/pricing-ripe.png",
    price: "9",
    featured: true,
    attributeCount: 3,
  },
  {
    id: "harvest",
    media: "/images/pricing-harvest.png",
    price: "29",
    attributeCount: 3,
  },
];

export const PricingPage = () => {
  const { t } = useTranslation("pricing");

  return (
    <div>
      <PageHero
        variant="image"
        size="lg"
        imageSrc="/images/hero-pricing.png"
        contentPosition="left"
      >
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
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-center pb-5">
          Plans & Pricing
        </h1>
        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              title={t(`plans.${plan.id}.title`)}
              description={t(`plans.${plan.id}.description`)}
              media={plan.media}
              price={plan.price}
              featured={plan.featured}
              ctaLabel={t(`plans.${plan.id}.cta`)}
              attributes={Array.from({ length: plan.attributeCount }).map(
                (_, index) => ({
                  id: index + 1,
                  text: t(`plans.${plan.id}.attributes.${index}`),
                }),
              )}
            />
          ))}
        </div>
        <PricingFaq />
      </div>
    </div>
  );
};

export default PricingPage;
