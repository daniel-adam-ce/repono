import { HouseContext } from "@/providers/house";
import { useContext } from "react";

export const Dashboard = () => {
    const houseContext = useContext(HouseContext);
    return (
        <div>
            {
                JSON.stringify(houseContext.house)
            }
        </div>
    );
};

export default Dashboard;
