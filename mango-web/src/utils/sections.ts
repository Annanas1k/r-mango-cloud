export type Section = "cloud" | "starred" | "trash";

interface SectionMeta {
    rootPath: string;
    basePath: string;
    titleKey: string;
}

export const SECTION_CONFIG: Record<Section, SectionMeta> = {
    cloud: { rootPath: "/cloud/my-cloud", basePath: "/cloud/folder", titleKey: "sections.cloud" },
    starred: { rootPath: "/cloud/starred", basePath: "/cloud/folder", titleKey: "sections.starred" },
    trash: { rootPath: "/cloud/trash", basePath: "/cloud/folder", titleKey: "sections.trash" },
};

export const DEFAULT_SECTION: Section = "cloud";

export const isValidSection = (value: string | null): value is Section =>
    value === "cloud" || value === "starred" || value === "trash";