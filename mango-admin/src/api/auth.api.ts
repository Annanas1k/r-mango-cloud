// src/services/auth.api.ts

import type { LoginPayload, LoginResponse, MeResponse } from "../types/auth.types"
import { api } from "./http"


export const authApi = {
    login: (payload: LoginPayload) =>
        api.post<LoginResponse>('/admin/auth/login', payload).then((res) => res.data),

    logout: () =>
        api.post<LoginResponse>('/admin/auth/logout').then((res) => res.data),

    me: () =>
        api.get<MeResponse>('/admin/auth/me').then((res) => res.data),
}