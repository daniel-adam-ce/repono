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

const useAuth = () => {
    const query = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const res = await Endpoints.session.getSession();
            if (!res.ok) {
                throw new Error("error");
            }
            return res.json()
        },
        // refetchOnMount: true,
        retry: false,
        
    })

    return query;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const auth = useAuth();

    const logout = () => {
        Cookies.remove("token");
        window.location.href = "/login";
    }

    if (auth.error) {
        Cookies.remove("token");
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: auth.status === "success",
                authenticating: auth.status === "pending",
                user: auth.data,
                houses: [],
                logout: logout
            }}
            children={props.children}
        />
    )
}