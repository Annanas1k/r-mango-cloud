export function formatBytes(bytes?: string | null): string {
    if (!bytes) return "0 B";
    const num = Number(bytes);
    if (isNaN(num) || num === 0) return "0 B";
    if (num < 1024) return `${num} B`;
    if (num < 1024 ** 2) return `${(num / 1024).toFixed(1)} KB`;
    if (num < 1024 ** 3) return `${(num / 1024 ** 2).toFixed(1)} MB`;
    return `${(num / 1024 ** 3).toFixed(1)} GB`;
}