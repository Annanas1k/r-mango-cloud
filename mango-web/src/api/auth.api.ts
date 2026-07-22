// api/auth.api.ts
import { api } from "./axiosInstance";
import type { GoogleLoginResponse } from "../types/auth.types";

export const googleLoginRequest = async (idToken: string) => {
  const { data } = await api.post<GoogleLoginResponse>("/auth/google", { idToken });
  return data;
};