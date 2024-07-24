import { ColumnDef, Row } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
    title: string
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onRowClick?: (row: Row<TData>) => any
    create?: React.ReactNode
    actions?: React.ReactNode 
}