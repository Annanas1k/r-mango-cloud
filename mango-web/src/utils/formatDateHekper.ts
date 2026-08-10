export const formatDate = (
    date: Date | string | number | null | undefined,
    locale: string = "ro-RO"
): string => {
    if (!date) return "-";

    const dateObj = new Date(date);

    // Verificăm dacă data este validă
    if (isNaN(dateObj.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(dateObj);
};