import { ColumnDef } from "@tanstack/react-table"
import { Item } from "../types"
import { DataTable } from "@/components/DataTable"
import { useNavigate, useParams } from "react-router-dom"
import { useMemo } from "react"
import { ItemCreateForm } from "./createForm"
import { useItemCreate } from "./useItemCreate"

interface ItemTableProps {
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

export const ItemTable = ({ items }: ItemTableProps) => {
    const navigate = useNavigate();
    const itemCreate = useItemCreate();

    return (
        <DataTable
            title={"Items"}
            columns={useItemColumns()}
            data={items}
            onRowClick={(row) => {
                navigate(`${row.original.item_id}`)
            }}
            create={
                <ItemCreateForm
                    item={itemCreate.item}
                    onItemChange={(item) => { itemCreate.setItem(item) }}
                    onSubmit={() => {itemCreate.createItem.mutate(itemCreate.item)}}
                    disabled={itemCreate.createItem.isPending}
                    rooms={itemCreate.rooms}
                />
            }
        />
    )
}