import type { NodeDto } from "@/types/node.types"
import LoadingUI from "./LoadingUI";
import { FolderCard } from "./FolderCard";
import { useState } from "react";
import { FileCard } from "./FileCard";

interface NodeCardsProps {
  items: NodeDto[];
  status: string;
}

export const NodeCards = ({ items, status }: NodeCardsProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(prev => prev === id ? null : id)
  }

  const handleOpen = (folder: NodeDto) => {
    console.log('aici ceva va fi', folder)
  }

  const folders = items.filter((item) => item.type === "FOLDER");
  const files = items.filter((item) => item.type === "FILE" || (!item.type && item.mimeType));

  if (status === "loading") return <LoadingUI />
  if (status === "failed") return <p>ups....</p>

  return (
    <section className="w-full h-auto flex flex-col gap-6">
      {/* --- FOLDERE, sus --- */}
      {folders.length > 0 && (
        <section>
          <h2>Folders</h2>
          <div className="flex flex-wrap gap-4">
            {folders.map((folder) => <FolderCard key={folder.id} folder={folder} isSelected={selectedId === folder.id} onSelect={handleSelect} onOpen={handleOpen} />)}
          </div>
        </section>
      )}

      {/* --- FIȘIERE, jos --- */}
      {files.length > 0 && (
        <section>
          <h2>Files</h2>
          <div className="flex flex-wrap gap-4">
            {files.map((file) => <FileCard key={file.id} file={file} isSelected={selectedId === file.id} onSelect={handleSelect} onOpen={handleOpen} />)}
          </div>
        </section>
      )}
    </section>
  )
}