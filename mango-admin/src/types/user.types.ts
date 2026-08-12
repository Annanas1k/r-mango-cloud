export interface UserDTO {
    id: string
    email: string
    name: string
    avatarUrl: string | null
    provider: string
    emailVerified: boolean
    isActive: boolean
    storageQuotaBytes: string
    storageUsedBytes: string
    createdAt: string
    updatedAt?: string
}