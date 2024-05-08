import { useNavigate } from "react-router-dom"
import { useRooms } from "../api";

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
                    ? <div>
                        {
                            JSON.stringify(rooms)
                        }
                    </div>
                    : <div>
                        loading...
                    </div>

            }
        </div>
    )
}

export default Rooms;