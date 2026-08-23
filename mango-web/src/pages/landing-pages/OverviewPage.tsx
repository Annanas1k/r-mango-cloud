import { PageHero } from "@/components/layouts/PageHero";

export default function OverviewPage() {
  return (
    <div className="w-full ">
      <PageHero
        variant="image"
        size="screen"
        imageSrc="/images/hero-mango.png"
        imagePosition="center 60%"
      >
        <h1 className="text-4xl font-bold sm:text-5xl">Titlul tău aici</h1>
        <p className="mt-4 text-lg opacity-90">Subtitlu</p>
      </PageHero>
      <h1>Welcome to the Start Page</h1>
    </div>
  );
}
