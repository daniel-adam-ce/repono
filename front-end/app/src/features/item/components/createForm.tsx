import { CreateForm, CreateFormButton, CreateInputField, CreateSelectField } from "@/components/DataTable";
import { SelectItem } from "@/components";
import { Loader2 } from "lucide-react";
import { ItemCreateHookType } from "./useItemCreate";
import { ItemCreate } from "../types";

export interface ItemCreateFormProps {
    item: Partial<ItemCreate>
    onItemChange: (item: Partial<ItemCreate>) => void
    onSubmit: () => any
    disabled: boolean
    rooms: ItemCreateHookType["rooms"]
}

export const ItemCreateForm = ({ item, onItemChange, onSubmit, disabled, rooms }: ItemCreateFormProps) => {

    return (
        <CreateForm
            aria-label="Create Item"
            title={"Item"}
            description={"Add an item."}
        >
            <CreateInputField
                aria-label="Item Name"
                value={item.item_name}
                onChange={(value) => {
                    onItemChange({ ...item, item_name: value })
                }}
                label="Name"
                disabled={disabled }
            />
            <CreateInputField
                aria-label="Item Description"
                value={item.description}
                onChange={(value) => {
                    onItemChange({ ...item, description: value })
                }
                }
                label="Description"
                disabled={disabled}
            />
            <CreateSelectField
                aria-label="Item Room"
                value={item.room_id}
                onValueChange={(value) => {
                    onItemChange({ ...item, room_id: value })
                }}
                label={"Room"}
                placeholder={"Room"}
                disabled={disabled }
            >
                {
                    rooms.map((room) => {
                        return (
                            <SelectItem
                                value={room.room_id}
                                key={room.room_id}
                            >
                                {
                                    `${room.room_id}-${room.room_name}`
                                }
                            </SelectItem>
                        )
                    })
                }
            </CreateSelectField>
            <CreateFormButton
                onClick={onSubmit}
                disabled={disabled}
            >
                {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
            </CreateFormButton>
        </CreateForm>
    )
}