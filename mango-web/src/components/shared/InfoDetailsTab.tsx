import type { NodeDto } from "@/types/node.types"

interface InfoDetailsTabProps {
    node: NodeDto;
}



export const InfoDetailsTabs = ({node}: InfoDetailsTabProps) =>{
    return (
    <div className="flex flex-col gap-2 p-4">
      <p><strong>Nume:</strong> {node.name}</p>
      <p><strong>Tip:</strong> {node.type}</p>
    </div>
    )
}