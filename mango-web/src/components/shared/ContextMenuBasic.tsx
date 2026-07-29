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
  createFolder: ()=>void
}

export const ContextMenuBasic = ({ children, createFolder }: ContextMenuBasicProps) => {
    const {t} = useTranslation('cloud-page')
  return (
    <ContextMenu>
      {/* 
        - asChild: trece evenimentele direct pe copii (opțional, dar recomandat)
        - w-full h-full: ocupă tot spațiul pe lățime și înălțime
        - flex flex-1: se extinde flexibil
      */}
      <ContextMenuTrigger className="flex flex-1 w-full h-full min-h-full">
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem className="gap-2 cursor-pointer">
            <FolderPlus className="h-4 w-4" /> 
            <span onClick={createFolder}>{t('cloud-page.createFolder')}</span>
          </ContextMenuItem>
        </ContextMenuGroup>

        <Separator className="my-1" />

        <ContextMenuGroup>
          <ContextMenuItem className="gap-2 cursor-pointer">
            <FileUp className="h-4 w-4" /> 
            <span>{t('cloud-page.fileUpload')}</span>
          </ContextMenuItem>
          <ContextMenuItem className="gap-2 cursor-pointer">
            <FolderUp className="h-4 w-4" /> 
            <span>{t('cloud-page.folderUpload')}</span>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};