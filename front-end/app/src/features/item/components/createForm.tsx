import { CreateForm, CreateFormButton, CreateInputField, CreateSelectField } from "@/components/DataTable";
import { useRooms } from "@/features/room";
import { useState } from "react";
import { useItemCreateMutation } from "../api";
import { SelectItem } from "@/components";
import { Loader2 } from "lucide-react";


interface Item {
    item_name: string,
    room_id: string,
    description: string,
}

export const ItemCreateForm = () => {
    const { rooms } = useRooms();
    const [item, setItem] = useState<Partial<Item>>({});
    const createItem = useItemCreateMutation();

    return (
        <CreateForm
            title={"Item"}
            description={"Add an item."}
        >
            <CreateInputField
                value={item.item_name}
                onChange={(value) => {
                    setItem({ ...item, item_name: value })
                }}
                label="Name"
                disabled={createItem.isPending}
            />
            <CreateInputField
                value={item.description}
                onChange={(value) => {
                    setItem({ ...item, description: value })
                }
                }
                label="Description"
                disabled={createItem.isPending}
            />
            <CreateSelectField
                value={item.room_id}
                onValueChange={(value) => {
                    setItem({ ...item, room_id: value })
                }}
                label={"Room"}
                placeholder={"Room"}
                disabled={createItem.isPending}
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
                onClick={() => {
                    createItem.mutate(item);
                }}
                disabled={createItem.isPending}
            >
                {createItem.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
            </CreateFormButton>
        </CreateForm>
    )
}