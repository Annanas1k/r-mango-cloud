import type { BreadcrumbItems, NodeDto, ToggleStarResponse, TrashActionResponse, TrashCountResponse } from "@/types/node.types"
import { api } from "./axiosInstance"



export const listNodes = async (parentId: string | null): Promise<NodeDto[]> => {
    const { data } = await api.get<NodeDto[]>(`/nodes`, {
        params: parentId ? { parentId } : undefined
    });
    return data;
}

export const createFolder = async (name: string, parentId: string | null): Promise<NodeDto> => {
    const { data } = await api.post<NodeDto>("/nodes/folder", { name, parentId });
    return data;
};

export const getNodeById = async (id: string): Promise<NodeDto> => {
    const { data } = await api.get<NodeDto>(`/nodes/${id}`)
    return data
}

export const getNodeBreadcrumb = async (id: string) => {
    const { data } = await api.get<BreadcrumbItems[]>(`/nodes/${id}/breadcrumb`)
    return data;
}

export const renameNode = async (id: string, newName: string) => {
    const { data } = await api.patch<NodeDto>(`/nodes/${id}/rename`, { name: newName })
    return data;
}

export const touchNodeAccess = async (id: string): Promise<NodeDto> => {
    const { data } = await api.post<NodeDto>(`/nodes/${id}/touch`);
    return data;
};

export const moveNode = async (id: string, parentId: string | null): Promise<NodeDto> => {
    const { data } = await api.patch<NodeDto>(`/nodes/${id}/move`, { parentId })
    return data
}

// star

export const toggleStar = async (id: string): Promise<ToggleStarResponse> => {
    const { data } = await api.post<ToggleStarResponse>(`/nodes/${id}/star`)
    return data
}

export const starredList = async () => {
    const { data } = await api.get<NodeDto[]>(`/nodes/starred`)
    return data
}

// trash
export const trashNode = async (id: string): Promise<TrashCountResponse> => {
    const { data } = await api.delete<TrashCountResponse>(`/nodes/${id}`);
    return data;
};

export const listTrash = async (): Promise<NodeDto[]> => {
    const { data } = await api.get<NodeDto[]>("/nodes/trash");
    return data;
};

export const restoreNode = async (id: string): Promise<TrashActionResponse> => {
    const { data } = await api.post<TrashActionResponse>(`/nodes/${id}/restore`);
    return data;
};

export const deleteNodePermanently = async (id: string): Promise<TrashCountResponse> => {
    const { data } = await api.delete<TrashCountResponse>(`/nodes/${id}/permanent`);
    return data;
};

export const emptyTrash = async (): Promise<TrashCountResponse> => {
    const { data } = await api.post<TrashCountResponse>("/nodes/trash/empty");
    return data;
};


// recent
export const recentList = async (): Promise<NodeDto[]> => {
    const { data } = await api.get<NodeDto[]>(`/nodes/recent`)
    return data
}

