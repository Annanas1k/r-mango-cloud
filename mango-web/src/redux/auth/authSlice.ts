import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../../types/auth.types';

interface AuthState {
    user: UserProfile | null;
    status: "idle" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = { user: null, status: "idle" };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: UserProfile }>) => {
            state.user = action.payload.user;
            state.status = "authenticated";
        },
        setUnauthenticated: (state) => {
            state.user = null;
            state.status = "unauthenticated";
        },
        logout: (state) => {
            state.user = null;
            state.status = "unauthenticated";
        },
    },
});

export const { setCredentials, setUnauthenticated, logout } = authSlice.actions;
export default authSlice.reducer;