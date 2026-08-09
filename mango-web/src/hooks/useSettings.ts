import i18n from "@/i18n/i18n.config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectLanguage, selectTheme, setLanguage, toggleDetailsView, toggleTheme, toggleViewMode } from "@/redux/settings/settingsSlice";
import { useEffect } from "react";



export const useSettings = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const language = useAppSelector(selectLanguage);
    function handleToggleViewMode() {
        dispatch(toggleViewMode())
    }

    function handleToggleDetailsView() {
        dispatch(toggleDetailsView())
    }

    function handleToggleTheme() {
        dispatch(toggleTheme());
    }
    function handleSetLanguage(lang: "en" | "ro" | "ru") {
        dispatch(setLanguage(lang));
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    useEffect(() => {
        if (i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, [language]);
    return {
        theme,
        language,
        handleToggleViewMode,
        handleToggleDetailsView,
        handleToggleTheme,
        handleSetLanguage
    }
}