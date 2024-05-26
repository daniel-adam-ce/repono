import { Button, Input } from "@/components";
import { useState } from "react";
import { useCreateUserMutation } from "../api";


export const CreateUser = () => {
    const [email, setEmail] = useState<string>("");
    const createUser = useCreateUserMutation();

    return (
        <div>
            <h1>Create Room</h1>
            <div>
                <Input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                    placeholder={"Email"}
                />
                <Button
                    onClick={() => {
                        console.log('clicked')
                        createUser.mutate(email)
                    }}
                >
                    create
                </Button>
            </div>
        </div>
    )
}

export default CreateUser;