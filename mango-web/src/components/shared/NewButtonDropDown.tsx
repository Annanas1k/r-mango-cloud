// src/components/common/DropdownMenuBasic.tsx
import { FileUp, FolderPlus, FolderUp } from "lucide-react";
import type React from "react";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { CreateFolderDialog } from "./CreateFolderDialog";
import { useState } from "react";

interface DropdownMenuBasicProps {
  children: React.ReactElement;
  className?: string;
  createFolder: (name: string) => Promise<void> | void;
  onUploadFileClick: () => void;
  onUploadFolderClick: () => void;
}

export const NewButtonDropDown = ({
  children,
  className,
  createFolder,
  onUploadFileClick,
  onUploadFolderClick,
}: DropdownMenuBasicProps) => {
  const { t } = useTranslation("cloud-page");
  const [openCreateFolder, setOpenCreateFolder] = useState(false);

  return (
    <>
      <DropdownMenu>
        {/* 
        - asChild: transmite referința și evenimentele direct copilului ({children}),
          fără să creeze un alt element HTML wrapper.
      */}
        <DropdownMenuTrigger
          render={children}
          nativeButton
          className={className}
        />

        <DropdownMenuContent align="start" sideOffset={6} className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => setOpenCreateFolder(true)}
            >
              <FolderPlus className="h-4 w-4" />
              <span>{t("cloud-page.createFolder")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <Separator className="my-1" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={onUploadFileClick}
            >
              <FileUp className="h-4 w-4" />
              <span>{t("cloud-page.fileUpload")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={onUploadFolderClick}
            >
              <FolderUp className="h-4 w-4" />
              <span>{t("cloud-page.folderUpload")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateFolderDialog
        open={openCreateFolder}
        onOpenChange={setOpenCreateFolder}
        onCreate={createFolder}
      />
    </>
  );
};
