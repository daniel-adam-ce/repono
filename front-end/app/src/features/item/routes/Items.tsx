import { useItems } from "../api";
import { ItemTable } from "../components";
import { Center } from "@/components";


export const Items = () => {
    const { items } = useItems();

    return (
        <Center>
            <ItemTable
                items={items}
            />
        </Center>
    )
}

export default Items;