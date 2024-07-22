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
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { useState } from "react";


interface CreateFieldChildProps {
    value: any,
    onChange: (value: any) => void,
    label: string
}

export const CreateInputField = ({ value, onChange, label }: CreateFieldChildProps) => {
    return (
        <CreateField
            label={label}
        >
            <Input
                id="width"
                // defaultValue="100%"
                className="col-span-2 h-8"
                value={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value)
                }}
            />
        </CreateField>
    )
}

interface CreateSelectFieldProps extends CreateFieldChildProps {

}

export const CreateSelectField = ({ value, onChange, label }: CreateSelectFieldProps) => {
    return (
        <CreateField
            label={label}
        >
            <Input
                id="width"
                // defaultValue="100%"
                className="col-span-2 h-8"
                value={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value)
                }}
            />
        </CreateField>
    )
}

interface b {
    label: string
    children: React.ReactNode
}

export const CreateField = ({ label, children }: b) => {
    return (
        <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor={`${label}`}>{label}</Label>
            {
                children
            }
        </div>
    )
}

interface a {
    title: string,
    description: string,
    children: React.ReactNode
}

export const CreateForm = ({ title, description, children }: a) => {
    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">{title}</h4>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className="grid gap-2">
                {
                    children
                }
            </div>
        </div>
    )
}

export const CreateButtonTable = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    size="sm"
                    className="h-8"
                // variant={"primary"}
                >
                    Create
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
            </PopoverContent>
        </Popover>
    )
}

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

    const [test, setTest] = useState<string>("");


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
                        <div
                            className="flex gap-2"
                        >
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        size="sm"
                                        className="h-8"
                                    // variant={"primary"}
                                    >
                                        Create
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <CreateForm
                                        title={"Item"}
                                        description={"Add an item."}
                                    >
                                        <CreateInputField
                                            value={test}
                                            onChange={(e) => {setTest(e);}}
                                            label="Name"
                                        />
                                    </CreateForm>
                                </PopoverContent>
                            </Popover>
                            <Button
                                size="sm"
                                className="h-8"
                                variant={"secondary"}
                            >
                                Actions
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

