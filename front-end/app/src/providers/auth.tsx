import { Context, ReactNode, createContext } from "react"
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "../@utils/api/endpoints";
import Cookies from "js-cookie";

export type AuthContextType = {
    authenticated: boolean,
    authenticating: boolean,
    user: any,
    houses: Array<any>,
    logout: Function ,
};

export const AuthContext: Context<AuthContextType> = createContext<AuthContextType>({
    authenticated: false,
    authenticating: false,
    user: {},
    houses: [],
    logout: () => {},
})

interface AuthProviderProps {
    children: ReactNode
}


export const AuthProvider = (props: AuthProviderProps) => {
    const query = useQuery({
        queryKey: ['session'],
        queryFn: Endpoints.session.getSession,
        refetchOnMount: true
    })

    const logout = () => {
        Cookies.remove("token");
        query.refetch();
        window.location.href = "/login"
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: query.status === "success",
                authenticating: query.status === "pending",
                user: query.data,
                houses: [],
                logout: logout
            }}
            children={props.children}
        />
    )
}