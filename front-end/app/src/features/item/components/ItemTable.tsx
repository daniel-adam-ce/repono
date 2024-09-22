import { ColumnDef } from "@tanstack/react-table"
import { Item } from "../types"
import { CreateForm, DataTable } from "@/components/DataTable"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useMemo } from "react"
import { ItemCreateForm } from "./createForm"

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

import { Button, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthContext, HouseContext } from "@/providers"

const useItemColumns = () => {
    const { houseId } = useParams();

    const columns = useMemo(() => {
        return houseId ? columnsHouse : columnsGlobal
    }, [houseId])

    return columns;
}
const formSchema = z.object({
    item_name: z.string({
        required_error: "Name is required.",
    }),
    description: z.string({
        required_error: "Description is required.",
    }),
    room_id: z.string({
        required_error: "Room is required."
    })
})

type FormSchemaType = z.infer<typeof formSchema>

export const ItemTable = ({ items }: ItemTableProps) => {
    const navigate = useNavigate();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item_name: ""
        }
    })

    function onSubmit(values: FormSchemaType) {
        console.log("call")
        console.log(JSON.stringify(values, null, 2));
    }
    const auth = useContext(AuthContext);
    const house = useContext(HouseContext);
    return (
        <>
            <InputForm/>
            <CreateForm
                title={"Item"}
                description={"Add an item."}
            >
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="item_name"
                            render={({ field }) => (
                                <FormItem
                                    className="space-y-0 flex flex-col justify-end gap-2"
                                >
                                    <div
                                        className="grid grid-cols-3 items-center gap-4"
                                    >
                                        <FormLabel>Name</FormLabel>
                                        <FormControl
                                            className="col-span-2"
                                        >
                                            <Input placeholder="ex: Book" {...field} />
                                        </FormControl>
                                    </div>
                                    <div
                                        className="grid grid-cols-3 items-center gap-4"
                                    >
                                        <div></div>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Select
                                            // value={(house.house?.house_id).toString()}
                                            // onValueChange={(value) => {
                                            //     console.log(value)
                                            //     // if (value !== "-1") {
                                            //     //     navigate(`/house/${value}`);
                                            //     // } else {
                                            //     //     navigate("/")
                                            //     // }
                                            // }}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-[180px] ">
                                                <SelectValue placeholder="House" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup
                                                >

                                                    {
                                                        auth.houses.map((house: any) => {
                                                            return (
                                                                <SelectItem
                                                                    value={(house.house_id).toString()}
                                                                    key={house.house_id}
                                                                >
                                                                    {
                                                                        `${house.house_id}-${house.house_name}`
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        })
                                                    }
                                                    <SelectItem
                                                        value={"-1"}
                                                        key={"dashboard"}
                                                    >
                                                        dashboard
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
            </CreateForm>


            <DataTable
                title={"Items"}
                columns={useItemColumns()}
                data={items}
                onRowClick={(row) => {
                    navigate(`${row.original.item_id}`)
                }}
                create={<ItemCreateForm />}
            />
        </>
    )
}


const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("data");
    }

    return (
        <FormProvider {...form}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        
        </FormProvider>
    )
}