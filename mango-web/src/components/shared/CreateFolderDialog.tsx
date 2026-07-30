// components/shared/CreateFolderDialog.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string) => Promise<void> | void; // primit din CloudPage, apelează handleCreateFolder din hook
}

export const CreateFolderDialog = ({ onCreate, open, onOpenChange }: CreateFolderDialogProps) => {
  const { t } = useTranslation("cloud-page");
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = folderName.trim();
    if (!trimmedName) return;

    setLoading(true);
    try {
      await onCreate(trimmedName);
      setFolderName("");
      onOpenChange(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("cloud-page.createFolderDialog.title")}</DialogTitle>
            <DialogDescription>
              {t("cloud-page.createFolderDialog.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            <Label htmlFor="folder-name">
              {t("cloud-page.createFolderDialog.nameLabel")}
            </Label>
            <Input
              id="folder-name"
              autoFocus
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder={t("cloud-page.createFolderDialog.namePlaceholder")}
            />
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              {t("cloud-page.createFolderDialog.cancel")}
            </DialogClose>
            <Button type="submit" disabled={!folderName.trim() || loading}>
              {loading
                ? t("cloud-page.createFolderDialog.creating")
                : t("cloud-page.createFolderDialog.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};