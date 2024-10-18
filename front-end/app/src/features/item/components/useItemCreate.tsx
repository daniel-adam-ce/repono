import { useRooms } from "@/features/room";
import { useState } from "react";
import { useItemCreateMutation } from "../api";
import { ItemCreate } from "../types";

export interface ItemCreateHookType {
    item: Partial<ItemCreate>
    setItem: Function
    createItem: ReturnType<typeof useItemCreateMutation>
    rooms: Array<any>
}

export const useItemCreate = (): ItemCreateHookType => {
    const { rooms } = useRooms();
    const [item, setItem] = useState<Partial<ItemCreate>>({});
    const createItem = useItemCreateMutation();

    return {
        item,
        setItem,
        createItem,
        rooms
    }
}