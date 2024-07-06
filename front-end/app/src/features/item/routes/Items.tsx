import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useItems } from "../api";
import { ItemTable } from "../components";
import { Center } from "@/components";


export const Items = () => {
    const navigate = useNavigate();
    const { items } = useItems();

    return (
        <Center>
            <Button
                onClick={() => {
                    navigate("create");
                }}
            >
                create
            </Button>
            <div>
                <ItemTable
                    items={items}
                />
            </div>
        </Center>
    )
}

export default Items;