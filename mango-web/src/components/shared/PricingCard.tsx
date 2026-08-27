import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";

interface Attribute {
  id: number;
  text: string;
}

interface PricingCardProps {
  title: string;
  media: string;
  description: string;
  attributes: Attribute[];
  price: string;
  period?: string;
  featured?: boolean;
  ctaLabel?: string;
  onSelect?: () => void;
}

export const PricingCard = ({
  title,
  media,
  description,
  attributes,
  price,
  period,
  featured = false,
  ctaLabel,
  onSelect,
}: PricingCardProps) => {
  const { t } = useTranslation("pricing");
  const resolvedPeriod = period ?? t("card.period");
  const resolvedCta = ctaLabel ?? t("card.defaultCta");

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden transition-shadow ",
        featured && "border-primary shadow-lg ring-1 ring-primary",
      )}
    >
      {/* Badge "Recomandat" — vizibil doar pe planul featured, poziționat sus, centrat */}
      {featured && (
        <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
          {t("card.recommended")}
        </span>
      )}

      <CardHeader className="flex flex-col items-center gap-1">
        <div className="w-full flex justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardAction className="text-sm text-muted-foreground">
            {description}
          </CardAction>
        </div>

        {/* Imagine mai mare + prețul suprapus în colțul din dreapta jos */}
        <div className="relative mt-2 h-40 w-full">
          <img
            src={media}
            alt={title}
            className="h-full w-full object-contain "
          />
          <div className="absolute bottom-0 right-0 flex items-baseline gap-1 rounded-lg bg-background/90 px-2 py-1 shadow-sm backdrop-blur">
            <span className="text-2xl font-bold">{price}€</span>
            {price !== "0" && (
              <span className="text-xs text-muted-foreground">
                {resolvedPeriod}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {attributes.map((attr) => (
            <li key={attr.id} className="flex items-center gap-2 text-sm">
              <CircleCheckBig className="h-4 w-4 shrink-0 text-primary" />
              {attr.text}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onSelect}
          variant={featured ? "default" : "outline"}
          className="w-full"
        >
          {resolvedCta}
        </Button>
      </CardFooter>
    </Card>
  );
};
