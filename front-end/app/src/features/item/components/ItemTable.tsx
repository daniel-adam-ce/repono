import { ColumnDef } from "@tanstack/react-table"
import { Item } from "../types"
import { DataTable } from "@/components/DataTable"
import { useParams } from "react-router-dom"
import { useMemo } from "react"
import { ItemCreateForm, ItemCreateFormProps } from "./createForm"

interface ItemTableProps extends ItemCreateFormProps {
    items: Array<Item>
}

const columnsHouse: ColumnDef<Item>[] = [
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

const columnsGlobal: ColumnDef<Item>[] = [
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
        accessorKey: "house_name",
        header: "House"
    },
    {
        accessorKey: "email",
        header: "Created By"
    }
]

const useItemColumns = () => {
    const { houseId } = useParams();

    const columns = useMemo(() => {
        return houseId ? columnsHouse : columnsGlobal
    }, [houseId])

    return columns;
}

export const ItemTable = ({ items, ...props }: ItemTableProps) => {

    return (
        <DataTable
            title={"Items"}
            columns={useItemColumns()}
            data={items}
            // onRowClick={(row) => {
            // navigate(`${row.original.item_id}`)
            // }}
            create={
                <ItemCreateForm
                    {
                    ...props
                    }
                />
            }
        />
    )
}