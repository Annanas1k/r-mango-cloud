import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import nodesReducer from "./nodes/nodesSlice";
import settingsReducer from "./settings/settingsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nodes: nodesReducer,
        settings: settingsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch