export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
}

export interface MeResponse {
    isAdmin: boolean
}
