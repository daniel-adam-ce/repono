import { Endpoints } from "@/@utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useItemCreateMutation = () => {
    const queryClient = useQueryClient();
    const { houseId } = useParams();
    const query = useMutation({
        mutationFn: async (newItem: any) => {
            const res = await Endpoints.houses.items.create({ item: newItem }, { pathParams: { houses: houseId } });

            if (!res.ok) {
                throw new Error((await res.json() as any).message);
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getItems"], refetchType: "all" })
        }
    })

    return {
        mutate: query.mutate,
        isPending: query.isPending,
    };
}