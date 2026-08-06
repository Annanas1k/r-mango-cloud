import { getDownloadUrl } from "@/api/files.api";
import { deleteNodePermanently, emptyTrash, renameNode, restoreNode, trashNode } from "@/api/nodes.api";
import { useAppDispatch } from "@/redux/hooks";
import { emptyTrashLocally, markAsTrashedLocally, removeItemPermanentlyLocally, restoreFromTrashLocally, updateItemLocally } from "@/redux/nodes/nodesSlice";
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

    async function handleRestore(node: NodeDto) {
        const isConfirmed = window.confirm(`U are sure? "${node.name}"?`);
        if (!isConfirmed) return;
        try {
            await restoreNode(node.id)
            dispatch(restoreFromTrashLocally(node.id));
        } catch (error) {
            console.error("Error restoring file from trash:", error);
        }
    }

    async function handleRemovePermanently(node: NodeDto) {
        const isConfirmed = window.confirm(`U are sure? "${node.name}"?`);
        if (!isConfirmed) return;
        try {
            await deleteNodePermanently(node.id)
            dispatch(removeItemPermanentlyLocally(node.id));
        } catch (error) {
            console.error("Error removing file permanently:", error);
        }
    }

    async function handleEmptyTrash() {
        const isConfirmed = window.confirm(`U are sure? Empty trash?`);
        if (!isConfirmed) return;
        try {
            await emptyTrash()
            dispatch(emptyTrashLocally());
        } catch (error) {
            console.error("Error emptying trash:", error);
        }
    }



    return {
        handleDownload,
        handleRename,
        handleRemoveToTrash,
        handleRestore,
        handleRemovePermanently,
        handleEmptyTrash
    }
}


