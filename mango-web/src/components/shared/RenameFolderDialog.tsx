import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface RenameFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string; // Numele actual al fișierului/folderului
  onRename: (newName: string) => Promise<void> | void;
}

export const RenameFolderDialog = ({
  open,
  onOpenChange,
  initialName,
  onRename,
}: RenameFolderDialogProps) => {
  const { t } = useTranslation('node-menu');
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  // Când se deschide dialogul sau se schimbă elementul selectat, actualizăm valoarea din input
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(initialName);
    }
  }, [open, initialName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === initialName) return;

    setLoading(true);
    try {
      await onRename(trimmedName);
      onOpenChange(false); // Închidem dialogul după succes
    } catch (error) {
      console.error("Failed to rename:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            {/* Folosim DialogTitle pentru accesibilitate */}
            <DialogTitle>
              {t("node-menu.renameDialog.title",)}
            </DialogTitle>
            <DialogDescription>
              {t("node-menu.renameDialog.description")}
            </DialogDescription>
          </DialogHeader>

          <div>
            <Input
              id="renameDialog"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose render ={
                <Button type="button" variant="outline">
                {t("node-menu.renameDialog.cancel",)}
              </Button>}
              />

            <Button type="submit" disabled={!name.trim() || name.trim() === initialName || loading}>
              {loading
                ? t("node-menu.renameDialog.saving", )
                : t("node-menu.renameDialog.save",)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};