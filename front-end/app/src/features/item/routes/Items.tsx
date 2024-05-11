import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export const Items = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button
                onClick={() => {
                    navigate("create");
                }}
            >
                create
            </Button>
            <div>items</div>
        </div>
    )
}

export default Items;