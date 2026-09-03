"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  MousePointer2,
  Share2,
  HardDrive,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  value: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    value: "security",
    icon: ShieldCheck,
  },
  {
    value: "simplicity",
    icon: MousePointer2,
  },
  {
    value: "sharing",
    icon: Share2,
  },
  {
    value: "storage",
    icon: HardDrive,
  },
];

interface FeatureCopy {
  label: string;
  title: string;
  description: string;
}

export default function FeatureTabsSection() {
  const { t } = useTranslation("feature-tabs");
  const [active, setActive] = useState(features[0].value);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right",
  );
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const featureCopy = t("features", { returnObjects: true }) as FeatureCopy[];
  const activeIndex = features.findIndex((feature) => feature.value === active);
  const activeFeature = features[activeIndex];
  const activeCopy = featureCopy[activeIndex];

  const handleTabChange = (nextValue: string) => {
    const nextIndex = features.findIndex((feature) => feature.value === nextValue);

    if (nextIndex !== -1 && nextIndex !== activeIndex) {
      setSlideDirection(nextIndex > activeIndex ? "right" : "left");
      setActive(nextValue);
    }
  };

  // Update the animated tab indicator position.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector<HTMLElement>(
      `[data-value="${active}"]`,
    );
    if (activeEl) {
      setIndicator({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [active]);

  // Recalculate when tabs wrap on smaller screens.
  useEffect(() => {
    const handleResize = () => {
      const list = listRef.current;
      if (!list) return;
      const activeEl = list.querySelector<HTMLElement>(
        `[data-value="${active}"]`,
      );
      if (activeEl) {
        setIndicator({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);

  return (
    <section className="w-full bg-gradient-to-br from-orange-100 via-amber-50 to-stone-200 px-6 py-20 dark:from-orange-950/40 dark:via-amber-950/20 dark:to-stone-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("intro")}
          </p>
        </div>

        <Tabs value={active} onValueChange={handleTabChange} className="w-full">
          <div className="relative">
            <TabsList
              ref={listRef}
              className="relative h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0"
            >
              {/* Animated indicator behind the active tab. */}
              <span
                className="absolute bottom-0 top-0 z-0 rounded-lg bg-background shadow-sm transition-all duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width }}
              />
              {features.map(({ value, icon: Icon }, index) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  data-value={value}
                  className={cn(
                    "relative z-10 gap-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground",
                    "data-[state=active]:text-foreground data-[state=active]:shadow-none",
                    "transition-colors duration-300",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {featureCopy[index]?.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
          </div>

          <TabsContent
            key={active}
            value={active}
            className={cn(
              "mt-8 grid grid-cols-1 gap-8 md:grid-cols-2",
              "animate-in fade-in duration-300",
              slideDirection === "right"
                ? "slide-in-from-right-8"
                : "slide-in-from-left-8",
            )}
          >
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-200 bg-white/80 dark:border-orange-900 dark:bg-stone-950/60">
                <activeFeature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground">
                {activeCopy?.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {activeCopy?.description}
              </p>
            </div>

            <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-orange-300/80 bg-white/45 dark:border-orange-900/80 dark:bg-stone-950/30">
              <span className="text-sm text-muted-foreground">
                {t("visualContent")} — {activeCopy?.title}
              </span>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
