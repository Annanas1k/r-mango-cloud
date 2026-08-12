import type { UserDTO } from "../types/user.types";
import { api } from "./http";

export const userApi = {
    getAllUsers: () => api.get<UserDTO[]>(`/admin/users`).then((res) => res.data),
    getUserById: (id: string) => api.get<UserDTO>(`/admin/users/${id}`).then((res) => res.data)
}