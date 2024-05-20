import { useNavigate } from "react-router-dom"
import { useRooms } from "../api";
import { RoomTable } from "../components";

export const Rooms = () => {
    const navigate = useNavigate();
    const { rooms, isPending } = useRooms();

    return (
        <div>
            <button
                onClick={() => {
                    navigate("create")
                }}
            >
                create
            </button>
            {
                !isPending
                    ? <RoomTable
                        rooms={rooms}
                    />
                    : <div>
                        loading...
                    </div>

            }
        </div>
    )
}

export default Rooms;