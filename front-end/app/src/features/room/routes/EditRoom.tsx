import { TextInputField } from "@/components";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRoom, useRoomDeleteMutation, useRoomUpdateMutation } from "../api";

export const EditRoom = () => {

    const room = useRoom();
    const updateRoom = useRoomUpdateMutation();
    const deleteRoom = useRoomDeleteMutation();
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
                        <Button
                            variant={"destructive"}
                            onClick={() => {
                                deleteRoom.mutate()
                            }}
                        >
                            delete
                        </Button>
                    </div>
            }
        </div>
    )
}

export default EditRoom;