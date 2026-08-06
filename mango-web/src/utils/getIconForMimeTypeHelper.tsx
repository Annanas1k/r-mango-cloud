import { File as FileIcon, Image, FileText, FileArchive, FileVideo, FileAudio } from "lucide-react";

export function getIconForMimeType(mimeType: string | null, className: string) {
    if (!mimeType) return <FileIcon className={ className } />;
    if (mimeType.startsWith("image/")) return <Image className={ className } />;
    if (mimeType.startsWith("video/")) return <FileVideo className={ className } />;
    if (mimeType.startsWith("audio/")) return <FileAudio className={ className } />;
    if (mimeType.includes("zip") || mimeType.includes("archive")) return <FileArchive className={ className } />;
    if (mimeType.startsWith("text/") || mimeType.includes("pdf")) return <FileText className={ className } />;

    return <FileIcon className={ className } />;
}