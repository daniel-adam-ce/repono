import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HouseContext } from "@/providers"
import { useContext, useState } from "react"
import { useHouseUpdateMutation } from "../api";

export const HouseSettings = () => {
    const houseContext = useContext(HouseContext);
    const [house, setHouse] = useState<Partial<{house_name: string}>>({house_name: houseContext.house?.house_name})
    const updateHouse = useHouseUpdateMutation();

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
            />
            <Button
                onClick={() => {
                    updateHouse.mutate(house);
                }}
            >
                Submit
            </Button>
        </div>
    )
}

export default HouseSettings;