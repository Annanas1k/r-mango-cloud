// components/layout/PageHero.tsx
import { cn } from "@/lib/utils"; // dacă ai deja acest helper de la shadcn; altfel șterge linia și folosește template strings

type PageHeroVariant = "gradient" | "image" | "solid";
type PageHeroSize = "sm" | "md" | "lg" | "screen";

interface PageHeroProps {
  children: React.ReactNode;
  variant?: PageHeroVariant;
  size?: PageHeroSize;
  imageSrc?: string; // obligatoriu doar dacă variant="image"
  imagePosition?: string; // ex: "center", "top", "50% 30%"
  overlay?: boolean; // strat semi-transparent peste imagine, ca textul să rămână lizibil
  className?: string; // pentru orice override punctual, fără să modifici componenta
}

const sizeMap: Record<PageHeroSize, string> = {
  sm: "min-h-[30vh]",
  md: "min-h-[50vh]",
  lg: "min-h-[70vh]",
  screen: "min-h-screen",
};

export const PageHero = ({
  children,
  variant = "gradient",
  size = "md",
  imageSrc,
  imagePosition = "center",
  overlay = true,
  className,
}: PageHeroProps) => {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden text-background",
        sizeMap[size],
        variant === "gradient" &&
          "bg-linear-to-br from-primary/90 via-primary to-primary/70",
        variant === "solid" && "bg-foreground",
        className,
      )}
    >
      {/* Imaginea e element separat, NU background CSS — 
          asta rezolvă problema de "nu încape toată" */}
      {variant === "image" && imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}

      {/* Overlay opțional, ca textul să rămână lizibil peste orice imagine */}
      {variant === "image" && overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}

      {/* Conținutul (titlu, text) stă mereu deasupra, indiferent de variantă */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {children}
      </div>
    </section>
  );
};
