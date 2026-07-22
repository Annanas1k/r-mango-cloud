// store/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, UserProfile } from '../../types/auth.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: UserProfile; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = "authenticated";
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; // <-- fixat aici