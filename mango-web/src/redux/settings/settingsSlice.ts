import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type ThemeMode = "light" | "dark"
type Language = "en" | "ro" | "ru";
type ViewMode = "grid" | "list"
type StartPage = "home" | "my-cloud"

interface SettingsState {
    theme: ThemeMode;
    language: Language
    viewMode: ViewMode
    detailsView: boolean
    startPage: StartPage
    cardPreview: boolean
    browserNotification: boolean
    emailNotification: boolean
}

function getInitialTheme(): ThemeMode {
    const stored = localStorage.getItem("app_theme");
    if (stored === "light" || stored === "dark") return stored;
    return "light";
}

const initialState: SettingsState = {
    theme: getInitialTheme(),
    language: (localStorage.getItem("app_language") as Language) || "en",
    viewMode: (localStorage.getItem("app_viewMode") as ViewMode) || "grid",
    detailsView: localStorage.getItem("app_detailsView") === "true",
    startPage: (localStorage.getItem("app_startPage") as StartPage) || "home",
    cardPreview: localStorage.getItem("app_cardPreview") === "true",
    browserNotification: localStorage.getItem("app_browserNotification") === "true",
    emailNotification: localStorage.getItem("app_emailNotification") === "true",

}




export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setStartPage: (state, action: PayloadAction<StartPage>) => {
            state.startPage = action.payload;
            localStorage.setItem("app_startPage", action.payload);
        },
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload;
            localStorage.setItem("app_theme", action.payload);
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("app_theme", state.theme);
        },
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload;
            localStorage.setItem("app_language", action.payload);
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === "grid" ? "list" : "grid"
            localStorage.setItem("app_viewMode", state.viewMode)
        },
        toggleDetailsView: (state) => {
            state.detailsView = !state.detailsView;
            localStorage.setItem("app_detailsView", String(state.detailsView));
        },
        toggleCardPreview: (state) => {
            state.cardPreview = !state.cardPreview;
            localStorage.setItem("app_cardPreview", String(state.cardPreview))
        },
        checkBrowserNotificaion: (state) => {
            state.browserNotification = !state.browserNotification;
            localStorage.setItem("app_browserNotification", String(state.browserNotification))
        },
        checkEmailNotification: (state) => {
            state.emailNotification = !state.emailNotification;
            localStorage.setItem("app_emailNotification", String(state.emailNotification))
        },

    }
})

export const {
    setTheme,
    toggleTheme,
    setLanguage,
    toggleViewMode,
    toggleDetailsView,
    setStartPage,
    toggleCardPreview,
    checkBrowserNotificaion,
    checkEmailNotification
} = settingsSlice.actions
export const selectSettings = (state: RootState) => state.settings
export const selectTheme = (state: RootState) => state.settings.theme
export const selectLanguage = (state: RootState) => state.settings.language
export const selectViewMode = (state: RootState) => state.settings.viewMode
export const selectDetailsView = (state: RootState) => state.settings.detailsView
export const selectStartPage = (state: RootState) => state.settings.startPage
export const selectCardPreview = (state: RootState) => state.settings.cardPreview
export const selectBrowserNotification = (state: RootState) => state.settings.browserNotification
export const selectEmailNotification = (state: RootState) => state.settings.emailNotification
export default settingsSlice.reducer;