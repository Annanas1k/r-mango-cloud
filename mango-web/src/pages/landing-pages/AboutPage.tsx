import { cn } from "@/lib/utils";
import { LayoutDashboard, Server, Globe, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type ServiceKey = "backend" | "web" | "admin";

type ServiceStatus = "active" | "early";

const SERVICES: {
  key: ServiceKey;
  icon: LucideIcon;
  status: ServiceStatus;
}[] = [
  { key: "backend", icon: Server, status: "active" },
  { key: "web", icon: Globe, status: "active" },
  { key: "admin", icon: LayoutDashboard, status: "early" },
];

const StatusDot = ({ status }: { status: ServiceStatus }) => (
  <span className="relative flex items-center justify-center size-2.5 shrink-0">
    {status === "active" && (
      <span className="absolute inline-flex size-full rounded-full bg-primary/60 animate-ping motion-reduce:animate-none" />
    )}
    <span
      className={cn(
        "relative inline-flex size-2 rounded-full",
        status === "active"
          ? "bg-primary"
          : "border border-muted-foreground bg-transparent",
      )}
    />
  </span>
);

export const AboutPage = () => {
  const { t } = useTranslation("about");

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto gap-14 py-4">
      {/* --- hero --- */}
      <section className="flex flex-col gap-5">
        <p className="text-xs font-mono uppercase tracking-widest text-primary">
          {t("eyebrow")}
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-foreground">
          {t("title_line1")}
          <br />
          <span className="text-primary">{t("title_highlight")}</span>
        </h1>

        <p className="text-base text-muted-foreground max-w-prose">
          {t("lede")}{" "}
          <span className="text-foreground font-medium">
            {t("lede_strong")}
          </span>
        </p>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{t("tags.no_funding")}</span>
          <span className="text-border">·</span>
          <span>{t("tags.no_team")}</span>
          <span className="text-border">·</span>
          <span>{t("tags.just_time")}</span>
        </div>
      </section>

      {/* --- components / status list --- */}
      <section className="flex flex-col">
        <div className="flex items-baseline justify-between pb-2 border-b border-border">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("components_heading")}
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            {t("components_count")}
          </span>
        </div>

        {SERVICES.map(({ key, icon: Icon, status }) => (
          <div
            key={key}
            className="grid grid-cols-[auto_1fr_auto] items-start gap-4 py-5 border-b border-border last:border-0"
          >
            <div className="flex items-center justify-center size-9 rounded-md border border-border bg-muted shrink-0">
              <Icon className="size-4 text-foreground" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground mb-1">
                {t(`services.${key}.name`)}
              </h3>
              <p className="text-sm text-muted-foreground max-w-prose">
                {t(`services.${key}.description`)}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1.5 whitespace-nowrap">
              <StatusDot status={status} />
              <span
                className={cn(
                  "font-mono text-xs",
                  status === "active"
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {t(`services.${key}.status`)}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* --- invite --- */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-lg border border-border bg-muted/40 p-6">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            {t("invite_title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-prose">
            {t("invite_text")}
          </p>
        </div>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 shrink-0 transition-opacity hover:opacity-90"
        >
          {t("invite_cta")}
        </a>
      </section>
    </div>
  );
};
