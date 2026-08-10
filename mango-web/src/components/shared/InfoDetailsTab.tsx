import type { NodeDto } from "@/types/node.types";
import { formatBytes } from "@/utils/formatBytesHelper";
import { formatDate } from "@/utils/formatDateHekper";
import { getIconForMimeType } from "@/utils/getIconForMimeTypeHelper";
import {
  Folder as FolderIcon,
  FileType,
  HardDrive,
  History,
  CalendarPlus,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface InfoDetailsTabProps {
  node: NodeDto;
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: "default" | "destructive";
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent = "default",
}: StatCardProps) => (
  <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
    <div
      className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
        accent === "destructive"
          ? "bg-destructive/10 text-destructive"
          : "bg-primary/10 text-primary"
      }`}
    >
      <Icon className="size-4" />
    </div>
    <div className="flex flex-col min-w-0 gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium truncate">{value}</span>
    </div>
  </div>
);

export const InfoDetailsTabs = memo(({ node }: InfoDetailsTabProps) => {
  const { t } = useTranslation("info-side");
  const isFolder = node.type === "FOLDER";

  const icon = isFolder ? (
    <FolderIcon className="size-16 text-primary" strokeWidth={1.5} />
  ) : (
    getIconForMimeType(node.mimeType, "size-16 text-primary")
  );

  return (
    <div className="flex flex-col">
      {/* --- previzualizare mare + nume --- */}
      <div className="flex flex-col items-center gap-3 px-4 py-8 border-b">
        <div className="w-full h-32 flex items-center justify-center rounded-lg bg-muted/40 border border-dashed border-border">
          {icon}
        </div>
        <p className="w-full text-center text-sm font-medium wrap-break-word px-2">
          {node.name}
        </p>
      </div>

      {/* --- proprietăți, sub formă de stat cards --- */}
      <div className="grid grid-cols-2 gap-2 p-4">
        <StatCard
          icon={FileType}
          label={t("details.type")}
          value={
            isFolder
              ? t("details.folder")
              : (node.mimeType ?? t("details.file"))
          }
        />

        {!isFolder && (
          <StatCard
            icon={HardDrive}
            label={t("details.size")}
            value={formatBytes(node.sizeBytes)}
          />
        )}

        <StatCard
          icon={History}
          label={t("details.modified")}
          value={formatDate(node.updatedAt)}
        />
        <StatCard
          icon={CalendarPlus}
          label={t("details.created")}
          value={formatDate(node.createdAt)}
        />

        {node.trashedAt && (
          <StatCard
            icon={Trash2}
            label={t("details.trashed")}
            value={formatDate(node.trashedAt)}
            accent="destructive"
          />
        )}
      </div>
    </div>
  );
});

InfoDetailsTabs.displayName = "InfoDetailsTabs";
