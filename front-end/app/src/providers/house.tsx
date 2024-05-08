import { useQuery } from "@tanstack/react-query";
import { Context, ReactNode, createContext, useContext } from "react"
import { Endpoints, ErrorResponseJSON } from "../@utils";
import { AuthContext } from "./auth";
import { useParams } from "react-router-dom";

export type HouseType = any;

export interface HouseContextType {
    house: HouseType,
};

export const HouseContext: Context<HouseContextType> = createContext<HouseContextType>({
    house: undefined,
})

interface HouseProviderProps {
    children: ReactNode
}

const useHouse = () => {
    const auth = useContext(AuthContext);
    const params = useParams();
    const houseId = params?.houseId
    console.log(params)
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getHouse', houseId],
        queryFn: async () => {
            const res = await Endpoints.house.fetch({ pathParams: houseId });
             if (!res.ok) {
                // console.log(res);
                // if (res.status === 401) auth.logout();
                // console.log(`Error: ${errorMessage}`);
                throw new Error((await res.json() as ErrorResponseJSON).message);
            }
            return res.json();
        },
        enabled: !!houseId && !!auth.user,
        retry: false,
        
    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { house: data, error } // queryResponse.isLoading, queryResponse.isFetching.
}

export const HouseProvider = (props: HouseProviderProps) => {
    // const [houseId, dispatch] = useReducer(reducer, parseInt(localStorage.getItem("house") ?? ""));
    const {house} = useHouse();
    
    return (
        <HouseContext.Provider
            value={{
                house: house,
            }}
            children={props.children}
        />
    )
}