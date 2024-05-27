import { TextInputField } from "@/components";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRoom, useRoomUpdateMutation } from "../api";

export const EditRoom = () => {

    const room = useRoom();
    const updateRoom = useRoomUpdateMutation();
    const [roomName, setRoomName] = useState<string>();

    return (
        <div>
            <h1>Edit Room</h1>
            {
                room.isPending
                    ? <div>fetching room...</div>
                    : <div>
                        <TextInputField
                            value={roomName ?? room?.room?.room_name }
                            onChange={(e) => {
                                setRoomName(e)
                            }}
                            label={"Room Name"}
                            placeholder={"ex: Office"}
                        />
                        <Button
                            onClick={() => {
                                updateRoom.mutate({ room_name: roomName })
                            }}
                        >
                            edit
                        </Button>
                    </div>
            }
        </div>
    )
}

export default EditRoom;