import { api } from "./axiosInstance";
import type { UserProfile } from "../types/auth.types";

export const googleLoginRequest = async (idToken: string) => {
    const { data } = await api.post<{ user: UserProfile }>("/auth/google", { idToken });
    return data;
};

export const getMeRequest = async () => {
    const { data } = await api.get<UserProfile>("/auth/me");
    return data;
};

export const logoutRequest = async () => {
    await api.post("/auth/logout");
};