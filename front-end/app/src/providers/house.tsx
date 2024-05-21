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
    const { data, error, ...queryResponse } = useQuery({
        queryKey: ['getHouses', houseId],
        queryFn: async () => {
            const res = await Endpoints.houses.fetch({ pathParams: {houses: houseId} });
             if (!res.ok) {
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

    return { house: data, error }
}

export const HouseProvider = (props: HouseProviderProps) => {
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