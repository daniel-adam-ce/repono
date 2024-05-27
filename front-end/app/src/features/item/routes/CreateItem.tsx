import { TextInput } from "@/components";
import { useRooms } from "@/features/room";
import { useEffect, useState } from "react";
import { useItemCreateMutation } from "../api";
import { Button } from "@/components/ui/button";

interface Item {
    item_name?: string,
    room_id?: string,
    description?: string,
}

export const CreateItem = () => {
    const { rooms } = useRooms();
    const [item, setItem] = useState<Item>({});
    const createItem = useItemCreateMutation();

    useEffect(() => {
        console.log(item);
    }, [item])
    
    return (
        <div>
            create item
            <div>
                <TextInput
                    value={item.item_name ?? ""}
                    placeholder={"ex: Books"}
                    onChange={(e) => {
                        setItem({...item, item_name: e})
                    }}
                />
                <TextInput
                    value={item.description ?? ""}
                    placeholder={"Description"}
                    onChange={(e) => {
                        setItem({...item, description: e})
                    }}
                />
                <select
                    value={item?.room_id}
                    onChange={(e) => {
                        setItem({...item, room_id: e.currentTarget.value})
                    }}
                    defaultValue={""}
                >
                    <option value={""} disabled style={{display: "none"}}>Room</option>
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
                        createItem.mutate(item);
                    }}
                >
                    submit
                </Button>
            </div>
        </div>
    )
}

export default CreateItem;