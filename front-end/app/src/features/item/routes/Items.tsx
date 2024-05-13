import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useItems } from "../api";


export const Items = () => {
    const navigate = useNavigate();
    const { items } = useItems();

    return (
        <div>
            <Button
                onClick={() => {
                    navigate("create");
                }}
            >
                create
            </Button>
            <div>
                {
                    JSON.stringify(items)
                }
            </div>
        </div>
    )
}

export default Items;