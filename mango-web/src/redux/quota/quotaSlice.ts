import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStorageUsage, changeStoragePlan, type StorageUsageResponse, type StoragePlan } from "@/api/quota.api";
import type { RootState } from "@/redux/store";

interface QuotaState {
    usedBytes: string;
    quotaBytes: string;
    plan: StoragePlan | null;
    percentUsed: number;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: QuotaState = {
    usedBytes: "0",
    quotaBytes: "0",
    plan: null,
    percentUsed: 0,
    status: "idle",
};

export const fetchQuotaUsage = createAsyncThunk("quota/fetchUsage", async () => {
    return getStorageUsage();
});

export const updateStoragePlan = createAsyncThunk(
    "quota/changePlan",
    async (plan: StoragePlan) => {
        return changeStoragePlan(plan);
    },
);

const quotaSlice = createSlice({
    name: "quota",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const setUsage = (state: QuotaState, action: PayloadAction<StorageUsageResponse>) => {
            state.usedBytes = action.payload.usedBytes;
            state.quotaBytes = action.payload.quotaBytes;
            state.plan = action.payload.plan;
            state.percentUsed = action.payload.percentUsed;
            state.status = "succeeded";
        };

        builder
            .addCase(fetchQuotaUsage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchQuotaUsage.fulfilled, setUsage)
            .addCase(fetchQuotaUsage.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(updateStoragePlan.fulfilled, setUsage);
    },
});

export const selectQuota = (state: RootState) => state.quota;

export default quotaSlice.reducer;