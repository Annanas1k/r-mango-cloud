export interface NodeDto {
    id: string;
    type: "FILE" | "FOLDER";
    name: string;
    parentId: string | null;
    mimeType: string | null;      // null pentru foldere
    sizeBytes: string;             // BigInt serializat ca string
    trashedAt: string | null;      // ISO date, null dacă nu e în trash
    createdAt: string;
    updatedAt: string;
    isStarred: boolean;
}

export interface BreadcrumbItem {
    id: string;
    name: string;
}

export interface ToggleStarResponse {
    starred: boolean;
}

export interface TrashActionResponse {
    success: boolean;
}

export interface TrashCountResponse {
    success: boolean;
    trashedCount?: number;
    deletedCount?: number;
}