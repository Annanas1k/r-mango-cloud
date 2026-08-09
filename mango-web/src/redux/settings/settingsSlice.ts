import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type ThemeMode = "light" | "dark"
type Language = "en" | "ro" | "ru";
type ViewMode = "grid" | "list"


interface SettingsState {
    theme: ThemeMode;
    language: Language
    viewMode: ViewMode
    detailsView: boolean
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
    detailsView: localStorage.getItem("app_detailsView") === "true"
}




export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
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
        }
    }
})

export const { setTheme, toggleTheme, setLanguage, toggleViewMode, toggleDetailsView } = settingsSlice.actions
export const selectSettings = (state: RootState) => state.settings
export const selectTheme = (state: RootState) => state.settings.theme
export const selectLanguage = (state: RootState) => state.settings.language
export const selectViewMode = (state: RootState) => state.settings.viewMode
export const selectDetailsView = (state: RootState) => state.settings.detailsView
export default settingsSlice.reducer;