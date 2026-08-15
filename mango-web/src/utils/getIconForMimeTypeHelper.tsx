import {
  File as FileIcon,
  FileText,
  FileArchive,
  FileVideo,
  FileAudio,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileJson,
  FileType,
  Presentation,
  FileCog,
} from "lucide-react";

interface FileTypeRule {
  test: (mimeType: string, extension: string) => boolean;
  icon: typeof FileIcon;
}

const EXTENSION_RULES: FileTypeRule[] = [
  // --- Imagini ---
  {
    test: (mime) => mime.startsWith("image/"),
    icon: FileImage,
  },

  // --- Video ---
  {
    test: (mime) => mime.startsWith("video/"),
    icon: FileVideo,
  },

  // --- Audio ---
  {
    test: (mime) => mime.startsWith("audio/"),
    icon: FileAudio,
  },

  // --- Arhive ---
  {
    test: (mime, ext) =>
      mime.includes("zip") ||
      mime.includes("archive") ||
      mime.includes("compressed") ||
      ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"].includes(ext),
    icon: FileArchive,
  },

  // --- Word (doc/docx/odt/rtf) ---
  {
    test: (mime, ext) =>
      mime.includes("wordprocessingml") ||
      mime === "application/msword" ||
      ["doc", "docx", "odt", "rtf"].includes(ext),
    icon: FileText,
  },

  // --- Excel / spreadsheets (xls/xlsx/csv/ods) ---
  {
    test: (mime, ext) =>
      mime.includes("spreadsheetml") ||
      mime === "application/vnd.ms-excel" ||
      mime === "text/csv" ||
      ["xls", "xlsx", "csv", "ods"].includes(ext),
    icon: FileSpreadsheet,
  },

  // --- PowerPoint (ppt/pptx/odp) ---
  {
    test: (mime, ext) =>
      mime.includes("presentationml") ||
      mime === "application/vnd.ms-powerpoint" ||
      ["ppt", "pptx", "odp"].includes(ext),
    icon: Presentation,
  },

  // --- PDF ---
  {
    test: (mime, ext) => mime.includes("pdf") || ext === "pdf",
    icon: FileType,
  },

  // --- JSON ---
  {
    test: (mime, ext) => mime.includes("json") || ext === "json",
    icon: FileJson,
  },

  // --- Cod sursă ---
  {
    test: (_mime, ext) =>
      [
        "js",
        "jsx",
        "ts",
        "tsx",
        "py",
        "java",
        "c",
        "cpp",
        "cs",
        "go",
        "rs",
        "rb",
        "php",
        "html",
        "css",
        "scss",
        "sh",
        "yml",
        "yaml",
        "sql",
        "vue",
        "swift",
        "kt",
      ].includes(ext),
    icon: FileCode,
  },

  // --- Fișiere executabile / sistem ---
  {
    test: (mime, ext) =>
      mime.includes("executable") ||
      ["exe", "msi", "dmg", "apk", "app", "deb", "rpm"].includes(ext),
    icon: FileCog,
  },

  // --- Text simplu ---
  {
    test: (mime, ext) =>
      mime.startsWith("text/") || ["txt", "md", "log"].includes(ext),
    icon: FileText,
  },
];

/**
 * Returnează iconița potrivită pentru un fișier, pe baza mimeType-ului
 * și, ca fallback, a extensiei din numele fișierului (util când
 * mimeType e gol sau generic, ex: "application/octet-stream").
 */
export function getIconForMimeType(
  mimeType: string | null,
  className: string,
  fileName?: string,
) {
  const mime = mimeType?.toLowerCase() ?? "";
  const extension = fileName?.split(".").pop()?.toLowerCase() ?? "";

  const match = EXTENSION_RULES.find((rule) => rule.test(mime, extension));
  const Icon = match?.icon ?? FileIcon;

  return <Icon className={className} />;
}
