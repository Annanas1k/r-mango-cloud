
import { uploadFile } from "@/api/files.api";
import { createFolder } from "@/api/nodes.api";
import type { NodeDto } from "@/types/node.types";

interface UploadFolderTreeParams {
    fileList: FileList;
    rootParentId: string | null;
    onNodeCreated: (node: NodeDto) => void; // apelat pt FIECARE folder/fișier creat
}

export async function uploadFolderTree({
    fileList,
    rootParentId,
    onNodeCreated,
}: UploadFolderTreeParams): Promise<void> {
    const files = Array.from(fileList) as (File & { webkitRelativePath: string })[];

    // cache: "cale/relativa" -> id-ul folderului deja creat pt acea cale
    const folderIdCache = new Map<string, string | null>();
    folderIdCache.set("", rootParentId); // rădăcina uploadului = folderul curent din UI

    async function ensureFolderPath(path: string): Promise<string | null> {
        if (folderIdCache.has(path)) {
            return folderIdCache.get(path)!;
        }

        const segments = path.split("/");
        const folderName = segments[segments.length - 1];
        const parentPath = segments.slice(0, -1).join("/");
        const parentId = await ensureFolderPath(parentPath); // recursiv - părintele întâi

        const newFolder = await createFolder(folderName, parentId);
        onNodeCreated(newFolder);

        folderIdCache.set(path, newFolder.id);
        return newFolder.id;
    }

    for (const file of files) {
        const pathParts = file.webkitRelativePath.split("/");
        const folderPath = pathParts.slice(0, -1).join("/");
        const parentId = await ensureFolderPath(folderPath);

        try {
            const newFile = await uploadFile(file, parentId);
            onNodeCreated(newFile);
        } catch (err) {
            console.error(`Eroare la upload ${file.name}:`, err);
        }
    }
}