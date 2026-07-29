import type { NodeDto } from "@/types/node.types"
import LoadingUI from "./LoadingUI"

interface NodeListProps {
    items: NodeDto[];
    status: string
}

export const NodeList = ({items, status}: NodeListProps) =>{
    

    if(status === "loading") return <LoadingUI />
    if(status === "failed") return <p>ups....</p>

    return (
        <div>
        <ul>
            {items.map((i)=>(
                <li key={i.id}>
                    {i.name}
                </li>
            ))}
        </ul>
        </div>
    )
}