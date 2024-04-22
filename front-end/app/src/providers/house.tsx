import { useQuery } from "@tanstack/react-query";
import { Context, ReactNode, createContext, useContext, useReducer, useState } from "react"
import { Endpoints, ErrorResponseJSON } from "../@utils";
import { AuthContext } from "./auth";

export type HouseType = any;

export interface HouseContextType {
    house: HouseType,
    houses: Array<HouseType>,
    test: React.Dispatch<{
        type: "set" | "unset";
        id: number;
    }>
};

export const HouseContext: Context<HouseContextType> = createContext<HouseContextType>({
    house: {},
    houses: [],
    test: () => { }
})

interface HouseProviderProps {
    children: ReactNode
}

const useHouse = ({ houseId }: { houseId?: number }) => {
    const auth = useContext(AuthContext);
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

const useHouses = () => {
    const auth = useContext(AuthContext);
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getHouses'],
        queryFn: async () => {
            const res = await Endpoints.house.fetchAll();
             if (!res.ok) {
                // console.log(res);
                // if (res.status === 401) auth.logout();
                // console.log(`Error: ${errorMessage}`);
                throw new Error((await res.json() as any).message);
            }
            return res.json();
        },
        enabled: !!auth.user,
        retry: false,
        
    })

    if (error && queryResponse) {
        console.log(error, queryResponse);
    }

    return { houses: data ?? [], error } // queryResponse.isLoading, queryResponse.isFetching.
}

function reducer(state: number | undefined, action: {type: "set" | "unset", id: number}) {
    switch(action.type) {
        case("unset"): 
            localStorage.removeItem("house");
            return undefined;
        case("set"):
            localStorage.setItem("house", action.id.toString());
            return action.id;
        default:
            return state;
    }
}

export const HouseProvider = (props: HouseProviderProps) => {
    const [houseId, dispatch] = useReducer(reducer, parseInt(localStorage.getItem("house") ?? ""));
    const {house} = useHouse({ houseId });
    const {houses} = useHouses();
    
    return (
        <HouseContext.Provider
            value={{
                house: house,
                houses: houses,
                test: dispatch,
            }}
            children={props.children}
        />
    )
}