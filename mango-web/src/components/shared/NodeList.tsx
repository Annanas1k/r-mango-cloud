import type { NodeDto } from "@/types/node.types"
import LoadingUI from "./LoadingUI"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface NodeListProps {
    items: NodeDto[];
    status: string
}

export const NodeList = ({items, status}: NodeListProps) =>{
    

    if(status === "loading") return <LoadingUI />
    if(status === "failed") return <p>ups....</p>

    return (
        <div>

        <Table>
            <TableCaption>A LIst of files</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Memory</TableHead>
                    <TableHead>Added at</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((node)=>(
                    <TableRow key={node.id}>
                        <TableCell>{node.name}</TableCell>
                        <TableCell>{node.type}</TableCell>
                        <TableCell>{node.sizeBytes}</TableCell>
                        <TableCell>{node.createdAt}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}