// src/components/common/ContextMenuBasic.tsx
import { FileUp, FolderPlus, FolderUp } from "lucide-react";
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuGroup, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from "../ui/context-menu";
import type React from "react";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";

interface ContextMenuBasicProps {
  children: React.ReactNode;
  createFolder: ()=>void;
  onUploadFileClick: () => void;
  onUploadFolderClick: () => void;

}

export const ContextMenuBasic = ({ children, createFolder, onUploadFileClick, onUploadFolderClick }: ContextMenuBasicProps) => {
    const {t} = useTranslation('cloud-page')

  return (
    <ContextMenu>

      <ContextMenuTrigger className="flex flex-1 w-full h-full min-h-full">
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem className="gap-2 cursor-pointer" onClick={createFolder}>
            <FolderPlus className="h-4 w-4" /> 
            <span>{t('cloud-page.createFolder')}</span>
          </ContextMenuItem>
        </ContextMenuGroup>

        <Separator className="my-1" />

        <ContextMenuGroup>
          <ContextMenuItem className="gap-2 cursor-pointer" onClick={onUploadFileClick}>
            <FileUp className="h-4 w-4" />
            <span>
              {t('cloud-page.fileUpload')}
            </span>
          </ContextMenuItem>
          <ContextMenuItem className="gap-2 cursor-pointer" onClick={onUploadFolderClick}>
            <FolderUp className="h-4 w-4" />
            <span>{t('cloud-page.folderUpload')}</span>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};