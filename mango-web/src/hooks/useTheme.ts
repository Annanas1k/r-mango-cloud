// hooks/useTheme.ts
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;

    // dacă userul n-a ales niciodată, respectă preferința sistemului
    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return { theme, toggleTheme };
}