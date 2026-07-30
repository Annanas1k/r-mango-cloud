// src/components/common/DropdownMenuBasic.tsx
import { FileUp, FolderPlus, FolderUp } from "lucide-react";
import type React from "react";
import { Separator } from "../ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";

interface DropdownMenuBasicProps {
  children: React.ReactElement;
  className?: string;
}

export const NewButtonDropDown = ({ children, className }: DropdownMenuBasicProps) => {
    const {t} = useTranslation('cloud-page')
    
  return (
    <DropdownMenu>
      {/* 
        - asChild: transmite referința și evenimentele direct copilului ({children}),
          fără să creeze un alt element HTML wrapper.
      */}
      <DropdownMenuTrigger render={children} nativeButton className={className} />

      <DropdownMenuContent align="start" sideOffset={6} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <FolderPlus className="h-4 w-4" /> 
            <span>{t('cloud-page.createFolder')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <Separator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <FileUp className="h-4 w-4" /> 
            <span>{t('cloud-page.fileUpload')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <FolderUp className="h-4 w-4" /> 
            <span>{t('cloud-page.folderUpload')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};