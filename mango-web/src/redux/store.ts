import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import nodesReducer from "./nodes/nodesSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        nodes: nodesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch