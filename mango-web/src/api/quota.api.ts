import { api } from "./axiosInstance";

export type StoragePlan = "FREE" | "BASIC" | "PRO" | "BUSINESS";

export interface StorageUsageResponse {
    usedBytes: string;
    quotaBytes: string;
    plan: StoragePlan;
    percentUsed: number;
}

export const getStorageUsage = async (): Promise<StorageUsageResponse> => {
    const { data } = await api.get<StorageUsageResponse>("/quota/usage");
    return data;
};

export const changeStoragePlan = async (plan: StoragePlan): Promise<StorageUsageResponse> => {
    const { data } = await api.patch<StorageUsageResponse>("/quota/plan", { plan });
    return data;
};