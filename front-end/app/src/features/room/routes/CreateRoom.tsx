import { TextInputField } from "@/components";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRoomMutation } from "../api";

export const CreateRoom = () => {
    const [roomName, setRoomName] = useState<string>("");

    const createRoom = useRoomMutation();

    return (
        <div>
            <h1>Create Room</h1>
            <div>
                <TextInputField
                    value={roomName}
                    onChange={(e) => {
                        setRoomName(e)
                    }}
                    label={"Room Name"}
                    placeholder={"ex: Office"}
                />
                <Button
                    onClick={() => {
                        createRoom.mutate({room_name: roomName})
                    }}
                >
                    create
                </Button>
            </div>
        </div>
    )
}

export default CreateRoom;