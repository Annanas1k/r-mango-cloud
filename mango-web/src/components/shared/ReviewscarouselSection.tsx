"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import ReviewCard, { type Review } from "./ReviewCard";

const avatarColors = [
  "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
];

export default function ReviewsCarousel() {
  const { t } = useTranslation("reviews-carousel");
  const reviews = t("reviews", { returnObjects: true }) as Review[];

  return (
    <section className="w-full py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("intro")}</p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 7000 })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 px-2 py-2">
            {reviews.map((review, i) => (
              <CarouselItem key={i} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <ReviewCard
                  review={review}
                  avatarClassName={avatarColors[i % avatarColors.length]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
