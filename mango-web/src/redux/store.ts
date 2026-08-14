import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import nodesReducer from "./nodes/nodesSlice";
import settingsReducer from "./settings/settingsSlice";
import quotaReducer from "./quota/quotaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nodes: nodesReducer,
        settings: settingsReducer,
        quota: quotaReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch