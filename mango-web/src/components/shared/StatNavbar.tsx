import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "react-i18next";

const features = [
  { id: 1, title: "feature 1", description: "Description for feature 1" },
  { id: 2, title: "feature 2", description: "Description for feature 2" },
  { id: 3, title: "feature 3", description: "Description for feature 3" },
  { id: 4, title: "feature 4", description: "Description for feature 4" },
];

export const StartNavbar = () => {
  const { t } = useTranslation('navbar');
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-6">
        <NavigationMenuItem value="overview">
          <NavigationMenuLink href="/">{t("navbar.overview")}</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem value="features" className="hidden md:flex">
          <NavigationMenuTrigger>{t("navbar.features")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
              {features.map((feature) => (
                <NavigationMenuLink key={feature.id} href={`#feature-${feature.id}`} className="flex flex-col gap-1 hover:bg-accent hover:text-accent-foreground rounded-md p-3 transition-colors ">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="about">
          <NavigationMenuLink href="/about">{t("navbar.about")}</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="pricing">
          <NavigationMenuLink href="/pricing">{t("navbar.pricing")}</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};