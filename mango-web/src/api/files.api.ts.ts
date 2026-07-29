import type { NodeDto } from "@/types/node.types"
import { api } from "./axiosInstance"
import type { FileResponce } from "@/types/file.types"

export const uploadFile = async (file: File, parentId: string | null): Promise<NodeDto> => {
    const formData = new FormData();
    formData.append("file", file);
    if (parentId) {
        formData.append("parentId", parentId);
    }

    const { data } = await api.post<NodeDto>("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};
export const getDownloadUrl = async (id: string) => {
    const { data } = await api.get<FileResponce>(`/files/${id}/download`)
    return data
}

// uploadFile(file, parentId), getDownloadUrl(id)
