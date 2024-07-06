import { ColumnDef, Row } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onRowClick?: (row: Row<TData>) => any
    
}