import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext, HouseContext } from "@/providers"
import { useContext, useState } from "react"
import { useHouseDeleteMutation, useHouseUpdateMutation } from "../api";

export const HouseSettings = () => {
    const houseContext = useContext(HouseContext);
    const authContext = useContext(AuthContext);
    const [house, setHouse] = useState<Partial<{house_name: string}>>({house_name: houseContext.house?.house_name})
    const updateHouse = useHouseUpdateMutation();
    const deleteHouse = useHouseDeleteMutation();

    return (
        <div>
            settings: 
            {
                JSON.stringify(houseContext.house)
            }
            <Input
                value={house.house_name ?? ""}
                placeholder={"House Name"}
                onChange={(e) => {
                    setHouse({...house, house_name: e.currentTarget.value});
                }}
                disabled={authContext.user.user_id !== houseContext.house?.house_owner}
            />
            <Button
                onClick={() => {
                    updateHouse.mutate(house);
                }}
                disabled={authContext.user.user_id !== houseContext.house?.house_owner}
            >
                Submit
            </Button>
            
            <Button
                onClick={() => {
                    deleteHouse.mutate();
                }}
                variant={"destructive"}
                disabled={authContext.user.user_id !== houseContext.house?.house_owner}
            >
                Delete
            </Button>
        </div>
    )
}

export default HouseSettings;