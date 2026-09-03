import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface Review {
  name: string;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: Review;
  avatarClassName: string;
}

function StarRating({ rating }: { rating: number }) {
  const { t } = useTranslation("reviews-carousel");

  return (
    <span
      className="flex shrink-0 gap-0.5"
      role="img"
      aria-label={t("rating", { rating })}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "h-4 w-4 fill-orange-400 text-orange-400"
              : "h-4 w-4 text-muted-foreground/30"
          }
        />
      ))}
    </span>
  );
}

export default function ReviewCard({
  review,
  avatarClassName,
}: ReviewCardProps) {
  const initials = review.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("");

  return (
    <Card className="h-full gap-5 bg-background/85 py-6 shadow-sm backdrop-blur-sm [--card-spacing:--spacing(6)]">
      <CardHeader className="flex items-center gap-3">
        <Avatar size="lg" aria-hidden="true">
          <AvatarFallback
            className={`text-xs font-semibold ${avatarClassName}`}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="min-w-0 flex-1 truncate text-sm text-foreground">
          {review.name}
        </CardTitle>
        <CardAction className="ml-auto self-center">
          <StarRating rating={review.rating} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <blockquote className="text-sm leading-relaxed text-foreground">
          “{review.text}”
        </blockquote>
      </CardContent>
    </Card>
  );
}
