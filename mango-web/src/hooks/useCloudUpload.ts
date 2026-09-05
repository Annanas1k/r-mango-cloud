// hooks/useCloudUpload.ts
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItemLocally } from "@/redux/nodes/nodesSlice";
import { createFolder } from "@/api/nodes.api";
import { uploadFile } from "@/api/files.api";
import { uploadFolderTree } from "@/services/nodeUpload.service";
import type { NodeDto } from "@/types/node.types";
import { toast } from "@/components/ui/toast";

export function useCloudUpload() {
    const { t } = useTranslation("cloud-page");
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
            await toast.promise(
                createFolder(name, currentFolderId).then((newFolder) => {
                    dispatch(addItemLocally(newFolder));
                    return newFolder;
                }),
                {
                    loading: {
                        title: t("cloud-page.toasts.createFolderLoading"),
                        description: name,
                    },
                    success: {
                        title: t("cloud-page.toasts.createFolderSuccess"),
                        description: name,
                    },
                    error: {
                        title: t("cloud-page.toasts.createFolderError"),
                        description: name,
                    },
                }
            );
        } catch (err) {
            console.error("Eroare la creare folder:", err);
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            await toast.promise(
                uploadFile(file, currentFolderId).then((newFile) => {
                    dispatch(addItemLocally(newFile));
                    return newFile;
                }),
                {
                    loading: {
                        title: t("cloud-page.toasts.fileUploadLoading"),
                        description: file.name,
                    },
                    success: {
                        title: t("cloud-page.toasts.fileUploadSuccess"),
                        description: file.name,
                    },
                    error: {
                        title: t("cloud-page.toasts.fileUploadError"),
                        description: file.name,
                    },
                }
            );
        } catch (err) {
            console.error("Eroare la upload:", err);
        }
    };

    const handleFolderUpload = async (fileList: FileList) => {
        const countText = `${fileList.length} ${t("cloud-page.toasts.filesCount")}`;
        try {
            await toast.promise(
                uploadFolderTree({
                    fileList,
                    rootParentId: currentFolderId,
                    onNodeCreated: addIfVisible,
                }),
                {
                    loading: {
                        title: t("cloud-page.toasts.folderUploadLoading"),
                        description: countText,
                    },
                    success: {
                        title: t("cloud-page.toasts.folderUploadSuccess"),
                        description: countText,
                    },
                    error: {
                        title: t("cloud-page.toasts.folderUploadError"),
                        description: countText,
                    },
                }
            );
        } catch (err) {
            console.error("Eroare la upload folder:", err);
        }
    };

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            await handleFileUpload(files[i]);
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
        handleFileUpload,
        handleFolderUpload,
        handleFileInputChange,
        handleFolderInputChange,
        openFilePicker: () => fileInputRef.current?.click(),
        openFolderPicker: () => folderInputRef.current?.click(),
    };
}
