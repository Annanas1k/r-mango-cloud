import { EmptyState } from "@/components/shared/EmptyState";
import { NodeCards } from "@/components/shared/NodeCards";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTrash, selectNodesStatus, selectTrashItems } from "@/redux/nodes/nodesSlice";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const TrashPage = () =>{
    const {t} = useTranslation("trash-page");
    const dispatch = useAppDispatch();
    const trashItems = useAppSelector(selectTrashItems);
    const status = useAppSelector(selectNodesStatus);

    useEffect(() => {
        dispatch(fetchTrash());
    }, [dispatch])

    return (
        <main className="flex flex-col w-full gap-4 h-full">
            <h1>TrashPage</h1>
            <section>
        {trashItems.length === 0 ? (
          <EmptyState media={<Trash />}  title={t('trash-page.emptyState.title')} description={t('trash-page.emptyState.description')} />
        ): (
          <div className="w-full h-full flex-1 bg-gray-50">
            <NodeCards items={trashItems} status={status}/>
          </div>
        )}
            </section>
        </main>
    )
}