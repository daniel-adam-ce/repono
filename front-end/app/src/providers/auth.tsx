import { Context, ReactNode, createContext, useCallback, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query";

export type AuthContextType = {
    authenticated: boolean | null,
    authenticating: boolean | null,
    user: any
};

export const AuthContext: Context<AuthContextType> = createContext<AuthContextType>({
    authenticated: null,
    authenticating: null,
    user: null
})

interface AuthProviderProps {
    children: ReactNode
}



export const AuthProvider = (props: AuthProviderProps) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [authenticating, setAuthenticating] = useState<boolean | null>(null);
    // const [user, setUser] = useState<any>(null);
    const user = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const response = await fetch(
                "http://localhost:5000/api/v1/users", 
                {
                    credentials: "include"
                }
            )
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })

    // const validateSession = useCallback(
    //     async () => {
    //         try {
    //             setAuthenticating(true);
    //             const res = await endpoints.session.getSession();
    //             console.log(res);
    //             setUser(res);
    //             setAuthenticated(true);
    //         } catch (error) {
    //             setAuthenticated(false);
    //             console.log(error);
    //         } finally {
    //             setAuthenticating(false);
    //         }
    //     }
    // , [])

    // useEffect(() => {
    //     validateSession();
    // }, [validateSession])

    console.log(user);

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                authenticating,
                user,
            }}
            children={props.children}
        />
    )
}