// src/modules/quota/config/storage-plans.config.ts

import { StoragePlan } from "src/generated/prisma/enums";

export const STORAGE_PLAN_QUOTAS: Record<StoragePlan, bigint> = {
    FREE: 15_000_000_000n, // 15 GB
    BASIC: 100_000_000_000n, // 100 GB
    PRO: 500_000_000_000n, // 500 GB
    BUSINESS: 2_000_000_000_000n, // 2 TB
};

export function getQuotaForPlan(plan: StoragePlan): bigint {
    return STORAGE_PLAN_QUOTAS[plan];
}