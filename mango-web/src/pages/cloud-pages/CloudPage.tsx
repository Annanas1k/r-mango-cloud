import { createFolder } from "@/api/nodes.api"
import { ContextMenuBasic } from "@/components/shared/ContextMenuBasic"
import { NodeList } from "@/components/shared/NodeList"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addItemLocally, fetchFolder } from "@/redux/nodes/nodesSlice"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export const CloudPage = () => {
    const {t} = useTranslation('cloud-page')

    const dispatch = useAppDispatch()
    
        const items = useAppSelector(state => state.nodes.items)
        const status = useAppSelector(state => state.nodes.status)
        const currentFolderId = useAppSelector(state => state.nodes.currentFolderId)
    
        useEffect(()=>{
            dispatch(fetchFolder(currentFolderId))
        }, [dispatch, currentFolderId])
          const handleClick = async () => {
                try {
                const newFolder = await createFolder("test-folder", currentFolderId);
                dispatch(addItemLocally(newFolder));
                console.log("Folder creat:", newFolder);
                } catch (err) {
                console.error("Eroare la creare folder:", err);
                }
            };



    return (
        <main className="flex flex-col w-full gap-4 h-full">
            <h1 className="text-4xl w-full">{t('cloud-page.title')}</h1>
            <ContextMenuBasic createFolder={handleClick}>
                <div className="w-full h-full flex-1 bg-gray-50">
                    <NodeList  items={items} status={status}/>
                </div>
            </ContextMenuBasic>
        </main>
    )
}