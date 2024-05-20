import { ColumnDef } from "@tanstack/react-table"
import { Room } from "../types"
import { DataTable } from "@/components/DataTable"

interface RoomTableProps {
    rooms: Array<Room>
}

const columns: ColumnDef<Room>[] = [
    {
        accessorKey: "room_name",
        header: "Room",
    },
    {
        accessorKey: "email",
        header: "Created By"
    },
    {
        accessorKey: "count",
        header: "# of Items"
    }
]
export const RoomTable = ({rooms}: RoomTableProps) => {
    return (
        <DataTable
            columns={columns}
            data={rooms}
        />
    )
}