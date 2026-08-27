// components/layout/PageHero.tsx
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CornerDownRight } from "lucide-react";

type PageHeroVariant = "gradient" | "image" | "solid";
type PageHeroSize = "sm" | "md" | "lg" | "screen";
type ContentPosition =
  | "center"
  | "top-center"
  | "bottom-center"
  | "left"
  | "left-top"
  | "left-center"
  | "right-center"
  | "bottom-left";

interface PageHeroProps {
  children: React.ReactNode;
  variant?: PageHeroVariant;
  size?: PageHeroSize;
  imageSrc?: string;
  imagePosition?: string;
  overlay?: boolean;
  contentPosition?: ContentPosition;
  className?: string;
}

const sizeMap: Record<PageHeroSize, string> = {
  sm: "min-h-[30vh]",
  md: "min-h-[50vh]",
  lg: "min-h-[70vh]",
  screen: "min-h-screen",
};

// Mapare pentru poziționarea flex a div-ului copil
const positionMap: Record<ContentPosition, string> = {
  center: "items-center justify-center text-center",
  "top-center": "items-center justify-start text-center pt-12 sm:pt-20",
  "bottom-center": "items-center justify-end text-center pb-12 sm:pb-20",
  left: "items-start justify-center text-left",
  "left-top": "items-start justify-start text-left pt-12 sm:pt-20",
  "left-center": "items-start justify-center text-left",
  "right-center": "items-end justify-center text-right",
  "bottom-left": "items-start justify-end text-left pb-12 sm:pb-20",
};

export const PageHero = ({
  children,
  variant = "gradient",
  size = "md",
  imageSrc,
  imagePosition = "center",
  overlay = true,
  contentPosition = "center",
  className,
}: PageHeroProps) => {
  return (
    <section
      className={cn(
        "relative flex w-full overflow-hidden text-background",
        sizeMap[size],
        variant === "gradient" &&
          "bg-linear-to-br from-primary/90 via-primary to-primary/70",
        variant === "solid" && "bg-foreground",
        className,
      )}
    >
      {/* Imaginea de fundal */}
      {variant === "image" && imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}

      {/* Overlay opțional */}
      {variant === "image" && overlay && (
        <div className="absolute inset-0 bg-black/30" />
      )}

      {/* Containerul de conținut — Flex flexibil bazat pe contentPosition */}
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700",
          positionMap[contentPosition],
        )}
      >
        {children}
        <Button nativeButton variant="link">
          <a href="#end">continue</a>
          <CornerDownRight />
        </Button>
        <span id="end" className="w-0 h-0 sticky bottom-0"></span>
      </div>
    </section>
  );
};
