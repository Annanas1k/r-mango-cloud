import { FileQuestionMark, X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectSelectedNode } from "@/redux/nodes/nodesSlice";
import { useSettings } from "@/hooks/useSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { InfoActivityTab } from "./InfoActivityTab";
import { InfoDetailsTabs } from "./InfoDetailsTab";
import { EmptyState } from "./EmptyState";
import { useTranslation } from "react-i18next";

export const InfoSideComponent = () => {
    const { t } = useTranslation("info-side");
    const selectedNode = useAppSelector(selectSelectedNode);
    const { handleToggleDetailsView } = useSettings();

    if (!selectedNode) {
        return (
            <div className="flex items-center justify-center h-full p-4">
                <EmptyState 
                    media={<FileQuestionMark className="w-10 h-10 text-muted-foreground" />} 
                    title={t("title.empty")} 
                    description={t("title.emptyDescription")} 
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <div className="flex items-center justify-between border-b pb-3">
                <h1 className="text-lg font-semibold text-foreground truncate pr-2" title={selectedNode.name}>
                    {selectedNode.name}
                </h1>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleToggleDetailsView}
                    className="h-8 w-8 rounded-md shrink-0"
                    aria-label="Close details"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <Tabs defaultValue="details" className="w-full flex-1 flex flex-col">
                <TabsList variant="line" className="w-full justify-start border-b rounded-none p-0 h-auto gap-4">
                    <TabsTrigger value="details" className="pb-2 pt-1 px-1">
                        {t("tabs.details")}
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="pb-2 pt-1 px-1">
                        {t("tabs.activity")}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="flex-1 mt-4 outline-none">
                    <InfoDetailsTabs node={selectedNode} />
                </TabsContent>

                <TabsContent value="activity" className="flex-1 mt-4 outline-none">
                    <InfoActivityTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};