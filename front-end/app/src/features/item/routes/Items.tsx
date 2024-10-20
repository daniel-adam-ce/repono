import { useItems } from "../api";
import { ItemTable, useItemCreate } from "../components";
import { Center } from "@/components";


export const Items = () => {
    const { items } = useItems();
    const itemCreate = useItemCreate();

    return (
        <Center>
            <ItemTable
                items={items}
                item={itemCreate.item}
                onItemChange={(item) => { itemCreate.setItem(item) }}
                onSubmit={() => {itemCreate.createItem.mutate(itemCreate.item)}}
                disabled={itemCreate.createItem.isPending}
                rooms={itemCreate.rooms}
            />
        </Center>
    )
}

export default Items;