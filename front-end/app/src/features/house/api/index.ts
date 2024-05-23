import { Endpoints } from "@/@utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useHouseUpdateMutation = () => {
    const queryClient = useQueryClient();
    const { houseId } = useParams();
    const query = useMutation({
        mutationFn: async (newHouse: any) => {
            const res = await Endpoints.houses.update({ house: newHouse }, { pathParams: { houses: houseId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getHouses"], refetchType: "all" })
        }
    })

    return query;
}

export const useHouseCreateMutation = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: async (newHouse: any) => {
            const res = await Endpoints.houses.create({ house: newHouse });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getHouses"], refetchType: "all" })
        }
    })

    return query;
}