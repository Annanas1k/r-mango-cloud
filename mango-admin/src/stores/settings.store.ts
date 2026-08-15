import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { watch } from "vue";
import { i18n } from "@/i18n";

export type ThemeMode = "light" | "dark";
export type Language = "en" | "ro" | "ru";

export const useSettingsStore = defineStore("settings", () => {
    const theme = useLocalStorage<ThemeMode>("app-admin-theme", "light");
    const language = useLocalStorage<Language>("app-admin-language", "en");

    function applyThemeClass(mode: ThemeMode) {
        document.documentElement.classList.toggle("dark", mode === "dark");
    }

    applyThemeClass(theme.value);
    watch(theme, (newTheme) => applyThemeClass(newTheme));

    i18n.global.locale.value = language.value;

    watch(language, (newLang) => {
        i18n.global.locale.value = newLang;
    });

    function setTheme() {
        theme.value = theme.value === "light" ? "dark" : "light";
    }

    function setThemeExplicit(mode: ThemeMode) {
        theme.value = mode;
    }

    function setLanguage(lang: Language) {
        language.value = lang; // useLocalStorage salvează automat, nu mai e nevoie de setItem manual
    }

    return { theme, language, setTheme, setThemeExplicit, setLanguage };
});