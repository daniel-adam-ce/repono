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

const useHouses = (user: any) => {
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getHouses'],
        queryFn: async () => {
            const res = await Endpoints.houses.fetchAll();
             if (!res.ok) {
                // console.log(res);
                // if (res.status === 401) auth.logout();
                // console.log(`Error: ${errorMessage}`);
                throw new Error((await res.json() as any).message);
            }
            return res.json();
        },
        enabled: !!user,
        retry: false,
        
    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { houses: data ?? [], error } // queryResponse.isLoading, queryResponse.isFetching.
}

const logout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
}

export const AuthProvider = (props: AuthProviderProps) => {
    const auth = useAuth();
    const houses = useHouses(auth.data)

    

    if (auth.error) {
        Cookies.remove("token");
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: auth.status === "success",
                authenticating: auth.status === "pending",
                user: auth.data,
                houses: houses.houses,
                logout: logout
            }}
            children={props.children}
        />
    )
}