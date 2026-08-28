import { OverviewHeroContent } from "@/components/hero/OverviewHeroContent";
import { PageHero } from "@/components/layouts/PageHero";
import WhyMangoSection from "@/components/shared/Whymangosection";

export default function OverviewPage() {
  return (
    <div className="w-full ">
      <PageHero
        variant="image"
        size="screen"
        imageSrc="/images/hero-mango.png"
        imagePosition="center 60%"
        contentPosition="left-center"
      >
        <OverviewHeroContent />
      </PageHero>
      <WhyMangoSection />
    </div>
  );
}
