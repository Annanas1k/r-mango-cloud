// components/layout/StartFooter.tsx
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyRight } from "./CopyRight";

const footerLinks = {
  product: [
    { labelKey: "footer.product.overview", href: "/#overview" },
    { labelKey: "footer.product.features", href: "/#features" },
    { labelKey: "footer.product.pricing", href: "/#pricing" },
    { labelKey: "footer.product.changelog", href: "/changelog" },
  ],
  company: [
    { labelKey: "footer.company.about", href: "/about" },
    { labelKey: "footer.company.blog", href: "/blog" },
    { labelKey: "footer.company.careers", href: "/careers" },
    { labelKey: "footer.company.contact", href: "/contact" },
  ],
  legal: [
    { labelKey: "footer.legal.privacy", href: "/privacy" },
    { labelKey: "footer.legal.terms", href: "/terms" },
    { labelKey: "footer.legal.security", href: "/security" },
  ],
};

const socials = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiMail, href: "mailto:contact@mangocloud.app", label: "Email" },
];

export const StartFooter = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* --- Brand + newsletter --- */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-baseline gap-1 font-semibold">
              <span className="text-muted-foreground">r</span>
              <span className="text-foreground">Mango</span>
              <span className="text-primary">Cloud</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex max-w-sm items-center gap-2"
            >
              <Input
                type="email"
                placeholder={t("footer.newsletterPlaceholder")}
                className="h-9"
              />
              <Button type="submit" size="sm" className="shrink-0">
                {t("footer.subscribe")}
              </Button>
            </form>

            <div className="flex items-center gap-1 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Product --- */}
          <FooterColumn titleKey="footer.product.title" links={footerLinks.product} t={t} />

          {/* --- Company --- */}
          <FooterColumn titleKey="footer.company.title" links={footerLinks.company} t={t} />

          {/* --- Legal --- */}
          <FooterColumn titleKey="footer.legal.title" links={footerLinks.legal} t={t} />
        </div>

        <Separator className="my-8" />
        <CopyRight />
      </div>
    </footer>
  );
};

function FooterColumn({
  titleKey,
  links,
  t,
}: {
  titleKey: string;
  links: { labelKey: string; href: string }[];
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{t(titleKey)}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}