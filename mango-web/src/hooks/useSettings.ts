import { useCallback, useEffect } from "react";
import i18n from "@/i18n/i18n.config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    checkBrowserNotificaion,
    checkEmailNotification,
    openDetailsView,
    selectLanguage,
    selectTheme,
    setInfoTab,
    setLanguage,
    setStartPage,
    setTheme,
    toggleCardPreview,
    toggleDetailsView,
    toggleTheme,
    toggleViewMode
} from "@/redux/settings/settingsSlice";
import { selectNode } from "@/redux/nodes/nodesSlice";
import type { NodeDto } from "@/types/node.types";

export const useSettings = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const language = useAppSelector(selectLanguage);

    const handleToggleViewMode = useCallback(() => dispatch(toggleViewMode()), [dispatch]);
    const handleToggleDetailsView = useCallback(() => dispatch(toggleDetailsView()), [dispatch]);
    const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
    const handleSetTheme = useCallback((value: "light" | "dark") => dispatch(setTheme(value)), [dispatch]);
    const handleSetLanguage = useCallback((lang: "en" | "ro" | "ru") => dispatch(setLanguage(lang)), [dispatch]);
    const handleStartPage = useCallback((value: "home" | "my-cloud") => dispatch(setStartPage(value)), [dispatch]);
    const handleToggleCardPreview = useCallback(() => dispatch(toggleCardPreview()), [dispatch]);
    const handleCheckBrowserNotification = useCallback(() => dispatch(checkBrowserNotificaion()), [dispatch]);
    const handleCheckEmailNotification = useCallback(() => dispatch(checkEmailNotification()), [dispatch]);
    function handleSetInfoTab(tab: "details" | "activity") {
        dispatch(setInfoTab(tab));
    }

    // deschide panoul de detalii pe un tab anume — folosit din node-menu
    function handleOpenInfoPanel(node: NodeDto, tab: "details" | "activity") {
        dispatch(selectNode(node.id));
        dispatch(setInfoTab(tab));
        dispatch(openDetailsView());
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
        handleSetLanguage,
        handleStartPage,
        handleSetTheme,
        handleToggleCardPreview,
        handleCheckBrowserNotification,
        handleCheckEmailNotification,
        handleOpenInfoPanel,
        handleSetInfoTab
    };
};