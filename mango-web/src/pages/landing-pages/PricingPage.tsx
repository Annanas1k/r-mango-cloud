import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/layouts/PageHero";
import { PricingCard } from "@/components/shared/PricingCard";
import PricingFaq from "@/components/shared/PricingFaq";
import { PricingHeroContent } from "@/components/hero/PricingHeroContent";

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
        <PricingHeroContent />
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
