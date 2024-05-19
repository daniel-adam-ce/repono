import { ColumnDef } from "@tanstack/react-table"
import { Item } from "../types"
import { DataTable } from "@/components/DataTable"

interface ItemTableProps {
    items: Array<Item>
}

const columns: ColumnDef<Item>[] = [
    {
        accessorKey: "item_name",
        header: "Item",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "room_name",
        header: "Room"
    },
    {
        accessorKey: "email",
        header: "Created By"
    }
]

export const ItemTable = ({items}: ItemTableProps) => {
    return (
        <DataTable
            columns={columns}
            data={items}
        />
    )
}