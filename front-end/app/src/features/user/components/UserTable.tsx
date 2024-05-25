import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/DataTable"
import { User } from "../types"

interface UserTableProps {
    users: Array<User>
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "user_id",
        header: "User ID",
    },
    {
        accessorKey: "email",
        header: "Email"
    },
]

export const UserTable = ({users}: UserTableProps) => {
    return (
        <DataTable
            columns={columns}
            data={users}
        />
    )
}