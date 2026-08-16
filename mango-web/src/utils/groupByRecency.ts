import type { NodeDto } from "@/types/node.types";

export interface RecencyGroup {
    labelKey: string; // cheie de traducere, nu text hardcodat
    items: NodeDto[];
}

function startOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function groupNodesByRecency(items: NodeDto[]): RecencyGroup[] {
    const now = startOfDay(new Date());
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const buckets: Record<string, NodeDto[]> = {
        today: [],
        yesterday: [],
        last7Days: [],
        last30Days: [],
        older: [],
    };

    for (const item of items) {
        if (!item.lastAccessedAt) continue; // safety, nu ar trebui să se întâmple pentru recent

        const accessedDate = startOfDay(new Date(item.lastAccessedAt));

        if (accessedDate.getTime() === now.getTime()) {
            buckets.today.push(item);
        } else if (accessedDate.getTime() === yesterday.getTime()) {
            buckets.yesterday.push(item);
        } else if (accessedDate.getTime() > sevenDaysAgo.getTime()) {
            buckets.last7Days.push(item);
        } else if (accessedDate.getTime() > thirtyDaysAgo.getTime()) {
            buckets.last30Days.push(item);
        } else {
            buckets.older.push(item);
        }
    }

    const order: { key: keyof typeof buckets; labelKey: string }[] = [
        { key: "today", labelKey: "groups.today" },
        { key: "yesterday", labelKey: "groups.yesterday" },
        { key: "last7Days", labelKey: "groups.last7Days" },
        { key: "last30Days", labelKey: "groups.last30Days" },
        { key: "older", labelKey: "groups.older" },
    ];

    return order
        .filter(({ key }) => buckets[key].length > 0)
        .map(({ key, labelKey }) => ({ labelKey, items: buckets[key] }));
}