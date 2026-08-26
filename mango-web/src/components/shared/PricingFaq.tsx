import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

// Doar id-uri aici — textul întrebării/răspunsului vine din fișierul de traducere.
// Ca să adaugi o întrebare nouă: pui id-ul aici + cheile corespunzătoare în JSON.
const FAQ_IDS = [
  "upgrade-downgrade",
  "storage-exceeded",
  "cancel-refund",
  "data-security",
  "data-after-cancel",
  "ripe-vs-harvest",
] as const;

export const PricingFaq = () => {
  const { t } = useTranslation("pricing");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-4xl font-bold">{t("faq.title")}</h2>
      <p className="mt-2 text-center text-muted-foreground">
        {t("faq.subtitle")}
      </p>

      <Accordion className="mt-8" multiple>
        {FAQ_IDS.map((id) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className={"cursor-pointer"}>
              {t(`faq.items.${id}.question`)}
            </AccordionTrigger>
            <AccordionContent>{t(`faq.items.${id}.answer`)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PricingFaq;
