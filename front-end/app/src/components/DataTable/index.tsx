import Styles from "./index.module.scss";
import * as Types from "./types";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui";



export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick
}: Types.DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // return (
    //     <div className="rounded-md border">
    // <div
    //     style={{
    //         display: "flex",
    //         justifyContent: "space-between"
    //     }}
    // >
    //     <div>
    //         Title
    //     </div>
    //     <div>
    //         actions
    //     </div>
    // </div>
    //         <Table>
    //             <TableHeader>
    //                 {table.getHeaderGroups().map((headerGroup) => (
    //                     <TableRow key={headerGroup.id}>
    //                         {headerGroup.headers.map((header) => {
    //                             return (
    //                                 <TableHead key={header.id}>
    //                                     {header.isPlaceholder
    //                                         ? null
    //                                         : flexRender(
    //                                             header.column.columnDef.header,
    //                                             header.getContext()
    //                                         )}
    //                                 </TableHead>
    //                             )
    //                         })}
    //                     </TableRow>
    //                 ))}
    //             </TableHeader>
    //             <TableBody>
    //                 {table.getRowModel().rows?.length ? (
    //                     table.getRowModel().rows.map((row) => (
    //                         <TableRow
    //                             key={row.id}
    //                             data-state={row.getIsSelected() && "selected"}
    //                             onClick={() => {
    //                                 if (onRowClick) onRowClick(row)
    //                             }}
    //                         >
    //                             {row.getVisibleCells().map((cell) => (
    //                                 <TableCell key={cell.id}>
    //                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //                                 </TableCell>
    //                             ))}
    //                         </TableRow>
    //                     ))
    //                 ) : (
    //                     <TableRow>
    //                         <TableCell colSpan={columns.length} className="h-24 text-center">
    //                             No results.
    //                         </TableCell>
    //                     </TableRow>
    //                 )}
    //             </TableBody>
    //         </Table>
    //     </div>
    // )

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div>
                            Title
                        </div>
                        <div>
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                                variant={"outline"}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </CardTitle>
                {/* <CardDescription>Table Description</CardDescription> */}
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => {
                                        if (onRowClick) onRowClick(row)
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}




export default { DataTable, Styles, Types }

