import { Context, Dispatch, SetStateAction, createContext, useState } from "react"

export type AuthContextType = {
    authenticated: boolean | null,
    setAuthenticated: Dispatch<SetStateAction<undefined>> | null,
    user: any
};

export const AuthContext: Context<AuthContextType> = createContext<AuthContextType>({
    authenticated: null,
    setAuthenticated: null,
    user: null
})

interface AuthProviderProps {

}

export const AuthProvider = ({}: AuthProviderProps) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<any>(null);

    const validateSession = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/v1/session",
                {
                    credentials: "include"
                }
            )
            console.log(await res.json());
            } catch (error) {
                console.log(error);
            }
        } 

    return (
        <></>
    )
}