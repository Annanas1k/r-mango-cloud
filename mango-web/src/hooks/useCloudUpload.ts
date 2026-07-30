// hooks/useCloudUpload.ts
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItemLocally } from "@/redux/nodes/nodesSlice";
import { createFolder } from "@/api/nodes.api";
import { uploadFile } from "@/api/files.api";
import { uploadFolderTree } from "@/services/nodeUpload.service";
import type { NodeDto } from "@/types/node.types";

export function useCloudUpload() {
    const dispatch = useAppDispatch();
    const currentFolderId = useAppSelector((state) => state.nodes.currentFolderId);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);


    const addIfVisible = (node: NodeDto) => {
        if (node.parentId === currentFolderId) {
            dispatch(addItemLocally(node));
        }
    };

    const handleCreateFolder = async (name: string) => {
        try {
            const newFolder = await createFolder(name, currentFolderId);
            dispatch(addItemLocally(newFolder));
        } catch (err) {
            console.error("Eroare la creare folder:", err);
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            const newFile = await uploadFile(file, currentFolderId);
            dispatch(addItemLocally(newFile));
        } catch (err) {
            console.error("Eroare la upload:", err);
        }
    };

    const handleFolderUpload = async (fileList: FileList) => {
        await uploadFolderTree({
            fileList,
            rootParentId: currentFolderId,
            onNodeCreated: addIfVisible,
        });
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
        e.target.value = "";
    };

    const handleFolderInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;
        await handleFolderUpload(fileList);
        e.target.value = "";
    };

    return {
        fileInputRef,
        folderInputRef,
        handleCreateFolder,
        handleFileInputChange,
        handleFolderInputChange,
        openFilePicker: () => fileInputRef.current?.click(),
        openFolderPicker: () => folderInputRef.current?.click(),
    };
}