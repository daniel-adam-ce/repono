import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/DataTable"
import { User } from "../types"

interface UserTableProps {
    users: Array<User>
}

const columns: ColumnDef<User>[] = [
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

export const UserTable = ({users}: UserTableProps) => {
    return (
        <DataTable
            columns={columns}
            data={users}
        />
    )
}