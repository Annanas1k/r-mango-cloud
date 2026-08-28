import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Cloud,
  Citrus,
  ShieldCheck,
  ArrowRight,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TOKENS = {
  mango: "#FF9142",
  mangoDeep: "#E8600C",
  mangoSoft: "#FFE8D1",
  leaf: "#6E8F49",
  sky: "#EAF2FB",
  skyLine: "#BFD9F0",
} as const;

interface StepMeta {
  icon: LucideIcon;
  accent: string;
  accentLine: string;
}

const STEP_META: StepMeta[] = [
  { icon: Cloud, accent: TOKENS.sky, accentLine: TOKENS.skyLine },
  { icon: Citrus, accent: TOKENS.mangoSoft, accentLine: TOKENS.mango },
  { icon: ShieldCheck, accent: "#EAF3DE", accentLine: TOKENS.leaf },
];

function useInView<T extends HTMLElement>(
  threshold = 0.25,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Marker({ meta }: { meta: StepMeta }) {
  const Icon = meta.icon;
  return (
    <div
      className="relative z-10 flex items-center justify-center rounded-full shrink-0"
      style={{
        width: 44,
        height: 44,
        background: `linear-gradient(160deg, ${meta.accent}, #FFFFFF)`,
        border: `1.5px solid ${meta.accentLine}`,
        boxShadow: "0 0 0 6px hsl(var(--background))",
      }}
    >
      <Icon size={19} strokeWidth={1.75} color={TOKENS.mangoDeep} />
      <Leaf
        size={12}
        strokeWidth={2}
        color={TOKENS.leaf}
        style={{
          position: "absolute",
          top: -6,
          right: -4,
          transform: "rotate(35deg)",
        }}
      />
    </div>
  );
}

interface TimelineStepProps {
  meta: StepMeta;
  index: number;
}

function TimelineStep({ meta, index }: TimelineStepProps) {
  const { t } = useTranslation("whymango");
  const [ref, inView] = useInView<HTMLDivElement>();
  const isRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[44px_1fr] md:grid-cols-[1fr_44px_1fr] gap-4 md:gap-8 mb-10 last:mb-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      {/* marker: first column on mobile, center column on desktop */}
      <div className="col-start-1 md:col-start-2 flex justify-center pt-1">
        <Marker meta={meta} />
      </div>

      {/* card: second column on mobile; alternates left/right column on desktop */}
      <Card
        className={`col-start-2 row-start-1 ${isRight ? "md:col-start-3" : "md:col-start-1 md:row-start-1"} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
        style={{ borderColor: "transparent" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 12px 28px -14px ${meta.accentLine}88`;
          e.currentTarget.style.borderColor = meta.accentLine;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        <CardHeader className="pb-2">
          <Badge
            variant="secondary"
            className="w-fit text-[11px] font-semibold tracking-widest uppercase"
            style={{ background: meta.accent, color: TOKENS.mangoDeep }}
          >
            {t(`why.steps.${index}.eyebrow`)}
          </Badge>
          <CardTitle className="mt-2 text-lg md:text-xl leading-snug">
            {t(`why.steps.${index}.title`)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-[14px] leading-relaxed">
            {t(`why.steps.${index}.text`)}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default function WhyMangoSection() {
  const { t } = useTranslation("whymango");
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>();

  return (
    <section className="relative w-full px-6 py-16 md:py-20 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-20 -right-20 rounded-full opacity-40"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #EAF2FB 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide"
            style={{ background: TOKENS.mangoSoft, color: TOKENS.mangoDeep }}
          >
            <Citrus size={12} />
            {t("why.badge")}
          </Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            {t("why.title")}{" "}
            <span style={{ color: TOKENS.mangoDeep }}>
              {t("why.titleHighlight")}
            </span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            {t("why.subtitle")}
          </p>
        </div>

        {/* timeline */}
        <div className="relative">
          {/* mobile rail line, centered under 44px marker column (col width 44 -> center 22px) */}
          <div
            className="md:hidden absolute top-0 bottom-0 w-px"
            style={{
              left: 22,
              backgroundImage: `repeating-linear-gradient(to bottom, ${TOKENS.mango} 0 6px, transparent 6px 14px)`,
              opacity: 0.5,
            }}
            aria-hidden="true"
          />
          {/* desktop rail line, centered in the middle 44px column */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, ${TOKENS.mango} 0 6px, transparent 6px 14px)`,
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <div className="relative">
            {STEP_META.map((meta, i) => (
              <TimelineStep key={i} meta={meta} index={i} />
            ))}
          </div>
        </div>

        {/* pricing CTA */}
        <Card
          ref={ctaRef}
          className="mt-4 border-0 overflow-hidden transition-transform duration-300 hover:scale-[1.005]"
          style={{
            background: `linear-gradient(120deg, ${TOKENS.mango}, ${TOKENS.mangoDeep})`,
            boxShadow: ctaInView
              ? "0 20px 45px -20px rgba(232,96,12,0.5)"
              : "none",
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0px)" : "translateY(18px)",
            transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
          }}
        >
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
                {t("why.cta.eyebrow")}
              </p>
              <h3 className="mt-1 text-xl md:text-2xl font-semibold text-white">
                {t("why.cta.title")}
              </h3>
              <p className="mt-1 text-sm md:text-base text-white/85">
                {t("why.cta.subtitle")}
              </p>
            </div>

            <Button
              size="lg"
              className="bg-white text-[--mango-deep] hover:bg-white/90 shrink-0"
              style={{ color: TOKENS.mangoDeep }}
              nativeButton
            >
              <a
                href="/pricing"
                className="group inline-flex items-center gap-2"
              >
                {t("why.cta.button")}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
