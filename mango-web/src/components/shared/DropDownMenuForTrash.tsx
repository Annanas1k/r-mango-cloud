import { RotateCcw, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import type { NodeDto } from "@/types/node.types";
import { useTranslation } from "react-i18next";
import { useNodeActions } from "@/hooks/useNodeActions";

interface DropDownMenuForTrashProps {
  children: React.ReactElement;
  node: NodeDto;
}
export const DropDownMenuForTrash = ({ children, node }: DropDownMenuForTrashProps) => {
    const { t } = useTranslation("trash-page");
    const {handleRestore, handleRemovePermanently } = useNodeActions();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={children} nativeButton />
            <DropdownMenuContent className="w-auto">
                <DropdownMenuItem className={"cursor-pointer"} onClick={()=>handleRestore(node)}>
                    <RotateCcw />
                    {t('trash-page.restore')}
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer"} onClick={()=>handleRemovePermanently(node)}>
                    <Trash2 />
                    {t('trash-page.delete-permanently')}
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}