import { Input, TextInput } from "@/components";
import { useRooms } from "@/features/room";
import { useEffect, useState } from "react";
import { useItem, useItemDeleteMutation, useItemUpdateMutation } from "../api";
import { Button } from "@/components/ui/button";

interface Item {
    item_name?: string,
    room_id?: string,
    description?: string,
}

export const EditItem = () => {
    const { rooms, isPending: isPendingRoom } = useRooms();
    const item = useItem();
    const [updatedItem, setUpdatedItem] = useState<Item>({});
    const updateItem = useItemUpdateMutation();
    const deleteItem = useItemDeleteMutation();

    useEffect(() => {
        console.log(item);
    }, [item])

    return (
        <div>
            edit item
            {
                isPendingRoom && item.isPending 
                ? <div>fetching data...</div>
                : <div>
                    <Input
                        value={updatedItem.item_name ?? item?.item?.item_name}
                        placeholder={"ex: Books"}
                        onChange={(e) => {
                            setUpdatedItem({ ...updatedItem, item_name: e.currentTarget.value })
                        }}
                    />
                    <Input
                        value={updatedItem.description ?? item?.item?.description}
                        placeholder={"Description"}
                        onChange={(e) => {
                            setUpdatedItem({ ...updatedItem, description: e.currentTarget.value })
                        }}
                    />
                    <select
                        value={updatedItem?.room_id ?? item?.item?.room_id}
                        onChange={(e) => {
                            setUpdatedItem({ ...updatedItem, room_id: e.currentTarget.value })
                        }}
                        defaultValue={""}
                    >
                        <option value={""} disabled style={{ display: "none" }}>Room</option>
                        {
                            rooms?.map((room) => {
                                return (
                                    <option
                                        value={room.room_id}
                                        key={room.room_id}
                                    >
                                        {
                                            `${room.room_id}-${room.room_name}`
                                        }
                                    </option>
                                )
                            })
                        }
                    </select>
                    <Button
                        onClick={() => {
                            updateItem.mutate(updatedItem);
                        }}
                    >
                        edit
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => {
                            deleteItem.mutate();
                        }}
                    >
                        delete
                    </Button>
                </div>
            }
        </div>
    )
}

export default EditItem;