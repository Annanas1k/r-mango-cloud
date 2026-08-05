import { getDownloadUrl } from "@/api/files.api";
import { renameNode, trashNode } from "@/api/nodes.api";
import { useAppDispatch } from "@/redux/hooks";
import { markAsTrashedLocally, updateItemLocally } from "@/redux/nodes/nodesSlice";
import type { NodeDto } from "@/types/node.types";


export function useNodeActions() {
    const dispatch = useAppDispatch();

    async function handleDownload(node: NodeDto) {
        try {
            const { url } = await getDownloadUrl(node.id); // ← destructurare corectă

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Download failed: ${response.status}`);
            }
            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = node.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl); // eliberează memoria, altfel se acumulează la fiecare download
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    async function handleRename(node: NodeDto, newName: string) {
        try {
            await renameNode(node.id, newName)
            dispatch(updateItemLocally({ ...node, name: newName }));
        } catch (error) {
            console.error("Error renaming file:", error);
        }
    }

    async function handleRemoveToTrash(node: NodeDto) {
        try {
            await trashNode(node.id)
            dispatch(markAsTrashedLocally(node.id))
        } catch (error) {
            console.error("Error removing file to trash:", error);
        }
    }

    return {
        handleDownload,
        handleRename,
        handleRemoveToTrash
    }
}


