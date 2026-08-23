import { PageHero } from "@/components/layouts/PageHero";

export const PricingPage = () => {
  return (
    <div>
      <PageHero
        variant="image"
        size="lg"
        imageSrc="/images/hero-pricing.png"
        imagePosition="center 100%"
      >
        <h1 className="text-4xl font-bold sm:text-5xl">Titlul tău aici</h1>
        <p className="mt-4 text-lg opacity-90">Subtitlu</p>
      </PageHero>
      <h1>Pricing Page</h1>
      <p>This is the pricing page of the application.</p>
    </div>
  );
};
