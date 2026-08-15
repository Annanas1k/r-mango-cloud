import { createI18n } from "vue-i18n";

import enSidebar from "@/locales/en/sidebar.json";


const messages = {
    ro: {
    },
    en: {
        sidebar: enSidebar
    },
    ru: {

    }
};

export const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages,
});